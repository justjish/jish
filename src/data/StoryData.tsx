import elementus from 'assets/logos/elementus.svg';
import netsmart from 'assets/logos/netsmart.svg';
import rutgers from 'assets/logos/rutgers.svg';
import erre from 'assets/logos/erre.svg'; //Note that I recreated this image by hand as an svg to get my lighthouse score up :)

export const StoryData = [
  {
    logo: elementus,
    focus: 'Full Stack Developer',
    time: '2020',
    color: 'rgba(121, 61, 251, 1.00)',
    speed: 1,
    includePlus: true,
  },
  {
    logo: netsmart,
    focus: 'Software Engineer',
    time: '2016-2018',
    color: 'rgba(44, 79, 120, 1.00)',
    speed: 2,
    includePlus: true,
  },
  {
    logo: rutgers,
    focus: 'B.A. Computer Science',
    time: '2016',
    color: 'rgba(225, 26, 55, 1.00)',
    speed: 3,
    includePlus: true,
  },
  {
    logo: erre,
    focus: 'Head of IT and Marketing',
    time: '2011-2016',
    color: 'rgba(60, 132, 86, 1.00)',
    speed: 4,
    includePlus: false,
  },
  
];
export default StoryData;