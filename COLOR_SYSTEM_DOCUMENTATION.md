# 🎨 Color System & Variable Management

## Overview

The Aress Frontend Project implements a sophisticated color system that automatically generates Tailwind CSS configurations and CSS variables from design tokens. This system ensures consistency across B2B and B2C applications while supporting both light and dark themes.

## Architecture

### 1. Color Generation Script

**Location**: `scripts/tailwindcss-design-system-color-generator/tailwindcss-design-system-color-generator.ts`

**Purpose**: Automatically processes CSS color definitions and generates:
- Tailwind CSS color configuration
- CSS variables for both light and dark themes
- Theme-specific imports for different applications

### 2. Input Structure

The color system is organized in a hierarchical structure:

```
scripts/tailwindcss-design-system-color-generator/inputs/
├── primitivs/
│   └── primitives-value.css          # Base color definitions
├── b2b/
│   ├── semantic-light-value.css      # B2B light theme semantic colors
│   ├── semantic-dark-value--dark.css # B2B dark theme semantic colors
│   └── component-token-value.css     # B2B component-specific tokens
└── b2c/
    ├── semantic-light-value.css      # B2C light theme semantic colors
    ├── semantic-dark-value--dark.css # B2C dark theme semantic colors
    └── component-token-value.css     # B2C component-specific tokens
```

## Color Definition System

### A. Primitive Colors (`primitives-value.css`)

**Purpose**: Defines the foundational color palette with light and dark variants.

**Structure**:
```css
--color-tiffany-tiffany-50-light: #F4FBFB;
--color-tiffany-tiffany-100-light: #E3F8F8;
--color-tiffany-tiffany-200-light: #BCEBEB;
/* ... more tiffany shades ... */
--color-tiffany-tiffany-50-dark: #001F1F;
--color-tiffany-tiffany-100-dark: #082B2A;
--color-tiffany-tiffany-200-dark: #003838;
/* ... more dark variants ... */
```

**Color Families**:
- **Tiffany**: Primary brand color (teal/cyan)
- **Blue**: Information and accent colors
- **Green**: Success states and positive indicators
- **Red**: Error states and negative indicators
- **Yellow**: Warning states and attention indicators
- **Gray**: Neutral colors for text and backgrounds
- **Purple**: Secondary accent colors
- **Pink**: Additional accent colors
- **Vivid Green**: High-contrast success indicators

### B. Semantic Colors (`semantic-light-value.css` / `semantic-dark-value--dark.css`)

**Purpose**: Maps primitive colors to semantic meanings and use cases.

**Categories**:

1. **Surface Colors**:
```css
--color-surface-neutral-background: var(--color-base-white);
--color-surface-neutral-primary: var(--color-base-white);
--color-surface-brand-600-primary: var(--color-tiffany-tiffany-600-light);
--color-surface-message-error-600-primary: var(--color-red-red-600-light);
```

2. **Text Colors**:
```css
--color-text-neutral-primary: var(--color-gray-gray-1000-light);
--color-text-brand-primary-600: var(--color-tiffany-tiffany-600-light);
--color-text-message-error-primary: var(--color-red-red-600-light);
```

3. **Border Colors**:
```css
--color-border-neutral-primary: var(--color-gray-gray-300-light);
--color-border-brand-primary-600: var(--color-tiffany-tiffany-600-light);
--color-border-accent-blue-600: var(--color-blue-blue-600-light);
```

4. **Icon Colors**:
```css
--color-icon-neutral-primary: var(--color-gray-gray-700-light);
--color-icon-brand-primary-600: var(--color-tiffany-tiffany-600-light);
--color-icon-accent-red-primary-600: var(--color-red-red-600-light);
```

### C. Component Tokens (`component-token-value.css`)

**Purpose**: Defines colors for specific UI components and complex use cases.

**Examples**:
```css
--color-text-onbrand-neutral-on600: var(--color-base-white);
--color-text-onaccent-colored-onblue-on200_100_50: var(--color-blue-blue-800-light);
--color-surface-accent-blue-600-30per: rgba(24, 118, 220, 0.3);
```

## Script Functionality

### 1. Color Processing Algorithm

**Regex Patterns**:
```typescript
const colorRegex = /--color-([a-zA-Z0-9-]+)-([a-zA-Z0-9-_]+)(-.*)?:\s*var\(--color-[a-zA-Z0-9-]+-[a-zA-Z0-9-_]+(-.*)?\);/g;
const opacityRegex = /--coloropacity-([a-zA-Z0-9-]+)-([a-zA-Z0-9-_]+)(-.*)?:\s*var\(--coloropacity-[a-zA-Z0-9-]+-[a-zA-Z0-9-_]+(-.*)?\);/g;
```

**Processing Steps**:
1. **File Discovery**: Recursively scans input directories for `.css` files
2. **Variable Extraction**: Uses regex to extract color and opacity variables
3. **Hierarchical Organization**: Builds nested object structure based on naming conventions
4. **Sanitization**: Handles numeric keys and special characters for JavaScript compatibility

### 2. Output Generation

**A. Tailwind Configuration (`shared/tailwind/tailwindColors.ts`)**

Generated structure:
```typescript
const colors = {
  coloropacity: {
    surface: {
      accent: {
        blue: {
          600: {
            '0per': 'var(--coloropacity-surface-accent-blue-600-0per)',
            '10per': 'var(--coloropacity-surface-accent-blue-600-10per)',
            // ... more opacity variants
          }
        }
      }
    }
  },
  surface: {
    neutral: {
      background: 'var(--color-surface-neutral-background)',
      primary: 'var(--color-surface-neutral-primary)',
      // ... more surface colors
    }
  }
  // ... more color categories
};
```

**B. CSS Variable Injection**

**Target Files**:
- `libs/design-system/.storybook/tailwind-imports.css` (B2B)
- `apps/b2c-app/.storybook/tailwind-imports.css` (B2C)

**Generated Structure**:
```css
@layer base {
  :root {
    --color-tiffany-tiffany-50-light: #f4fbfb;
    --color-tiffany-tiffany-100-light: #e3f8f8;
    /* ... all light theme variables ... */
  }
  :root.dark {
    --color-tiffany-tiffany-50-dark: #001f1f;
    --color-tiffany-tiffany-100-dark: #082b2a;
    /* ... all dark theme variables ... */
  }
}
```

## Theme Management

### 1. Light/Dark Theme Support

**Automatic Detection**:
- Files containing "dark" in the name are processed as dark theme variables
- Light theme variables are the default
- Both themes are merged into the same CSS output with appropriate selectors

### 2. Application-Specific Themes

**B2B Theme**:
- Professional color palette
- Higher contrast ratios
- Corporate-friendly color choices

**B2C Theme**:
- Consumer-friendly colors
- Warmer color temperature
- Enhanced visual appeal

## Usage in Components

### 1. Tailwind Classes

```tsx
// Using semantic color classes
<div className="bg-surface-neutral-primary text-text-neutral-primary">
  <button className="bg-surface-brand-600-primary text-text-onbrand-neutral-on600">
    Primary Action
  </button>
</div>
```

### 2. CSS Variables

```tsx
// Direct CSS variable usage
const PIE_COLORS = [
  'var(--color-surface-accent-blue-500)',
  'var(--color-surface-accent-green-500)',
  'var(--color-surface-accent-yellow-500)',
  'var(--color-surface-accent-purple-500)',
];
```

### 3. Dynamic Styling

```tsx
// Using CSS variables in JavaScript
const chartOptions = {
  colors: [
    'var(--color-border-accent-blue-600)',
    'var(--color-surface-accent-green-600)',
  ],
  backgroundColor: 'var(--color-surface-neutral-primary)',
};
```

## Development Workflow

### 1. Adding New Colors

1. **Add primitive colors** to `primitives-value.css`:
```css
--color-newcolor-newcolor-500-light: #FF6B6B;
--color-newcolor-newcolor-500-dark: #FF8E8E;
```

2. **Create semantic mappings** in semantic files:
```css
--color-surface-accent-newcolor-500: var(--color-newcolor-newcolor-500-light);
```

3. **Run the generation script**:
```bash
ts-node scripts/tailwindcss-design-system-color-generator/tailwindcss-design-system-color-generator.ts
```

### 2. Script Execution

**Manual Execution**:
```bash
ts-node scripts/tailwindcss-design-system-color-generator/tailwindcss-design-system-color-generator.ts
```

**Output Confirmation**:
```
✅ Tailwind colors updated at ./shared/tailwind/tailwindColors.ts
🎨 B2B CSS variables injected into ./libs/design-system/.storybook/tailwind-imports.css
🎨 B2C CSS variables injected into ./apps/b2c-app/.storybook/tailwind-imports.css
```

## Advanced Features

### 1. Opacity Variants

**Automatic Generation**:
```css
--coloropacity-surface-accent-blue-600-30per: rgba(24, 118, 220, 0.3);
--coloropacity-surface-accent-blue-600-50per: rgba(24, 118, 220, 0.5);
```

**Usage**:
```tsx
<div className="bg-coloropacity-surface-accent-blue-600-30per">
  Semi-transparent background
</div>
```

### 2. Contextual Colors

**On-Color Variants**:
```css
--color-text-onbrand-neutral-on600: var(--color-base-white);
--color-text-onaccent-colored-onblue-on200_100_50: var(--color-blue-blue-800-light);
```

**Purpose**: Ensures proper contrast when text is placed on colored backgrounds.

### 3. Mustache Syntax Removal

**Template Processing**:
```typescript
const removeMustacheSyntax = (cssContent: string): string =>
  cssContent.replace(/\{\{[^}]*\}\}/g, '');
```

**Purpose**: Removes template syntax from CSS files during processing.

## Integration Points

### 1. Tailwind Configuration

The generated colors are imported into Tailwind configurations:
```javascript
import colors from '../shared/tailwind/tailwindColors';

module.exports = {
  theme: {
    extend: {
      colors: colors,
    },
  },
};
```

### 2. Storybook Integration

CSS variables are automatically injected into Storybook environments for consistent component development and testing.

### 3. Application Themes

Each application (B2B/B2C) receives its appropriate color variables, ensuring brand consistency while allowing for customization.

## Benefits

1. **Consistency**: Single source of truth for all colors across applications
2. **Maintainability**: Easy to update colors globally by modifying source files
3. **Theme Support**: Automatic light/dark theme generation
4. **Type Safety**: Generated TypeScript interfaces for color usage
5. **Performance**: CSS variables enable efficient runtime theme switching
6. **Scalability**: Easy to add new color variants and applications

This sophisticated color system ensures that the Aress Frontend Project maintains visual consistency while providing the flexibility needed for different applications and themes.

