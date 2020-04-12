/// <reference types="react-scripts" />

import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      background: string;
      title: string;
      primaryButtonBg: string;
      primaryButtonColor: string;
      secondaryButtonBg: string;
      secondaryButtonColor: string;
    };
  }
}
