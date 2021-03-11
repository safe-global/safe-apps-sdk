import { createMuiTheme } from '@material-ui/core/styles';
import {
  largeFontSize,
  disabled,
  secondary,
  error,
  primary,
  buttonLargeFontSize,
  md,
  lg,
  sm,
  smallFontSize,
  regularFont,
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
  },
  overrides: {
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
        backgroundColor: error,
        '&:hover': {
          backgroundColor: '#d4d5d3',
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
  },
});

export { theme };
