import React, { useCallback, useMemo } from "react"
import styled from "styled-components"
import { ethers } from "ethers"
import { useSafeAppsSDK } from "@gnosis.pm/safe-apps-react-sdk"
import { SafeAppProvider } from "@gnosis.pm/safe-apps-provider"

const Container = styled.div`
  padding: 1rem;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const SafeApp = (): React.ReactElement => {
  const { sdk, safe } = useSafeAppsSDK()
  const signer = useMemo(
    () =>
      new ethers.providers.Web3Provider(
        new SafeAppProvider(safe, sdk)
      ).getSigner(),
    [sdk, safe]
  )

  const submitTx = useCallback(async () => {
    signer.sendTransaction({
      to: "0x0000000000000000000000000000000000000000",
      value: ethers.utils.parseEther("0.1"),
    })
  }, [safe, sdk, signer])

  return (
    <Container>
      <p>Safe: {safe.safeAddress}</p>

      <button onClick={submitTx}>Click to send a test transaction</button>

      <a
        href="https://github.com/gnosis/safe-apps-sdk"
        target="_blank"
        rel="noreferrer"
      >
        Documentation
      </a>
    </Container>
  )
}

export default SafeApp
