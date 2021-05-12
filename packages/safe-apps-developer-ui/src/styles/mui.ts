import { createMuiTheme } from '@material-ui/core/styles';
import {
  largeFontSize,
  disabled,
  secondary,
  primary,
  buttonLargeFontSize,
  md,
  lg,
  sm,
  smallFontSize,
  regularFont,
  secondaryBackground,
  mediumFontSize,
} from './variables';

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Averta, sans-serif',
    h3: {
      fontSize: '2.3rem',
      fontWeight: 800,
    },
    h5: { fontWeight: 800 },
    h6: {
      fontSize: '1.15rem',
      fontWeight: 800,
    },
    subtitle1: {
      fontSize: '1.15rem',
    },
  },
  overrides: {
    MuiListItemIcon: {
      root: {
        minWidth: 32,
      },
    },
    MuiListItemText: {
      primary: {
        textTransform: 'uppercase',
        fontWeight: 'bold',
        fontSize: '0.76rem',
      },
    },
    MuiButtonBase: {
      root: {
        letterSpacing: '0.9px',
        '&$disabled': {
          color: disabled,
        },
        color: disabled,
        textTransform: 'none',
        borderRadius: sm,
        minWidth: 'none',
        minHeight: '35px',
      },
    },
    MuiButton: {
      label: {
        lineHeight: '1',
        fontSize: largeFontSize,
        fontWeight: regularFont,
      },
      root: {
        letterSpacing: '0.9px',
        '&$disabled': {
          color: disabled,
        },
        color: disabled,
        textTransform: 'none',
        borderRadius: sm,
        minWidth: 'none',
        minHeight: '35px',
      },
      contained: {
        boxShadow: '1px 2px 10px 0 rgba(212, 212, 211, 0.59)',
      },
      containedPrimary: {
        backgroundColor: secondary,
        '&:hover': {
          backgroundColor: primary,
        },
      },
      containedSecondary: {
        backgroundColor: primary,
        '&:hover': {
          backgroundColor: '#5d7274',
        },
      },
      outlinedPrimary: {
        border: `2px solid ${primary}`,
        '&:hover': {
          border: `2px solid ${primary}`,
        },
      },
      sizeLarge: {
        padding: `${md} ${lg}`,
        minHeight: '52px',
        fontSize: buttonLargeFontSize,
      },
      sizeSmall: {
        minWidth: '130px',
        fontSize: smallFontSize,
      },
      textSecondary: {
        '&:hover': {
          borderRadius: '3px',
        },
      },
    },
    MuiInput: {
      root: {
        backgroundColor: secondaryBackground,
        borderRadius: '5px',
        color: primary,
        fontSize: mediumFontSize,
        lineHeight: '56px',
        order: 1,
        padding: `0 ${md}`,
        '&:$disabled': {
          color: '#0000ff',
        },
        '&:active': {
          borderBottomLeftRadius: '0',
          borderBottomRightRadius: '0',
        },
      },
      input: {
        color: primary,
        display: 'flex',
        height: 'auto',
        letterSpacing: '0.5px',
        padding: '0',
        textOverflow: 'ellipsis',
      },
    },
    MuiBackdrop: {
      root: {
        backgroundColor: 'rgba(232,231,230, 0.75)',
      },
    },
  },
});

export { theme };
