import * as fs from 'fs';
import * as path from 'path';

// ----------------------------- Section 1: Tailwind Configuration Update -----------------------------

const inputDirPath = path.join(__dirname, 'inputs');
const outputFilePath = path.join(
  __dirname,
  './../../shared/tailwind/tailwindColors.ts',
);

interface ColorResult {
  colors: {
    coloropacity: { [key: string]: any };
    [key: string]: any;
  };
}

const sanitizeKey = (key: string): string =>
  /\d/.test(key) && /[a-zA-Z]/.test(key) ? `"${key}"` : key;

const objectToJavaScript = (obj: any, indent: string = ''): string => {
  let result = '';
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      result += `${indent}${sanitizeKey(key)}: `;
      if (typeof obj[key] === 'object') {
        result += '{\n';
        result += objectToJavaScript(obj[key], indent + '  ');
        result += `\n${indent}}`;
      } else {
        result += `"${obj[key]}"`;
      }
      result += ',\n';
    }
  }
  return result.trim();
};

const updateTailwindConfig = (newColors: any): void => {
  const jsContent = `const colors={\n${objectToJavaScript(
    newColors,
    '        ',
  )}\n    }\n export default colors;`;
  fs.writeFileSync(outputFilePath, jsContent, 'utf-8');
  console.log(`✅ Tailwind colors updated at ${outputFilePath}`);
};

const processAllCSSFiles = (dirPath: string): ColorResult => {
  const result: ColorResult = { colors: { coloropacity: {} } };
  const files = fs.readdirSync(dirPath);
  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isFile() && file.endsWith('.css')) {
      const fileResult = processCSSFile(filePath);
      Object.assign(result.colors, fileResult.colors);
    }
  });
  return result;
};

const processCSSFile = (filePath: string): ColorResult => {
  const content = fs.readFileSync(filePath, 'utf-8');
  const colorRegex =
    /--color-([a-zA-Z0-9-]+)-([a-zA-Z0-9-_]+)(-.*)?:\s*var\(--color-[a-zA-Z0-9-]+-[a-zA-Z0-9-_]+(-.*)?\);/g;
  const opacityRegex =
    /--coloropacity-([a-zA-Z0-9-]+)-([a-zA-Z0-9-_]+)(-.*)?:\s*var\(--coloropacity-[a-zA-Z0-9-]+-[a-zA-Z0-9-_]+(-.*)?\);/g;
  const result: ColorResult = { colors: { coloropacity: {} } };
  let match: RegExpExecArray | null;

  while ((match = colorRegex.exec(content)) !== null) {
    const category = match[1];
    const shade = match[2];
    const suffix = match[3] || '';
    const parts = category.split('-');
    let currentLevel: any = result.colors;

    parts.forEach((part) => {
      if (!currentLevel[part]) currentLevel[part] = {};
      currentLevel = currentLevel[part];
    });

    if (!currentLevel[shade]) currentLevel[shade] = {};
    const colorKey = `var(--color-${category}-${shade}${suffix})`;
    if (suffix) {
      currentLevel[shade][sanitizeKey(suffix.replace('-', ''))] = colorKey;
    } else {
      currentLevel[shade] = colorKey;
    }
  }

  while ((match = opacityRegex.exec(content)) !== null) {
    const category = match[1];
    const shade = match[2];
    const suffix = match[3] || '';
    let currentLevel: any = result.colors.coloropacity;
    const parts = category.split('-');

    parts.forEach((part) => {
      if (!currentLevel[part]) currentLevel[part] = {};
      currentLevel = currentLevel[part];
    });

    if (!currentLevel[shade]) currentLevel[shade] = {};
    const opacityKey = `var(--coloropacity-${category}-${shade}${suffix})`;
    if (suffix) {
      currentLevel[shade][sanitizeKey(suffix.replace('-', ''))] = opacityKey;
    } else {
      currentLevel[shade] = opacityKey;
    }
  }

  return result;
};

// ------------------ Merge both themes and generate tailwind output ------------------

const b2bOutput = processAllCSSFiles(path.join(inputDirPath, 'b2b'));
const b2cOutput = processAllCSSFiles(path.join(inputDirPath, 'b2c'));
const mergedOutput: ColorResult = {
  colors: {
    ...b2bOutput.colors,
    ...b2cOutput.colors,
  },
};
updateTailwindConfig(mergedOutput.colors);

// ----------------------------- Section 2: CSS Variable Extraction -----------------------------

const outputFile = path.join(
  __dirname,
  './../../libs/design-system/.storybook/tailwind-imports.css',
);

const extractCssVariables = (cssContent: string): string[] =>
  cssContent.match(/--[\w-]+:\s*[^;]+;/g) || [];

const removeMustacheSyntax = (cssContent: string): string =>
  cssContent.replace(/\{\{[^}]*\}\}/g, '');

const clearAndAddVariablesToLayerBase = (
  cssContent: string,
  b2bLight: string[],
  b2bDark: string[],
  b2cLight: string[],
  b2cDark: string[],
): string => {
  const updatedLayerBase = `@layer base {
  :root {
    ${b2bLight.join('\n    ')}
  }
  :root.dark {
    ${b2bDark.join('\n    ')}
  }
  :root.b2c {
    ${b2cLight.join('\n    ')}
  }
  :root.b2c.dark {
    ${b2cDark.join('\n    ')}
  }
}`;
  const layerBaseRegex = /@layer\s+base\s*{[^]*?}/g;
  if (cssContent.match(layerBaseRegex)) {
    return cssContent.replace(layerBaseRegex, updatedLayerBase);
  }
  return `${cssContent.trim()}\n${updatedLayerBase}\n`;
};

const readFilesRecursive = (
  folderPath: string,
  fileCallback: (file: string) => void,
): void => {
  const files = fs.readdirSync(folderPath);
  files.forEach((file) => {
    const fullPath = path.join(folderPath, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      readFilesRecursive(fullPath, fileCallback);
    } else if (fullPath.endsWith('.css')) {
      fileCallback(fullPath);
    }
  });
};

const getVariablesFromFolder = (themeFolder: string) => {
  const light: string[] = [];
  const dark: string[] = [];
  readFilesRecursive(themeFolder, (filePath: string) => {
    const content = removeMustacheSyntax(fs.readFileSync(filePath, 'utf-8'));
    if (filePath.includes('dark')) {
      dark.push(...extractCssVariables(content));
    } else {
      light.push(...extractCssVariables(content));
    }
  });
  return { light, dark };
};

const b2bVars = getVariablesFromFolder(path.join(inputDirPath, 'b2b'));
const b2cVars = getVariablesFromFolder(path.join(inputDirPath, 'b2c'));
let outputContent = fs.readFileSync(outputFile, 'utf-8');
outputContent = clearAndAddVariablesToLayerBase(
  outputContent,
  b2bVars.light,
  b2bVars.dark,
  b2cVars.light,
  b2cVars.dark,
);
fs.writeFileSync(outputFile, outputContent, 'utf-8');
console.log(`🎨 CSS variables injected into ${outputFile}`);
