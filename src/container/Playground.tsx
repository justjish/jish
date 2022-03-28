import { useSpring, a } from 'react-spring';
import { FC, useEffect } from 'react';

const Playground: FC = () => {
  const { backgroundColor } = useSpring({ backgroundColor: 'rgba(21, 16, 25, 1.00)' });

  useEffect(() => {
    backgroundColor.start('white');
  }, []);

  return <a.div style={{ backgroundColor }}>"Hi"</a.div>;
};
export default Playground;
