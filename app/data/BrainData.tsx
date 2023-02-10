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
  { idx: 1, size: Sizes.lg, type: Types.library, desc: 'React', Icon: FaReact },
  { idx: 2, size: Sizes.lg, type: Types.runtime, desc: 'Node', Icon: FaNodeJs },
  { idx: 3, size: Sizes.lg, type: Types.language, desc: 'Javascript', Icon: SiJavascript },
  { idx: 4, size: Sizes.lg, type: Types.language, desc: 'Typescript', Icon: SiTypescript },
  { idx: 5, size: Sizes.md, type: Types.paradigm, desc: 'Function(al)(Programming)', Icon: AiOutlineFunction },
  { idx: 6, size: Sizes.sm, type: Types.frontend, desc: 'Redux', Icon: SiRedux },
  { idx: 7, size: Sizes.sm, type: Types.language, desc: 'Java', Icon: SiJava },
  { idx: 8, size: Sizes.md, type: Types.language, desc: 'Python', Icon: SiPython },
  { idx: 9, size: Sizes.sm, type: Types.cloud, desc: 'AWS', Icon: SiAmazon },
  { idx: 10, size: Sizes.lg, type: Types.cloud, desc: 'Google Cloud', Icon: SiGooglecloud },
  { idx: 11, size: Sizes.sm, desc: 'Deno', type: Types.runtime, Icon: SiDeno },
  { idx: 12, size: Sizes.sm, desc: 'Flutter', type: Types.framework, Icon: SiFlutter },
  { idx: 13, size: Sizes.sm, type: Types.common, desc: 'Github', Icon: SiGithub },
  { idx: 14, size: Sizes.sm, type: Types.devops, desc: 'Terraform', Icon: SiTerraform },
  { idx: 15, size: Sizes.sm, type: Types.protocol, desc: 'HTTP/3', Icon: MdHttp },
  { idx: 16, size: Sizes.md, type: Types.database, desc: 'Firebase', Icon: SiFirebase },
  { idx: 17, size: Sizes.md, type: Types.database, desc: 'MongoDB + Atlas', Icon: SiMongodb },
  { idx: 18, size: Sizes.lg, type: Types.devops, desc: 'Docker', Icon: SiDocker },
  { idx: 19, size: Sizes.md, type: Types.concept, desc: 'Graph Theory', Icon: GrNodes },
  { idx: 20, size: Sizes.lg, type: Types.library, desc: 'React Hooks' },
  { idx: 21, size: Sizes.lg, type: Types.library, desc: 'Webpack' },
  { idx: 22, size: Sizes.lg, type: Types.library, desc: 'Rollup' },
  { idx: 23, size: Sizes.lg, type: Types.frontend, desc: 'Snowpack' },
  { idx: 24, size: Sizes.lg, type: Types.frontend, desc: 'Vite.js' },
  { idx: 25, size: Sizes.lg, type: Types.frontend, desc: 'Parcel' },
  { idx: 27, size: Sizes.md, type: Types.concept, desc: 'CI/CD' },
  { idx: 28, size: Sizes.lg, type: Types.language, desc: 'C' },
  { idx: 30, size: Sizes.sm, type: Types.language, desc: 'LaTeX' },
  { idx: 31, size: Sizes.sm, type: Types.language, desc: 'Prolog' },
  { idx: 32, size: Sizes.sm, type: Types.language, desc: 'MUMPS' },
  { idx: 33, size: Sizes.sm, type: Types.language, desc: 'LISP' },
  { idx: 34, size: Sizes.sm, type: Types.language, desc: 'Scheme' },
  { idx: 35, size: Sizes.sm, type: Types.language, desc: 'Objectscript' },
  { idx: 36, size: Sizes.md, type: Types.library, desc: 'Express' },
  { idx: 37, size: Sizes.sm, type: Types.library, desc: 'Angular 1' },
  { idx: 40, size: Sizes.md, type: Types.frontend, desc: 'Android' },
  { idx: 43, size: Sizes.md, type: Types.concept, desc: 'OO extends P' },
  { idx: 44, size: Sizes.md, type: Types.concept, desc: 'Data Modeling' },
  { idx: 46, size: Sizes.sm, type: Types.concept, desc: 'Agile' },
  { idx: 47, size: Sizes.sm, type: Types.concept, desc: 'TDD' },
  { idx: 48, size: Sizes.sm, type: Types.concept, desc: 'Mentor' },
  { idx: 51, size: Sizes.lg, type: Types.concept, desc: 'NoSQL Databases' },
  { idx: 52, size: Sizes.sm, type: Types.concept, desc: 'SQL' },
  { idx: 53, size: Sizes.sm, type: Types.devops, desc: 'Postgres' },
  { idx: 54, size: Sizes.sm, type: Types.devops, desc: 'MySQL' },
  { idx: 55, size: Sizes.sm, type: Types.concept, desc: 'Publish and Subscribe' },
  { idx: 56, size: Sizes.sm, type: Types.concept, desc: 'Unit Tests' },
  { idx: 57, size: Sizes.sm, type: Types.devops, desc: 'A/B Testing' },
  { idx: 58, size: Sizes.sm, type: Types.concept, desc: 'Internet of Things (IOT)' },
  { idx: 59, size: Sizes.lg, type: Types.concept, desc: 'Microservices' },
  { idx: 60, size: Sizes.sm, type: Types.devops, desc: 'Git' },
  { idx: 61, size: Sizes.sm, type: Types.devops, desc: 'SVN' },
  { idx: 62, size: Sizes.sm, type: Types.concept, desc: 'Machine Learning' },
  { idx: 63, size: Sizes.md, type: Types.concept, desc: 'Web Crawling' },
  { idx: 64, size: Sizes.sm, type: Types.team, desc: 'Project Management' },
  { idx: 65, size: Sizes.sm, type: Types.hardware, desc: 'Raspberry Pi ' },
];

export default BrainData;
