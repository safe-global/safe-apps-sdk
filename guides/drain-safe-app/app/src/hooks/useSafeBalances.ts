import SafeAppsSDK, { TokenBalance } from '@safe-global/safe-apps-sdk'
import { useState, useEffect } from 'react'

function useSafeBalances(sdk: SafeAppsSDK): [TokenBalance[], boolean] {
  const [assets, setAssets] = useState<TokenBalance[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    async function loadBalances() {
      const balances = await sdk.safe.experimental_getBalances()

      setAssets(balances.items.filter((item) => parseInt(item.fiatBalance) > 0))
      setLoaded(true)
    }

    loadBalances()
  }, [sdk])

  return [assets, loaded]
}

export { useSafeBalances }
