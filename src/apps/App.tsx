import React from "react";
import Scroll from "containers/Scroll";
import Menu from "containers/Menu";
import Hello from 'containers/Hello'; 
import Story from 'containers/Story';
import Skills from "containers/Skills";
import Chat from "containers/Chat";
import Focus from 'containers/Focus';

export const App: React.FC = () => {
  return (
    <>
      <Scroll />
      <Focus/>
      <Hello />
      <Story />
      <Skills />
      <Chat />
      <Menu />
    </>
  );
};
export default App;
