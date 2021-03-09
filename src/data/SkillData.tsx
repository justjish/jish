
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
import { IconType } from 'react-icons';

export enum Types {
  library = "library",
  runtime = "runtime",
  language = "language",
  paradigm = "paradigms",
  frontend = "frontend",
  cloud = "cloud",
  framework = "framework",
  protocol = "protocol",
  database = "database",
  IaC = "IaC",
  concept = "concept",
  development = "development",
  resume = "Resume"
}
export enum Sizes {
  sm = 25,
  md = 50,
  lg = 75,
}

type SkillItem = {
  key: string;
  text: string;
  Icon: IconType;
  type: Types;
  size: Sizes;
}
export const SkillList : Array<SkillItem> = [
  {
    key: uid(),
    text: 'React',
    Icon: FaReact,
    type: Types.library,
    size: Sizes.lg
  },
  {
    key: uid(),
    text: 'Node',
    Icon: FaNodeJs,
    type: Types.runtime,
    size: Sizes.lg
  },
  {
    key: uid(),
    text: 'Javascript',
    Icon: SiJavascript,
    type: Types.language,
    size: Sizes.lg
  },
  {
    key: uid(),
    text: 'Typescript',
    Icon: SiTypescript,
    type: Types.language,
    size: Sizes.lg
  },
  {
    key: uid(),
    text: 'Functional',
    Icon: AiOutlineFunction,
    type: Types.paradigm,
    size: Sizes.md
  },
  {
    key: uid(),
    text: 'Redux',
    Icon: SiRedux,
    type: Types.frontend,
    size: Sizes.sm
  },
  {
    key: uid(),
    text: 'Java',
    Icon: SiJava,
    type: Types.language,
    size: Sizes.sm
  },
  {
    key: uid(),
    text: 'Python',
    Icon: SiPython,
    type: Types.language,
    size: Sizes.md
  },
  {
    key: uid(),
    text: 'AWS',
    Icon: SiAmazon,
    type: Types.cloud,
    size: Sizes.sm
  },
  {
    key: uid(),
    text: 'GCP',
    Icon: SiGooglecloud,
    type: Types.cloud,
    size: Sizes.lg
  },
  {
    key: uid(),
    text: 'Deno',
    Icon: SiDeno,
    type: Types.runtime,
    size: Sizes.sm
  },
  {
    key: uid(),
    text: 'Flutter',
    Icon: SiFlutter,
    type: Types.framework,
    size: Sizes.sm
  },
  {
    key: uid(),
    text: 'Github',
    Icon: SiGithub,
    type: Types.development,
    size: Sizes.sm
  },
  {
    key: uid(),
    text: 'Terraform',
    Icon: SiTerraform,
    type: Types.IaC,
    size: Sizes.sm
  },
  {
    key: uid(),
    text: 'HTTP',
    Icon: MdHttp,
    type: Types.protocol,
    size: Sizes.sm
  },
  {
    key: uid(),
    text: 'Firebase',
    Icon: SiFirebase,
    type: Types.database,
    size: Sizes.md
  },
  {
    key: uid(),
    text: 'MongoDB',
    Icon: SiMongodb,
    type: Types.database,
    size: Sizes.md
  },
  {
    key: uid(),
    text: 'Docker',
    Icon: SiDocker,
    type: Types.IaC,
    size: Sizes.lg
  },
  {
    key: uid(),
    text: 'Graph Theory',
    Icon: GrNodes,
    type: Types.concept,
    size: Sizes.md
  },
];

export default SkillList;