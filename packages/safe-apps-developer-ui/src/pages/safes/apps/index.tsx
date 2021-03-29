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

const FrameMessage = ({ state }: { state: AppState }): React.ReactElement | null => {
  if (state === AppState.loaded) {
    return null;
  }

  return (
    <FrameContentCentered>
      {state === AppState.notAsked && <Typography variant="h2">Enter Safe App URL ⬆️</Typography>}
      {state === AppState.invalidUrl && <Typography variant="h2">❌ Invalid URL</Typography>}
      {state === AppState.invalidManifest && <Typography variant="h2">❌ Invalid App Manifest</Typography>}
    </FrameContentCentered>
  );
};

const SIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

const AppIframe = ({ url }: { url: string }): React.ReactElement => <SIframe title="Safe App iframe" src={url} />;

const Apps = (): React.ReactElement => {
  const [appUrl, setAppUrl] = React.useState('');
  const [appState, setAppState] = React.useState<AppState>(AppState.notAsked);

  React.useEffect(() => {
    if (appUrl === '' && (appState === AppState.invalidUrl || appState === AppState.invalidManifest)) {
      setAppState(AppState.notAsked);
    }
  }, [appState, appUrl]);

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
              onChange={(e) => {
                if (appState === AppState.loaded) {
                  setAppState(AppState.notAsked);
                }

                setAppUrl(e.target.value);
              }}
            />
          </form>
        </CardContent>
      </Card>
      <AppFrame>
        <FrameMessage state={appState} />
        {appState === AppState.loaded && <AppIframe url={appUrl} />}
      </AppFrame>
    </Content>
  );
};

export default Apps;
