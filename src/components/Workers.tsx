import * as React from 'react';
//@ts-ignore
import { render } from 'react-nil';
import useStore from '../hooks/useStore';
import { useDatabase } from '../hooks/useFirebase';
import * as R from 'ramda';

const Worker = () => {
  const loadMeta = useStore(React.useCallback((state) => state.actions.loadMeta, []));
  React.useEffect(() => void loadMeta(), []);
  return null;
};
export default Worker;
