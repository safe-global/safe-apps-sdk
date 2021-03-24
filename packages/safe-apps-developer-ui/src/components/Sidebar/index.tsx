import { ETHEREUM_NETWORK_TO_ID } from 'src/api/provider';
import { useProviderStore } from 'src/stores/provider';
import { upperFirst } from 'src/utils/strings';
import { SafeHeader } from './SafeHeader';

const Sidebar = (): React.ReactElement => {
  const networkId = useProviderStore((state) => state.networkId);

  return (
    <div>
      <SafeHeader network={upperFirst(ETHEREUM_NETWORK_TO_ID[networkId])} />
    </div>
  );
};

export { Sidebar };
