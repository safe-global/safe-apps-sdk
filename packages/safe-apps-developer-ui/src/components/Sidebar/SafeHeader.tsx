import React from 'react';

type Props = {
  network: string;
};

const SafeHeader = ({ network }: Props): React.ReactElement => {
  return <div>{network}</div>;
};

export { SafeHeader };
