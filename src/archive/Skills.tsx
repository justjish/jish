// import React, { useEffect, useCallback} from 'react';
// import { animated as a, useSpring, config} from 'react-spring';
// import randomColor from 'randomcolor';
// import styled from 'styled-components';
// import { IconType } from 'react-icons/lib';
// import { useOnScreen } from 'hooks/useOnScreen';
// import { Invisible } from 'components/Invisible';
// import useShared from 'hooks/useShared';
// import DATA from 'data/SKILLS';

// const StyledSkill = styled(a.svg)`
//   height: 20%;
//   width: 20%;
//   padding-top: 12px;
// `;

// const Skill: React.FC<{ idx: number; Icon: IconType; text: string; type: string, show: boolean }> = ({ idx, Icon, text, type, show }) => {
//   const props = useSpring({ scale: show ? 1 : 0, color: randomColor({ luminosity: 'light', seed: type }), config: config.slow });
//   return <StyledSkill style={props as any}><Icon /></StyledSkill>
// };


// const StyledSkills = styled(a.div)`
//   background: rgba(255, 255, 255, 0.25);
//   box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
//   backdrop-filter: blur(5px);
//   -webkit-backdrop-filter: blur(5px);
//   border-radius: 32px;
//   position: absolute;
//   z-index: 10;
//   height: 40vh;
//   width: 80%;
//   top: 120%;
//   left: 50%;
//   transform: translate(-50%, -50%);
// `;

// export const Skills:React.FC<{ skills?: typeof DATA}> = ({skills=DATA}) => {
//   const [topRef, topTrigger] = useOnScreen({ threshold: 1 });
//   const [botRef, botTrigger] = useOnScreen({ threshold: 1 });
//   const setHeading = useShared(state => state.setHeading);
//   const [style, setStyle] = useSpring({ opacity: 0, config: config.stiff }, []);
//   const onShow = useCallback(() => {
//     setHeading("My Skills");
//     setStyle({ opacity: 1 });
//   }, []);
//   const onHide = useCallback(() => {
//     setHeading("Keep Scrolling");
//     setStyle({ opacity: 0 });
//   }, []);
//   useEffect(() => topTrigger && !botTrigger ? onShow() : onHide(), [topTrigger, botTrigger]);

//   return (
//     <>
//       <StyledSkills style={style as any}>
//         {skills.map((props, idx) => <Skill idx={idx} show={(topTrigger && !botTrigger)} {...props} />)}
//       </StyledSkills>
//       <Invisible ref={topRef as any} reaching={150}/>
//       <Invisible ref={botRef as any} reaching={180}/>
//     </>
//   );
// };
// export default Skills;

export default {};