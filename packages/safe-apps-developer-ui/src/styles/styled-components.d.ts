import 'styled-components';

import { Theme } from './styled-theme';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {} // eslint-disable-line
}
