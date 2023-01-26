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

const GetBlockByNumber = ({ sdk }: OwnProps): React.ReactElement => {
  const [number, setNumber] = useState("0xA8ACC3")
  // const [result, setResult] = useState("")

  const handleClick = async () => {
    const response = await sdk.eth.getBlockByNumber([parseInt(number, 16)])

    console.log({ response })
  }

  const handleLatestClick = async () => {
    const response = await sdk.eth.getBlockByNumber(["latest"])

    console.log({ response })
  }

  return (
    <Container>
      <Text>getBlockByNumber(number)</Text>
      <TextInput
        value={number}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setNumber(e.target.value)
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
      <Text marginTop={16}>getBlockByNumber("latest")</Text>
      <Button
        appearance="primary"
        onClick={handleLatestClick}
        maxWidth={140}
        justifyContent="center"
        marginTop={8}
      >
        Request
      </Button>
    </Container>
  )
}

export default GetBlockByNumber
