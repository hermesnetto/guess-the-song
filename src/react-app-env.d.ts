/// <reference types="react-scripts" />

import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      platinum: string;
      middleBlue: string;
      mediumAquamarine: string;
      chineseViolet: string;
      darkSlateGray: string;
      sunny: string;

      background: string;
      title: string;
      subtitle: string;

      primaryButtonBg: string;
      primaryButtonColor: string;
      secondaryButtonBg: string;
      secondaryButtonColor: string;
    };
  }
}
