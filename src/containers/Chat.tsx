import React, { useState } from 'react';
import { Section } from 'common/Section';
import { Row } from 'common/Row';
import { Item } from 'common/Item';
import useLocations from 'hooks/useLocations';
import { H3, H4 } from 'common/Typography';
import { useAuth } from 'hooks/useFirebase';
import { animated as a, useSpring, useTransition } from 'react-spring';
import styled from 'styled-components';
import { BsTriangleFill } from 'react-icons/bs';
import { useHover } from 'hooks/useHover';
import { noop } from 'lodash/fp';

// Lets make this a live chat that will talk to a back end.

const Input = styled(a.input)`
  background: rgba(0, 0, 0, 0);
  border: none;
  outline: none;
`;
const Send = styled(a.button)`
  box-sizing: border-box;
  width: 50px;
`;

const ListItem: React.FC<{ text: string }> = ({ text }) => {
  const { bind, scale } = useHover({ onClick: noop });
  return <Item {...bind()} style={{scale}}>{text}</Item>;
}

const List: React.FC<{ show?: boolean }> = ({ show = false }) => {
  const [items, setItems] = useState(['leave feedback', 'schedule a call', 'just say hello']);
  const [{ x, y, opacity }, set] = useSpring({ opacity: show ? 1 : 0, x: show ? 0 : 0, y: show ? 140 : 120 }, [show]);
  
  return (
    <Item style={{ position: 'absolute', x, y, opacity } as any} >
      <Row>
        {items.map((v,i)=><ListItem text={v}/>)}
      </Row>
    </Item>
  );
};

const Chat: React.FC = () => {
  const registerPosition = useLocations(React.useCallback((state) => state.setChat, []));
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => registerPosition(ref.current?.offsetTop ?? 0), []);

  const [toggle, setToggle] = useState(false);
  const [{ rotate }, set] = useSpring({ rotate: toggle ? 0 : 180 }, [toggle]);

  return (
    <Section ref={ref} style={{ background: 'rgba(135, 183, 255, 1.00)' }}>
      <Row>
        <H3>Continued Conversation!</H3>
      </Row>
      <Row>
        <H4>Hi Sujish, my name is</H4>
        <Item>
          <Input
            onInput={(input) => {
              console.log(input.currentTarget.value);
            }}
            placeholder="Enter your name"
          />
        </Item>
        <H4>I would like to </H4>
        <Item>
          <Row>
            <Input placeholder=""></Input>
            <a.div
              style={{ rotate }}
              onClick={() => setToggle(!toggle)}
            >
              <BsTriangleFill />
            </a.div>
            <List show={toggle}/>
          </Row>
        </Item>
      </Row>
    </Section>
  );
};

export default Chat;
