type Props = {
  className: string;
};

const CircleDot = (props: Props): React.ReactElement => (
  <div className={props.className}>
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10">
      <circle
        cx="208"
        cy="203"
        r="3"
        fill="none"
        fillRule="evenodd"
        stroke="#FF685E"
        strokeWidth="3"
        transform="translate(-203 -198)"
      />
    </svg>
  </div>
);

export { CircleDot };
