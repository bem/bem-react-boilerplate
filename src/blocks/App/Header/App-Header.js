import React, { Fragment } from 'react';
import { decl, Bem } from 'bem-react-core';

import 'e:Logo';
import logoSvg from '../Logo/App-Logo.svg';

export default decl({
  block: 'App',
  elem: 'Header',
  tag: 'header',
  content() {
    return (
      <Fragment>
        <Bem elem="Logo" tag="img" src={logoSvg} alt="logo"/>
        <Bem elem="Title" tag="h1">Welcome to React</Bem>
      </Fragment>
    );
  }
});
