import React, { useState, useEffect, useRef, useCallback } from 'react';
import { animated, useSpring } from 'react-spring';
import ReactDOM from 'react-dom';
import Navbar from 'components/Navbar';
import Section from 'components/Section';
import { Titles } from 'components/Titles';
import { useWheel } from 'react-use-gesture';

const App: React.FC = () => {
  const ref = useRef<HTMLDivElement>({} as HTMLDivElement);
  const [position, set] = useSpring(() => ({ translateY: 0, rotate: 0 }));
  const [wheel, setWheel] = useSpring(() => ({
    color: '#123456',
    fontSize: '4vw',
    x: 0,
    y: 0,
  }));
  const handleScroll = useCallback(() => {
    const posY = ref.current.getBoundingClientRect().top;
    const offset = window.pageYOffset - posY;
    set({ translateY: offset / 2 });
  }, []);
  const bind = useWheel(wheelEvent => {
    console.log(ref.current.getBoundingClientRect().top);
    setWheel({y:wheelEvent.offset[1]});
  });

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={ref} {...bind()} >
        <div
          style={{
            background: '#03cccc',
            position: 'relative',
            width: '100%',
            height: '400px',
          }}
        >
          <Navbar {...position} />
          <Titles/>
        </div>
        <div
          style={{
            background: '#123456',
            position: 'relative',
            width: '100%',
            height: '400px',
          }}
        >
          <div
            style={{
              background: '#eee',
              position: 'relative',
              width: '100%',
              height: '400px',
            }}
          ></div>
        </div>
      </div>
  );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
