import React, { useCallback, useState } from 'react';
import styled from "styled-components";
import { Button, Loader, Title } from "@gnosis.pm/safe-react-components";
import { useSafe } from '@rmeissner/safe-apps-react-sdk';

const Container = styled.form`
  margin-bottom: 2rem;
  width: 100%;
  max-width: 480px;

  display: grid;
  grid-template-columns: 1fr;
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
`;

const App: React.FC = () => {
  const safe = useSafe()  
  const [submitting, setSubmitting] = useState(false)
  const submitTx = useCallback(async () => {
    setSubmitting(true)
    try {
      const safeTxHash = await safe.sendTransactions([
        {
          "to": safe.info.safeAddress,
          "value": "0",
          "data": "0x"
        }
      ])
      console.log({safeTxHash})
      const safeTx = await safe.loadSafeTransaction(safeTxHash)
      console.log({safeTx})
    } catch (e) {
      console.error(e)
    }
    setSubmitting(false)
  }, [safe])
  return <Container>
    <Title size="md">{safe.info.safeAddress}</Title>
    {submitting ? 
    <>
      <Loader size="md" /><br/>
      <Button size="lg" color="secondary" onClick={() => {setSubmitting(false)}}>Cancel</Button>
    </>
    : 
    <Button size="lg" color="primary" onClick={submitTx}>Submit</Button>
    }
  </Container>
};

export default App;
