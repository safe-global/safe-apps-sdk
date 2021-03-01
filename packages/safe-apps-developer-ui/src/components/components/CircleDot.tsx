import * as React from 'react'
import { getNetworkInfo } from 'src/config'

type Props = {
  className: string
}

export const CircleDot = (props: Props): React.ReactElement => {
  const networkInfo = getNetworkInfo()

  return (
    <div className={props.className}>
      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10">
        <circle
          cx="208"
          cy="203"
          r="3"
          fill="none"
          fillRule="evenodd"
          stroke={networkInfo?.backgroundColor ?? '#FF685E'}
          strokeWidth="3"
          transform="translate(-203 -198)"
        />
      </svg>
    </div>
  )
}
