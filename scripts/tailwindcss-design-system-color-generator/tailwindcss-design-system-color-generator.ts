import * as fs from 'fs';
import * as path from 'path';

// File paths
const inputFilePath = path.join(__dirname, 'input.css');
const outputFilePath = path.join(__dirname, 'output.js');

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
        return `"${key}"`;
    }
    return key;
};

// Process CSS file
const processCSSFile = (filePath: string): ColorResult => {
    const content = fs.readFileSync(filePath, 'utf-8');
    const colorRegex = /--color-([a-zA-Z0-9-]+)-([a-zA-Z0-9-_]+)(-.*)?:\s*var\(--color-[a-zA-Z0-9-]+-[a-zA-Z0-9-_]+(-.*)?\);/g;
    const opacityRegex = /--coloropacity-([a-zA-Z0-9-]+)-([a-zA-Z0-9-_]+)(-.*)?:\s*var\(--coloropacity-[a-zA-Z0-9-]+-[a-zA-Z0-9-_]+(-.*)?\);/g;
    const result: ColorResult = { colors: { coloropacity: {} } };
    let match: RegExpExecArray | null;

    // Process colors
    while ((match = colorRegex.exec(content)) !== null) {
        const category = match[1];
        const shade = match[2];
        const suffix = match[3] || '';
        const parts = category.split('-');
        let currentLevel: any = result.colors;

        parts.forEach(part => {
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

    // Process opacity colors
    while ((match = opacityRegex.exec(content)) !== null) {
        const category = match[1];
        const shade = match[2];
        const suffix = match[3] || '';
        let currentLevel: any = result.colors.coloropacity;
        const parts = category.split('-');

        parts.forEach(part => {
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

const output = processCSSFile(inputFilePath);

// Convert object to JavaScript format
const objectToJavaScript = (obj: any, indent: string = ''): string => {
    let result = '';
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            result += `${indent}${sanitizeKey(key)}: `;
            if (typeof obj[key] === 'object') {
                result += "{\n";
                result += objectToJavaScript(obj[key], indent + '  ');
                result += `\n${indent}}`;
            } else {
                result += `"${obj[key]}"`;
            }
            result += ",\n";
        }
    }
    return result.trim();
};

// Generate JS content from colors
const jsContent = ` 
  colors: {
${objectToJavaScript(output.colors, '    ')}
}
`;

// Write the output to file
fs.writeFileSync(outputFilePath, jsContent, 'utf-8');
console.log('Output saved to output.js.');
