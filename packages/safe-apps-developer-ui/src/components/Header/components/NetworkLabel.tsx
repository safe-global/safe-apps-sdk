import { makeStyles } from '@material-ui/core/styles';
import { ReactElement } from 'react';
import { Grid, Typography } from '@material-ui/core';

import { border, md, screenSm, sm, xs, fontColor } from 'src/styles/variables';

const useStyles = makeStyles({
  container: {
    flexGrow: 0,
    padding: `0 ${sm}`,
    [`@media (min-width: ${screenSm}px)`]: {
      paddingLeft: md,
      paddingRight: md,
    },
  },
  text: {
    backgroundColor: border,
    color: fontColor,
    borderRadius: '3px',
    lineHeight: 'normal',
    margin: '0',
    padding: `${xs} ${sm}`,

    [`@media (min-width: ${screenSm}px)`]: {
      marginLeft: '8px',
    },
  },
});

const NetworkLabel = (): ReactElement => {
  const classes = useStyles();

  return (
    <Grid className={classes.container} xs={3}>
      <Typography className={classes.text} variant="body1">
        RINKEBY
      </Typography>
    </Grid>
  );
};

export default NetworkLabel;
