import * as fs from 'fs';
import * as path from 'path';

// ----------------------------- Section 1: Tailwind Configuration Update -----------------------------

// Directory paths for Tailwind config
const inputDirPath = path.join(__dirname, 'inputs');
const outputFilePath = path.join(
  __dirname,
  './../../libs/design-system/tailwindColors.ts',
);

// Type for processing result
interface ColorResult {
  colors: {
    coloropacity: { [key: string]: any };
    [key: string]: any;
  };
}

// Helper to sanitize keys
const sanitizeKey = (key: string): string => {
  if (/\d/.test(key) && /[a-zA-Z]/.test(key)) {
    return `"${key}"`; // Adds quotes around mixed alphanumeric keys
  }
  return key;
};

// Convert object to JavaScript format
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

// Function to update the tailwind.config.js file with the new colors
const updateTailwindConfig = (newColors: any): void => {
  let fileContent = fs.readFileSync(outputFilePath, 'utf-8');

  fileContent = '';
  const jsContentWithExtend = `const colors={\n${objectToJavaScript(newColors, '        ')}\n    }\n export default colors;`;
  fileContent = fileContent + '\n' + jsContentWithExtend;
  fs.writeFileSync(outputFilePath, fileContent, 'utf-8');
  console.log(`Updated 'extend' section in ${outputFilePath}`);
};

// Function to process all CSS files in the 'inputs' folder
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

// Process CSS file
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
      if (!currentLevel[part]) {
        currentLevel[part] = {};
      }
      currentLevel = currentLevel[part];
    });

    if (!currentLevel[shade]) {
      currentLevel[shade] = {};
    }

    if (suffix) {
      const colorKey = `var(--color-${category}-${shade}${suffix})`;
      currentLevel[shade][sanitizeKey(suffix.replace('-', ''))] = colorKey;
    } else {
      const colorKey = `var(--color-${category}-${shade})`;
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
      if (!currentLevel[part]) {
        currentLevel[part] = {};
      }
      currentLevel = currentLevel[part];
    });

    if (!currentLevel[shade]) {
      currentLevel[shade] = {};
    }

    if (suffix) {
      const opacityKey = `var(--coloropacity-${category}-${shade}${suffix})`;
      currentLevel[shade][sanitizeKey(suffix.replace('-', ''))] = opacityKey;
    } else {
      const opacityKey = `var(--coloropacity-${category}-${shade})`;
      currentLevel[shade] = opacityKey;
    }
  }

  return result;
};

// Process all CSS files in the 'inputs' folder and get the result
const output = processAllCSSFiles(inputDirPath);

// Update the tailwind.config.js with the new colors
updateTailwindConfig(output.colors);

// ----------------------------- Section 2: CSS Variable Extraction -----------------------------

// Folder path for CSS variable extraction

const inputFolder = path.join(__dirname, 'inputs');
const primitivesFolder = path.join(__dirname, 'inputs', 'primitives');
const outputFile = path.join(
  __dirname,
  './../../libs/design-system/.storybook/tailwind-imports.css',
);

// Function to extract CSS variables
const extractCssVariables = (cssContent: string): string[] => {
  const regex = /--[\w-]+:\s*[^;]+;/g;
  const variables = cssContent.match(regex);
  return variables || [];
};

// Function to remove {{}} from CSS content
const removeMustacheSyntax = (cssContent: string): string => {
  return cssContent.replace(/\{\{[^}]*\}\}/g, '');
};

// Function to clear content inside @layer base and add variables
const clearAndAddVariablesToLayerBase = (
  cssContent: string,
  variables: string[],
  darkVariables: string[],
): string => {
  const layerBaseRegex = /(@layer\s+base\s*{)[^]*}/g;
  const updatedLayerBase = `@layer base {\n  :root {\n    ${variables.join('\n    ')}\n  }\n  :root.dark {\n    ${darkVariables.join('\n    ')}\n  }\n}`;
  cssContent = cssContent.replace(layerBaseRegex, updatedLayerBase);

  if (!cssContent.includes('@layer base {')) {
    cssContent += `\n${updatedLayerBase}\n`;
  }

  return cssContent;
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

// Process and apply changes to the files
fs.readdir(inputFolder, (err, files) => {
  if (err) {
    console.error('Error reading folder:', err);
    return;
  }

  const cssFiles: string[] = [];
  const darkCssFiles: string[] = [];

  readFilesRecursive(inputFolder, (filePath: string) => {
    if (filePath.endsWith('.css') && !filePath.endsWith('--dark.css')) {
      cssFiles.push(filePath);
    } else if (filePath.endsWith('--dark.css')) {
      darkCssFiles.push(filePath);
    }
  });

  let outputContent = fs.readFileSync(outputFile, 'utf-8');
  let allVariables: string[] = [];
  let darkVariables: string[] = [];

  cssFiles.forEach((filePath) => {
    let cssContent = fs.readFileSync(filePath, 'utf-8');
    cssContent = removeMustacheSyntax(cssContent);
    const variables = extractCssVariables(cssContent);
    allVariables = allVariables.concat(variables);
  });

  darkCssFiles.forEach((filePath) => {
    let cssContent = fs.readFileSync(filePath, 'utf-8');
    cssContent = removeMustacheSyntax(cssContent);
    const variables = extractCssVariables(cssContent);
    darkVariables = darkVariables.concat(variables);
  });

  outputContent = clearAndAddVariablesToLayerBase(
    outputContent,
    allVariables,
    darkVariables,
  );
  fs.writeFileSync(outputFile, outputContent, 'utf-8');
  console.log('All files have been successfully added to ' + outputFile + '.');
});
