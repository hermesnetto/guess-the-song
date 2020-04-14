import { DefaultTheme } from 'styled-components';

const variables = {
  platinum: '#D9E4E5',
  middleBlue: '#80CED7',
  mediumAquamarine: '#63C7B2',
  chineseViolet: '#8E6C88',
  darkSlateGray: '#394E53',
  sunny: '#fff07c',
};

const theme: DefaultTheme = {
  colors: {
    platinum: variables.platinum,
    middleBlue: variables.middleBlue,
    mediumAquamarine: variables.mediumAquamarine,
    chineseViolet: variables.chineseViolet,
    darkSlateGray: variables.darkSlateGray,
    sunny: variables.sunny,

    background: variables.darkSlateGray,
    title: variables.sunny,
    subtitle: variables.darkSlateGray,

    primaryButtonBg: variables.mediumAquamarine,
    primaryButtonColor: variables.darkSlateGray,
    secondaryButtonBg: variables.platinum,
    secondaryButtonColor: variables.darkSlateGray,
  },
};

export default theme;
