import React from 'react';
import { section } from 'styles/section.style';
export const Space:React.FC<{vh:number}> = ({vh=10}) => <div css={section} style={{height: `${vh}vh`} as any}/>;