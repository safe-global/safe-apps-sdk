import { useHistory } from 'react-router-dom';
import { useProviderStore } from 'src/stores/provider';
import React from 'react';

const useWalletAuthorization = (): void => {
  const userAccount = useProviderStore((state) => state.account);
  const history = useHistory();

  React.useEffect(() => {
    if (!userAccount) {
      history.push('/');
    }
  }, [userAccount, history]);
};

export { useWalletAuthorization };
