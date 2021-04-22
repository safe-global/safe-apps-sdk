import { useState } from 'react';

type ReturnValue = {
  open: boolean;
  toggle: () => void;
  close: () => void;
};

export const useOpenHandler = (openInitially = false): ReturnValue => {
  const [open, setOpen] = useState(openInitially);

  return {
    open,
    toggle: () => setOpen((open) => !open),
    close: () => setOpen(false),
  };
};
