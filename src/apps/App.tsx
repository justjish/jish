import React from 'react';
import Scroll from 'containers/Scroll';
import Header from 'containers/Header';
import Skills from 'containers/Skills';
import _ from 'lodash';



export const App: React.FC = () => {
  const clientH = document.documentElement.clientHeight;
  return (
    <>
      <Scroll clientH={clientH} />
      <Header />
      <Skills />
    </>
  );
};
export default App;
