import React from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { md, sm } from 'src/styles/variables';

const Content = styled.div`
  padding: ${md} ${sm};
`;

const Apps = (): React.ReactElement => {
  const [appUrl, setAppUrl] = React.useState('');

  return (
    <Content>
      <Card>
        <CardContent>
          <TextField
            placeholder="Enter app URL"
            style={{ width: '100%' }}
            value={appUrl}
            onChange={(e) => setAppUrl(e.target.value)}
          />
        </CardContent>
      </Card>
      <iframe title="Safe App iframe" />
    </Content>
  );
};

export default Apps;
