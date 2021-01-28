import React from 'react';
import { useSpring, animated as a } from 'use-spring';


const Circle = ({ cx = "50", cy = "50", radius = "50" }) => <circle cx={cx} cy={cy} r={radius}/>;


const Loading = ({ }) => <svg><Circle /><Circle /><Circle></Circle></svg>

export default Loading;