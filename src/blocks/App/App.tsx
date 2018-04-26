import { Bem, Block, withMods } from 'bem-react-core';
import * as React from 'react';
import { Fragment } from 'react';

import mod1, { IExampleMod1Props } from '../Example/_mod1/Example_mod1';
import mod2, { IExampleMod2Props } from '../Example/_mod2/Example_mod2';
import Example from '../Example/Example';

import './App.css';
import Header from './Header/App-Header';

export interface IAppProps {
  path: string;
}

export interface IAppState {
  title: string;
}

const ExampleWithMods = withMods<IExampleMod1Props, IExampleMod2Props>(Example, mod1, mod2);

export default class App extends Block<IAppProps, IAppState> {
  protected block = 'App';

  constructor(props: IAppProps) {
    super(props);

    this.state = {
      title: 'not loaded'
    };
  }

  public componentDidMount() {
    this.setState({ title: 'Welcome to BEM in the TypeScript world' });
  }

  protected content() {
    return (
      <Fragment>
        <Header title={this.state.title}/>
        <ExampleWithMods mod1 />
        <ExampleWithMods mod2 />
        <Bem elem="Intro">
          To get started, edit <code>{this.props.path}</code> and save to reload.
        </Bem>
      </Fragment>
    );
  }
}
