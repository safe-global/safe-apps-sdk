// Icons
import walletIcon from '../../../assets/wallet.svg';

import { WALLET_PROVIDER } from 'src/api/provider';

type WalletProviderNames = typeof WALLET_PROVIDER[keyof typeof WALLET_PROVIDER];

interface IconValue {
  src: string;
  height: number;
}

type WalletObjectsProps<Tvalue> = {
  [key in WalletProviderNames]: Tvalue;
};

const WALLET_ICONS: WalletObjectsProps<IconValue> = {
  [WALLET_PROVIDER.UNKNOWN]: {
    src: walletIcon,
    height: 25,
  },
};

export default WALLET_ICONS;
