import { OnboardWrapper } from './wrapper'
import { Initialization, API } from 'bnc-onboard/dist/src/interfaces'

export const Onboard = (options: Initialization): API => {
  return new OnboardWrapper(options)
}

export default Onboard
