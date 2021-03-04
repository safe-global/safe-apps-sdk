import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import * as React from 'react';

import { Divider } from 'src/components/Layout/Divider';
import { screenSm, sm } from 'src/styles/variables';

const styles = () => ({
  root: {
    alignItems: 'center',
    display: 'flex',
    height: '100%',

    [`@media (min-width: ${screenSm}px)`]: {
      flexBasis: '284px',
      marginRight: '20px',
    },
  },
  provider: {
    alignItems: 'center',
    cursor: 'pointer',
    display: 'flex',
    flex: '1 1 auto',
    padding: sm,
    [`@media (min-width: ${screenSm}px)`]: {
      paddingLeft: sm,
      paddingRight: sm,
    },
  },
  expand: {
    height: '30px',
    width: '30px',
  },
});

class Provider extends React.Component<any> {
  myRef: any;

  constructor(props: any) {
    super(props);

    this.myRef = React.createRef();
  }

  render() {
    const { render, classes, info, open, toggle } = this.props;

    return (
      <>
        <div className={classes.root} ref={this.myRef}>
          <Divider />
          <Grid className={classes.provider} onClick={toggle} xs={12}>
            {info}
            <IconButton className={classes.expand} disableRipple>
              {open ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </Grid>
          <Divider />
        </div>
        {render(this.myRef)}
      </>
    );
  }
}

export default withStyles(styles as any)(Provider);
