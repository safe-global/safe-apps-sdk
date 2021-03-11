const theme = {
  colors: {
    primary: '#008C73',
    primaryLight: '#A1D2CA',
    primaryHover: '#005546',

    secondary: '#001428',
    secondaryLight: '#B2B5B2',
    secondaryHover: '#5D6D74',

    error: '#DB3A3D',
    errorHover: '#C31717',

    text: '#001428',
    icon: '#B2B5B2',
    placeHolder: '#5D6D74',
    inputField: '#F0EFEE',

    separator: '#E8E7E6',
    rinkeby: '#E8673C',
    pendingTagHover: '#FBE5C5',
    tag: '#D4D5D3',
    background: '#F7F5F5',
    white: '#ffffff',
    warning: '#FFC05F',

    disabled: {
      opacity: 0.5,
    },
    overlay: {
      opacity: 0.75,
      color: '#E8E7E6',
    },
    shadow: {
      blur: '18px',
      opacity: 0.75,
      color: '#28363D',
    },
  },
};

export type Theme = typeof theme;
export type ThemeColors = keyof Theme['colors'];

export { theme };
