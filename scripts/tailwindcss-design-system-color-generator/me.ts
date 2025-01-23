import fs from 'fs';
import path from 'path';

// Folder path
const inputFolder = path.join(__dirname, 'inputs');
// Output file path
const outputFile = path.join(__dirname, './../../libs/design-system/.storybook/tailwind-imports.css');

// Function to extract CSS variables from content
const extractCssVariables = (cssContent: string): string[] => {
  const regex = /--[\w-]+:\s*[^;]+;/g;
  const variables = cssContent.match(regex);
  return variables || [];
};

// Function to remove {{}} from CSS content
const removeMustacheSyntax = (cssContent: string): string => {
  return cssContent.replace(/\{\{[^}]*\}\}/g, ''); // Remove anything inside {{}} 
};

// Function to clear content inside @layer base and add variables
const clearAndAddVariablesToLayerBase = (cssContent: string, variables: string[], darkVariables: string[]): string => {
  // Find @layer base and remove its content
  const layerBaseRegex = /(@layer\s+base\s*{)[^]*}/g;
  const updatedLayerBase = `@layer base {\n  :root {\n    ${variables.join('\n    ')}\n  }\n  :root.dark {\n    ${darkVariables.join('\n    ')}\n  }\n}`;

  // Replace previous @layer base content with the new one
  cssContent = cssContent.replace(layerBaseRegex, updatedLayerBase);

  // If @layer base doesn't exist, add it at the end
  if (!cssContent.includes('@layer base {')) {
    cssContent += `\n${updatedLayerBase}\n`;
  }

  return cssContent;
};

// Read folder and find CSS files
fs.readdir(inputFolder, (err, files) => {
  if (err) {
    console.error('Error reading folder:', err);
    return;
  }

  // Filter out files that don't end with --dark.css
  const cssFiles = files.filter(file => file.endsWith('.css'));
  
  // Files ending with --dark.css
  const darkCssFiles = files.filter(file => file.endsWith('--dark.css'));

  // Read the current content of the output file
  let outputContent = fs.readFileSync(outputFile, 'utf-8');

  // Process and apply changes to the files
  let allVariables: string[] = [];
  let darkVariables: string[] = [];

  // Process normal files (not --dark.css)
  cssFiles.forEach(file => {
    if (!file.endsWith('--dark.css')) {
      const filePath = path.join(inputFolder, file);
      
      // Read file content
      let cssContent = fs.readFileSync(filePath, 'utf-8');
      
      // Remove {{}} from file content
      cssContent = removeMustacheSyntax(cssContent);

      // Extract variables
      const variables = extractCssVariables(cssContent);

      // Add variables to the global list
      allVariables = allVariables.concat(variables);
    }
  });

  // Process --dark.css files
  darkCssFiles.forEach(file => {
    const filePath = path.join(inputFolder, file);
    
    // Read file content
    let cssContent = fs.readFileSync(filePath, 'utf-8');
    
    // Remove {{}} from file content
    cssContent = removeMustacheSyntax(cssContent);

    // Extract variables
    const variables = extractCssVariables(cssContent);

    // Add variables to the dark variables list
    darkVariables = darkVariables.concat(variables);
  });

  // Clear the previous content of @layer base and add new variables
  outputContent = clearAndAddVariablesToLayerBase(outputContent, allVariables, darkVariables);

  // Write the final content to the output file without deleting existing code
  fs.writeFileSync(outputFile, outputContent, 'utf-8');
  console.log('All files have been successfully added to ' + outputFile + '.');
});
