import React from "react";
import Scroll from "containers/Scroll";
import Strips from "containers/Strips";
import Menu from "containers/Menu";
import Meet from 'containers/Meet';
import XP from 'containers/XP';
import Labs from "containers/Labs";
import Chat from "containers/Chat";

export const App: React.FC = () => {
  return (
    <>
      <Scroll />
      <Strips />
      <Meet />
      <XP />
      <Labs />
      <Chat/>
      <Menu />
    </>
  );
};
export default App;
