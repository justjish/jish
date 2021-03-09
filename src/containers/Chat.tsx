import React, { useState } from 'react';
import { Section } from 'common/Section';
import { Flex } from 'common/Flex';
import { Item } from 'common/Item';
import { Row } from 'common/Row';
import useLocations from 'hooks/useLocations';
import { H3, H4 } from 'common/Typography';
import { useAuth } from 'hooks/useFirebase';
import { animated as a, useSpring, useTransition } from 'react-spring';
import styled from 'styled-components';
import { BsTriangleFill } from 'react-icons/bs';

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
  return <Item>{text}</Item>;
} 

const List: React.FC<{ show?: boolean }> = ({ show = false }) => {
  const [items,setItems] = useState(['leave feedback', 'schedule a call', 'just say hello']);
  const [{ x, y, opacity }, set] = useSpring({opacity: show? 1:0, x:show?0:0, y:show? 140: 120},[show]);
  return (
    <Item style={{ position: 'absolute', x, y, opacity } as any} >
      <Flex>
        {items.map((v,i)=><ListItem text={v}/>)}
      </Flex>
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
      <Flex>
        <H3>Continued Conversation!</H3>
      </Flex>
      <Flex>
        <H4>Hi Sujish, my name is</H4>
        <Item>
          <Input
            onInput={(input) => {
              console.log(input.currentTarget.value);
            }}
            placeholder="Enter your name"
          />
        </Item>
        <h3>I would like to </h3>
        <Item>
          <Flex>
            <Input placeholder="" />
            <a.div
              style={{ rotate }}
              onClick={() => setToggle(!toggle)}
            >
              <BsTriangleFill />
            </a.div>
            <List show={toggle}/>
          </Flex>
        </Item>
      </Flex>
    </Section>
  );
};

export default Chat;
