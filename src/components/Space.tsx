import React from 'react';
import { Section } from 'common/Section';
export const Space:React.FC<{vh:number}> = ({vh=10}) => <Section style={{height: `${vh}vh`} as any}/>;