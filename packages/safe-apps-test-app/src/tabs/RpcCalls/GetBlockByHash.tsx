import React, { useState } from "react"
import styled from "styled-components"
import { Button, TextInput, Text } from "evergreen-ui"
import SdkInstance from "@safe-global/safe-apps-sdk"

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

type OwnProps = {
  sdk: SdkInstance
}

const GetBlockByHash = ({ sdk }: OwnProps): React.ReactElement => {
  const [hash, setHash] = useState(
    "0x1955a9f306903669e295196752b11bc0dee33b48cabdf44b1103b7cea086cae7"
  )
  // const [result, setResult] = useState("")

  const handleClick = async () => {
    const response = await sdk.eth.getBlockByHash([hash])

    console.log({ response })
  }

  return (
    <Container>
      <Text>getBlockByHash(hash)</Text>
      <TextInput
        value={hash}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setHash(e.target.value)
        }}
        marginTop={4}
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

export default GetBlockByHash
