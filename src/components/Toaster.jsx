import React from 'react';
//@ts-ignore
import { render } from 'react-nil';
import { useToasts } from 'react-toast-notifications';
import useStore from '../hooks/useStore';

const Toaster = () => {
  const { addToast } = useToasts();
  const selected = useStore((state) => state.store.selected);
  React.useEffect(
    () =>
      typeof selected == 'string'
        ? addToast(`Loading ${selected} now...`, { appearance: 'info', autoDismiss: true })
        : addToast(`Select a dataset from above to continue.`, { appearance: 'info', autoDismiss: true }),
    [selected],
  );
  return null;
};
export default Toaster;
