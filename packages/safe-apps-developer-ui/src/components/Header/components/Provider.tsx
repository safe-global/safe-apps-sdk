import IconButton from '@material-ui/core/IconButton'
import { withStyles } from '@material-ui/core/styles'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import * as React from 'react'

import Col from 'src/components/layout/Col'
import Divider from 'src/components/layout/Divider'
import { screenSm, sm } from 'src/theme/variables'

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
})

class Provider extends React.Component<any> {
  myRef

  constructor(props) {
    super(props)

    this.myRef = React.createRef()
  }

  render() {
    const { render, classes, info, open, toggle } = this.props

    return (
      <>
        <div className={classes.root} ref={this.myRef}>
          <Divider />
          <Col className={classes.provider} end="sm" middle="xs" onClick={toggle}>
            {info}
            <IconButton className={classes.expand} disableRipple>
              {open ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </Col>
          <Divider />
        </div>
        {render(this.myRef)}
      </>
    )
  }
}

export default withStyles(styles as any)(Provider)
