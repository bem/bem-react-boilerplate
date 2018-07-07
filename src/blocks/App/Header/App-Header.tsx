import { Bem, Elem } from 'bem-react-core';
import * as React from 'react';
import { Fragment } from 'react';

import '../Logo/App-Logo.css';
import './App-Header.css';

const logoSvg = require('../Logo/App-Logo.svg');

export interface IElemProps {
  title: string;
}

export default class AppHeader extends Elem<IElemProps, {/* state */}> {
  public block = 'App';
  public elem = 'Header';

  public tag() {
    return 'header';
  }

  public content() {
    return (
      <Fragment>
        <Bem block="App" elem="Logo" tag="img" src={logoSvg} alt="logo"/>
        <Bem block="App" elem="Title" tag="h1">{this.props.title}</Bem>
      </Fragment>
    );
  }

}
