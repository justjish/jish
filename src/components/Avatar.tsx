import React from 'react';
import styled from 'styled-components';
import { animated as a, useSpring, config } from 'react-spring';
import { useGesture } from 'react-use-gesture';
import { useInteract } from 'hooks/useMenu';

const AvatarContainer = styled(a.img)`
  border-radius: 50%;
  backdrop-filter: blur(32px);
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;
export const Avatar: React.FC<{ profile: string }> = ({ profile }) => {
  const { bind, scale } = useInteract({ onClick: () => { } })
  const { y } = useSpring({ y: -32 });
  return <AvatarContainer {...bind()} style={{ width: 128, height: 128, y, scale}} src={profile} alt={'image'} />;
};