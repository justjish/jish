import React from 'react';
import { animated as a, config, useSpring } from 'react-spring';
import { useOnScreen } from 'hooks/useOnScreen';
import elementus from 'assets/elementus.svg';
import netsmart from 'assets/netsmart.svg';
import rutgers from 'assets/rutgers.svg';
import erre from 'assets/erre.webp';
import useLocations from 'hooks/useLocations';
import { Section } from 'common/Section';
import { Flex } from 'common/Flex';
import { H0, H1, H3 } from 'common/Typography';
import { Place } from 'components/Place';
import { Years } from 'components/Years';

const Work: React.FC = () => {
  const registerPosition = useLocations(React.useCallback(state => state.setWork,[]));
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => registerPosition(ref.current?.offsetTop ?? 0), []);
  const [elem, visible] = useOnScreen({ threshold: .5 });
  const props = useSpring({ skewY: visible ? -10 : 0, opacity: visible ? 1 : 0 });
  
  return (
    <Section ref={ref}>
      <Flex><H3 style={{ opacity: props.opacity } as any}>Experienced</H3></Flex>
      <Flex ref={elem as any} style={{ skewY: props.skewY }}>
        <Place logo={elementus} focus={'Full Stack Developer'} time={'2020'} show={visible as boolean} />
        <H1 style={{ color: 'rgba(121, 61, 251, 1.00)'} as any}>+</H1>
        <Place logo={netsmart} focus={'Software Engineer'} time={'2016-2018'} show={visible as boolean} />
        <H1 style={{ color: 'rgba(44, 79, 120, 1.00)' } as any}>+</H1>
        <Place logo={rutgers} focus={'B.A. Computer Science'} time={'2016'} show={visible as boolean} />
        <H1 style={{ color: 'rgba(225, 26, 55, 1.00)' } as any}>+</H1>
        <Place logo={erre} focus={'Head of IT and Marketing'} time={'2011-2016'} show={visible as boolean} />
        <H1 style={{ color: 'rgba(60, 132, 86, 1.00)' } as any} >=</H1>
        <Years show={visible as boolean}/>
      </Flex>
    </Section>
  )
};
export default Work;
