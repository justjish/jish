import EllenRosenbaumRealEstate from '~/svgs/EllenRosenbaumRealEstate';
import EllipsisHealth from '~/svgs/EllipsisHealth';
import Elementus from '~/svgs/Elementus';
import Netsmart from '~/svgs/Netsmart';
import Rutgers from '~/svgs/Rutgers';
import { AnimatedSVGFn } from '~/svgs/AnimatedSVG.types';

export const StoryData = [
  {
    Logo: EllipsisHealth,
    focus: 'Principal Software Engineer',
    time: '2021 - 2023',
    color: `rgba(58, 186, 182, 1.00)`,
    speed: 1,
    includePlus: true,
  },
  {
    Logo: Elementus,
    focus: 'Full Stack Developer',
    time: '2020',
    color: 'rgba(121, 61, 251, 1.00)',
    speed: 2,
    includePlus: true,
  },
  {
    Logo: Netsmart,
    focus: 'Software Engineer',
    time: '2016 - 2018',
    color: 'rgba(44, 79, 120, 1.00)',
    speed: 3,
    includePlus: true,
  },
  {
    Logo: Rutgers,
    focus: 'B.A. Computer Science',
    time: '2016',
    color: 'rgba(225, 26, 55, 1.00)',
    speed: 4,
    includePlus: true,
  },
  {
    Logo: EllenRosenbaumRealEstate,
    focus: 'Head of IT and Marketing',
    time: '2011-2016',
    color: 'rgba(60, 132, 86, 1.00)',
    speed: 5,
    includePlus: false,
  },
] as { Logo: AnimatedSVGFn; focus: string; time: string; color: string; speed: number; includePlus: boolean }[];
export default StoryData;
