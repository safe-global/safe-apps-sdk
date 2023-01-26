import React, { useState } from "react"
import styled from "styled-components"
import { Button, Textarea, Text } from "evergreen-ui"
import SdkInstance from "@safe-global/safe-apps-sdk"

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

type OwnProps = {
  sdk: SdkInstance
}

const Call = ({ sdk }: OwnProps): React.ReactElement => {
  const [value, setValue] = useState(`{
    "from"?: string | number,
    "to"?: string,
    "value"?: number | string | BN,
    "gas"?: number | string,
    "gasPrice"?: number | string | BN,
    "data"?: string,
    "nonce"?: number,
    "chainId"?: number,
    "common"?: Common,
    "chain"?: string,
    "hardfork"?: string
  }`)
  // const [result, setResult] = useState("")

  const handleClick = async () => {
    const response = await sdk.eth.call([JSON.parse(value)])

    console.log({ response })
  }

  return (
    <Container>
      <Text>call(transaction)</Text>
      <Textarea
        value={value}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          setValue(e.target.value)
        }}
        marginTop={4}
        rows={12}
      />
      <Button
        appearance="primary"
        onClick={handleClick}
        maxWidth={140}
        justifyContent="center"
        marginTop={8}
      >
        Request
      </Button>
    </Container>
  )
}

export default Call
