
import { FaNodeJs, FaReact } from 'react-icons/fa';
import {
  SiAmazon,
  SiDeno,
  SiDocker,
  SiFirebase,
  SiFlutter,
  SiGithub,
  SiGooglecloud,
  SiJava,
  SiJavascript,
  SiMongodb,
  SiPython,
  SiRedux,
  SiTerraform,
  SiTypescript,
} from 'react-icons/si';
import { RiMoreLine } from 'react-icons/ri';
import { AiOutlineFunction } from 'react-icons/ai';
import { MdHttp } from 'react-icons/md';
import { GrNodes } from 'react-icons/gr';
import { uid } from 'uid';
export const DATA = [
  {
    key: uid(),
    text: 'React',
    Icon: FaReact,
    type: 'library',
  },
  {
    key: uid(),
    text: 'Node',
    Icon: FaNodeJs,
    type: 'runtime',
  },
  {
    key: uid(),
    text: 'Javascript',
    Icon: SiJavascript,
    type: 'language',
  },
  {
    key: uid(),
    text: 'Typescript',
    Icon: SiTypescript,
    type: 'language',
  },
  {
    key: uid(),
    text: 'Functional',
    Icon: AiOutlineFunction,
    type: 'paradigm',
  },
  {
    key: uid(),
    text: 'Redux',
    Icon: SiRedux,
    type: 'frontend',
  },
  {
    key: uid(),
    text: 'Java',
    Icon: SiJava,
    type: 'language',
  },
  {
    key: uid(),
    text: 'Python',
    Icon: SiPython,
    type: 'language',
  },
  {
    key: uid(),
    text: 'AWS',
    Icon: SiAmazon,
    type: 'cloud',
  },
  {
    key: uid(),
    text: 'GCP',
    Icon: SiGooglecloud,
    type: 'cloud',
  },
  {
    key: uid(),
    text: 'Deno',
    Icon: SiDeno,
    type: 'runtime',
  },
  {
    key: uid(),
    text: 'Flutter',
    Icon: SiFlutter,
    type: 'framework',
  },
  {
    key: uid(),
    text: 'Github',
    Icon: SiGithub,
    type: 'development',
  },
  {
    key: uid(),
    text: 'Terraform',
    Icon: SiTerraform,
    type: 'IaC',
  },
  {
    key: uid(),
    text: 'HTTP',
    Icon: MdHttp,
    type: 'protocal',
  },
  {
    key: uid(),
    text: 'Firebase',
    Icon: SiFirebase,
    type: 'database',
  },
  {
    key: uid(),
    text: 'MongoDB',
    Icon: SiMongodb,
    type: 'database',
  },
  {
    key: uid(),
    text: 'Docker',
    Icon: SiDocker,
    type: 'IaC',
  },
  {
    key: uid(),
    text: 'Graph Theory',
    Icon: GrNodes,
    type: 'concepts',
  },
  {
    key: uid(),
    text: 'and more',
    Icon: RiMoreLine,
    type: 'Resume'
  }
];
export default DATA;