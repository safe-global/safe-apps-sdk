import React from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';

import CardContent from '@material-ui/core/CardContent';
import { md, sm } from 'src/styles/variables';
import { Typography } from '@material-ui/core';
import { isValidURL, removeTrailingSlash } from 'src/utils/strings';
import { fetchJSON } from 'src/utils/fetch';
import { AppState, isAppManifestValid } from './utils';

const Content = styled.div`
  padding: ${md} ${sm};
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const AppFrame = styled(Card)`
  margin-top: 10px;
  flex-grow: 1;
`;

const FrameContentCentered = styled(CardContent)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex-direction: column;
`;

const EnterURL = () => (
  <FrameContentCentered>
    <Typography variant="h2">Enter Safe App URL ⬆️</Typography>
  </FrameContentCentered>
);

const Apps = (): React.ReactElement => {
  const [appUrl, setAppUrl] = React.useState('');
  const [appState, setAppState] = React.useState<AppState>(AppState.notAsked);

  const onUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isValidURL(appUrl)) {
      const url = removeTrailingSlash(appUrl);
      try {
        const manifest = await fetchJSON(`${url}/manifest.json`);

        if (!isAppManifestValid(manifest)) {
          setAppState(AppState.invalidManifest);
          return;
        }

        setAppState(AppState.loaded);
      } catch (err) {
        console.error(err);
        setAppState(AppState.failed);
      }
    } else {
      setAppState(AppState.invalidUrl);
    }
  };

  return (
    <Content>
      <Card>
        <CardContent>
          <form onSubmit={onUrlSubmit}>
            <TextField
              placeholder="Enter Safe App URL"
              style={{ width: '100%' }}
              value={appUrl}
              onChange={(e) => setAppUrl(e.target.value)}
            />
          </form>
        </CardContent>
      </Card>
      <AppFrame>
        <EnterURL />
      </AppFrame>
      {/* <iframe title="Safe App iframe" /> */}
    </Content>
  );
};

export default Apps;
