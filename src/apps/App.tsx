import React from "react";
import Scroll from "containers/Scroll";
import Strips from "containers/Strips";
import Menu from "containers/Menu";
import Hello from 'containers/Hello'; 
import Story from 'containers/Story';
import Skills from "containers/Skills";
import Chat from "containers/Chat";

export const App: React.FC = () => {
  return (
    <>
      <Scroll />
      <Strips />
      <Hello />
      <Story />
      <Skills />
      <Chat />
      <Menu />
    </>
  );
};
export default App;
