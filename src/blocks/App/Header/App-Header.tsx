import { Bem, Elem, Tag } from 'bem-react-core';
import * as React from 'react';
import { Fragment } from 'react';

import '../Logo/App-Logo.css';
import logoSvg from '../Logo/App-Logo.svg';
import './App-Header.css';

export interface IElemProps {
  title: string;
}

export default class AppHeader extends Elem<IElemProps, {/* state */}> {
  protected block = 'App';
  protected elem = 'Header';

  protected tag(): Tag {
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
