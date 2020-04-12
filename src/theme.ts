import {DefaultTheme} from 'styled-components';

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
    background: variables.darkSlateGray,
    title: variables.sunny,
    primaryButtonBg: variables.mediumAquamarine,
    primaryButtonColor: variables.darkSlateGray,
    secondaryButtonBg: variables.platinum,
    secondaryButtonColor: variables.darkSlateGray,
  },
};

export default theme;
