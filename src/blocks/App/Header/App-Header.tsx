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
  protected block = 'App';
  protected elem = 'Header';

  protected tag() {
    return 'header';
  }

  protected content() {
    return (
      <Fragment>
        <Bem elem="Logo" tag="img" src={logoSvg} alt="logo"/>
        <Bem elem="Title" tag="h1">{this.props.title}</Bem>
      </Fragment>
    );
  }

}
