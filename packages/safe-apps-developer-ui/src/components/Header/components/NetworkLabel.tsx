import { makeStyles } from '@material-ui/core/styles';
import { ReactElement } from 'react';
import Typography from '@material-ui/core/Typography';

import { border, md, screenSm, sm, xs, fontColor } from 'src/styles/variables';
import { upperFirst } from 'src/utils/strings';
import { getNetworkNameByChainId } from 'src/api/eth';

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

type Props = {
  chainId: number;
};

const NetworkLabel = ({ chainId }: Props): ReactElement => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography className={classes.text} variant="body2">
        {upperFirst(getNetworkNameByChainId(chainId))}
      </Typography>
    </div>
  );
};

export { NetworkLabel };
