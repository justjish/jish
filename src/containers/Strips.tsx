import React from 'react';
import { MovingStrip } from 'components/MovingStrip';
import { BlueStrip } from 'components/BlueStrip';

export const Strips = () => (
  <>
    <BlueStrip color="rgba(4, 40, 110, 1.00)" />
    <MovingStrip />
  </>
);
export default Strips;
