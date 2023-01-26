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

const GetTransactionByHash = ({ sdk }: OwnProps): React.ReactElement => {
  const [hash, setHash] = useState(
    "0x0e6cd6237b4d3e5c3f348b78399f031b527e832bd30924951ba4921cdbf440d7"
  )
  // const [result, setResult] = useState("")

  const handleClick = async () => {
    const response = await sdk.eth.getTransactionByHash([hash])

    console.log({ response })
  }

  return (
    <Container>
      <Text>getTransactionByHash(hash)</Text>
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

export default GetTransactionByHash
