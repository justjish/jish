import React, { useCallback, useEffect, useState } from 'react';
import { animated, useSpring, useSprings } from 'react-spring';
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
import { useOnScreen } from 'hooks/useOnScreen';
import { uid } from 'uid';
import { useHover } from 'react-use-gesture';
import styled from 'styled-components';
import randomColor from 'randomcolor';
import { divide } from 'lodash';
const DATA = [
  {
    key: uid(),
    text: 'React',
    icon: <FaReact />,
    type: 'library',
  },
  {
    key: uid(),
    text: 'Node',
    icon: <FaNodeJs />,
    type: 'runtime',
  },
  {
    key: uid(),
    text: 'Javascript',
    icon: <SiJavascript />,
    type: 'language',
  },
  {
    key: uid(),
    text: 'Typescript',
    icon: <SiTypescript />,
    type: 'language',
  },
  {
    key: uid(),
    text: 'Functional',
    icon: <AiOutlineFunction />,
    type: 'paradigm',
  },
  {
    key: uid(),
    text: 'Redux',
    icon: <SiRedux />,
    type: 'frontend',
  },
  {
    key: uid(),
    text: 'Java',
    icon: <SiJava />,
    type: 'language',
  },
  {
    key: uid(),
    text: 'Python',
    icon: <SiPython />,
    type: 'language',
  },
  {
    key: uid(),
    text: 'AWS',
    icon: <SiAmazon />,
    type: 'cloud',
  },
  {
    key: uid(),
    text: 'GCP',
    icon: <SiGooglecloud />,
    type: 'cloud',
  },
  {
    key: uid(),
    text: 'Deno',
    icon: <SiDeno />,
    type: 'runtime',
  },
  {
    key: uid(),
    text: 'Flutter',
    icon: <SiFlutter />,
    type: 'framework',
  },
  {
    key: uid(),
    text: 'Github',
    icon: <SiGithub />,
    type: 'development',
  },
  {
    key: uid(),
    text: 'Terraform',
    icon: <SiTerraform />,
    type: 'IaC',
  },
  {
    key: uid(),
    text: 'HTTP',
    icon: <MdHttp />,
    type: 'protocal',
  },
  {
    key: uid(),
    text: 'Firebase',
    icon: <SiFirebase />,
    type: 'database',
  },
  {
    key: uid(),
    text: 'MongoDB',
    icon: <SiMongodb />,
    type: 'database',
  },
  {
    key: uid(),
    text: 'Docker',
    icon: <SiDocker />,
    type: 'IaC',
  },
  {
    key: uid(),
    text: 'Graph Theory',
    icon: <GrNodes />,
    type: 'concepts',
  },
];

// const AnimatedSkills: React.FC<{ style: React.CSSProperties }> = ({ children, style }) => {
//   const [ref, visible] = useOnScreen({ threshold: 0.1 });
//   const items = React.Children.toArray(children);
//   const springs = useSprings(
//     items.length,
//     items.map((item, i) => ({ opacity: visible ? 1 : 0 })),
//   );
//   return (
//     <animated.div ref={ref} style={style as any}>
//       {springs.map((v, i) => (
//         <animated.div key={i} style={{ ...v } as any}>
//           {items[i]}
//         </animated.div>
//       ))}
//     </animated.div>
//   );
// };

const createStaticStars = () => {
  const stars = new Set<[x: number, y: number]>();
  const starRng = _.range(300);
  void starRng.map(() => stars.add([Math.floor(Math.random() * 1200), Math.floor(Math.random() * 900)]));
  return stars;
}


const Stars: React.FC = () => {
  const [stars, set] = useState(createStaticStars());
  return (
    <>
      {[...stars.keys()].map((v, i) => <Star key={i} initX={v[0]} initY={v[1]} fixed={(i % 2 === 0)}/>)}
      <Star initX={300} initY={250} fixed ></Star>
      <Star initX={500} initY={250} fixed ></Star>
      <Star initX={800} initY={250} fixed ></Star>
      <Star initX={400} initY={550} fixed ></Star>
      <Star initX={800} initY={700} fixed ></Star>
      <Star initX={500} initY={700} fixed ></Star>
      <Star initX={100} initY={700} fixed ></Star>
      <Star initX={300} initY={900} fixed ></Star>
      <Star initX={200} initY={425} fixed ></Star>
      <Star initX={925} initY={440} fixed ></Star>
      <Star initX={900} initY={900} fixed ></Star>
      <Star initX={900} initY={900} fixed ></Star>
      <Star initX={900} initY={900} fixed ></Star>
      <Star initX={900} initY={900} fixed ></Star>
      <Star initX={900} initY={900} fixed ></Star>
      <Star initX={900} initY={900} fixed ></Star>
    </>
  );
};

const Star: React.FC<{ initX: number; initY: number, fixed?:boolean}> = ({ initX, initY, fixed=false }) => {
  const [props, set] = useSpring(
    {
      from: {
        background: 'rgba(226, 230, 15, 0.945)',
        borderRadius: '50%',
        position: fixed? 'fixed' : 'absolute',
        x: initX,
        y: initY,
        zIndex: '-5',
        width: '10px',
        height: '10px',
      },
    },
    [],
  );
  return <animated.div style={props as any} />;
};


const Skill: React.FC<{ icon: JSX.Element; text: string; type: string }> = ({ icon, text, type }) => {
  const [{ opacity }, set] = useSpring({ opacity: 0 }, []);
  const bind = useHover(() => set({ opacity: 1 }));
  return (
    <div
      style={{color: randomColor({ luminosity: 'dark',seed: type })} as any}
      {...bind()}
    >
      {icon}
    </div>
  );
};
export const Skills = () => {
  return (
    <animated.div
      style={
        {
          background: '#00b8e6',
          position: 'relative',
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          textAlign: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '8vw'
        } as any
      }
    >
      {DATA.map((props, index) => (
        <Skill {...props}></Skill>
      ))}
    </animated.div>
  );
};
