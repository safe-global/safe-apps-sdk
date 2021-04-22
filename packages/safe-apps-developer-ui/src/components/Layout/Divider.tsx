import { border } from 'src/styles/variables';

const style = {
  borderRight: `solid 2px ${border}`,
  height: '100%',
};

const Divider = ({ className }: { className?: string }): React.ReactElement => (
  <div className={className} style={style} />
);

export { Divider };
