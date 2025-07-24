// svg.d.ts

// This declaration is for imports ending in "?url"
// It tells TypeScript that these imports are strings (the URL).
declare module '*.svg?url' {
  const content: string;
  export default content;
}

// This declaration is for standard SVG imports
// It tells TypeScript that these imports are React components.
declare module '*.svg' {
  import * as React from 'react';

  /**
   * This handles imports like:
   * import { ReactComponent as MyIcon } from './icon.svg';
   */
  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;

  /**
   * This handles imports like:
   * import MyIcon from './icon.svg';
   */
  const SvgComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;

  export default SvgComponent;
}
