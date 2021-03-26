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
import { AiOutlineFunction } from 'react-icons/ai';
import { MdHttp } from 'react-icons/md';
import { GrNodes } from 'react-icons/gr';
import { IconType } from 'react-icons';

/**
 * A categorical breakdown of knowledge breakdown.
 */
export enum Types {
  library = 'Library',
  runtime = 'Runtime',
  language = 'Language',
  paradigm = 'Paradigm',
  frontend = 'Frontend',
  cloud = 'cloud',
  framework = 'framework',
  protocol = 'protocol',
  database = 'database',
  concept = 'concept',
  common = 'common',
  devops = 'DevOps',
  team = 'Team',
  hardware = 'Hardware',
}
export enum Sizes {
  sm = 25,
  md = 50,
  lg = 75,
}

export type SkillItem = {
  idx: number;
  desc: string;
  Icon?: IconType;
  type: Types;
  size: Sizes;
};
/**TODO: Get Icons for Everything... */
/** Maybe create a masonry grid?  */
export const BrainData: Array<SkillItem> = [
  {idx: 1, desc: 'React', Icon: FaReact, type: Types.library,size: Sizes.lg},
  {idx: 2, desc: 'Node',Icon: FaNodeJs,type: Types.runtime,size: Sizes.lg,},
  {idx: 3, desc: 'Javascript',Icon: SiJavascript,type: Types.language,size: Sizes.lg},
  {idx: 4, desc: 'Typescript',Icon: SiTypescript,type: Types.language,size: Sizes.lg},
  {idx: 5, desc: 'Function(al)(Programming)',Icon: AiOutlineFunction,type: Types.paradigm,size: Sizes.md,},
  {idx: 6, desc: 'Redux',Icon: SiRedux,type: Types.frontend,size: Sizes.sm,},
  {idx: 7, desc: 'Java',Icon: SiJava,type: Types.language,size: Sizes.sm, },
  {idx: 8, desc: 'Python',Icon: SiPython,type: Types.language,size: Sizes.md,},
  {idx: 9, desc: 'AWS',Icon: SiAmazon,type: Types.cloud,size: Sizes.sm,},
  {idx: 10, desc: 'Google Cloud',Icon: SiGooglecloud,type: Types.cloud,size: Sizes.lg,},
  {idx: 11, desc: 'Deno',Icon: SiDeno,type: Types.runtime,size: Sizes.sm,},
  {idx: 12, desc: 'Flutter',Icon: SiFlutter,type: Types.framework,size: Sizes.sm,},
  {idx: 13, desc: 'Github',Icon: SiGithub,type: Types.common,size: Sizes.sm},
  {idx: 14, desc: 'Terraform',Icon: SiTerraform,type: Types.devops,size: Sizes.sm},
  {idx: 15, desc: 'HTTP/3',Icon: MdHttp,type: Types.protocol,size: Sizes.sm,},
  {idx: 16, desc: 'Firebase',Icon: SiFirebase,type: Types.database,size: Sizes.md,},
  {idx: 17, desc: 'MongoDB + Atlas',Icon: SiMongodb,type: Types.database,size: Sizes.md,},
  {idx: 18, desc: 'Docker',Icon: SiDocker,type: Types.devops,size: Sizes.lg,},
  {idx: 19, desc: 'Graph Theory',Icon: GrNodes,type: Types.concept,size: Sizes.md,},
  {idx: 20, size: Sizes.lg, type: Types.library, desc: 'React Hooks' },
  {idx: 21, size: Sizes.lg, type: Types.library, desc: 'Webpack' },
  {idx: 22, size: Sizes.lg, type: Types.library, desc: 'Rollup' },
  {idx: 23, size: Sizes.lg, type: Types.frontend, desc: 'Snowpack' },
  {idx: 24, size: Sizes.lg, type: Types.frontend, desc: 'Vite.js' },
  {idx: 25, size: Sizes.lg, type: Types.frontend, desc: 'Parcel' },
  {idx: 27, size: Sizes.md, type: Types.concept, desc: 'CI/CD' },
  {idx: 28, size: Sizes.lg, type: Types.language, desc: 'C' },
  {idx: 30, size: Sizes.sm, type: Types.language, desc: 'LaTeX' },
  {idx: 31, size: Sizes.sm, type: Types.language, desc: 'Prolog' },
  {idx: 32, size: Sizes.sm, type: Types.language, desc: 'MUMPS' },
  {idx: 33, size: Sizes.sm, type: Types.language, desc: 'LISP' },
  {idx: 34, size: Sizes.sm, type: Types.language, desc: 'Scheme' },
  {idx: 35, size: Sizes.sm, type: Types.language, desc: 'Objectscript' },
  {idx: 36, size: Sizes.md, type: Types.library, desc: 'Express' },
  {idx: 37, size: Sizes.sm, type: Types.library, desc: 'Angular 1' },
  {idx: 40, size: Sizes.md, type: Types.frontend, desc: 'Android' },
  {idx: 43, size: Sizes.md, type: Types.concept, desc: 'OO extends P' },
  {idx: 44, size: Sizes.md, type: Types.concept, desc: 'Data Modeling' },
  {idx: 46, size: Sizes.sm, type: Types.concept, desc: 'Agile' },
  {idx: 47, size: Sizes.sm, type: Types.concept, desc: 'TDD' },
  {idx: 48, size: Sizes.sm, type: Types.concept, desc: 'Mentor' },
  {idx: 51, size: Sizes.lg, type: Types.concept, desc: 'NoSQL Databases' },
  {idx: 52, size: Sizes.sm, type: Types.concept, desc: 'SQL' },
  {idx: 53, size: Sizes.sm, type: Types.devops, desc: 'Postgres' },
  {idx: 54, size: Sizes.sm, type: Types.devops, desc: 'MySQL' },
  {idx: 55, size: Sizes.sm, type: Types.concept, desc: 'Publish and Subscribe' },
  {idx: 56, size: Sizes.sm, type: Types.concept, desc: 'Unit Tests' },
  {idx: 57, size: Sizes.sm, type: Types.devops, desc: 'A/B Testing' },
  {idx: 58, size: Sizes.sm, type: Types.concept, desc: 'Internet of Things (IOT)' },
  {idx: 59, size: Sizes.lg, type: Types.concept, desc: 'Microservices' },
  {idx: 60, size: Sizes.sm, type: Types.devops, desc: 'Git' },
  {idx: 61, size: Sizes.sm, type: Types.devops, desc: 'SVN' },
  {idx: 62, size: Sizes.sm, type: Types.concept, desc: 'Machine Learning' },
  {idx: 63, size: Sizes.md, type: Types.concept, desc: 'Web Crawling' },
  {idx: 64, size: Sizes.sm, type: Types.team, desc: 'Project Management' },
  {idx: 65, size: Sizes.sm, type: Types.hardware, desc: 'Raspberry Pi ' },
];

export default BrainData;
