import { Block } from 'bem-react-core';
// import * as React from 'react';
// import { Fragment } from 'react';

// import mod1 from '../Example/_mod1/Example_mod1';
// import mod2 from '../Example/_mod2/Example_mod2';
// import Example from '../Example/Example';

import './App.css';
// import Header from './Header/App-Header';

// import {MyBlock} from '../MyBlock/MyBlock';

export interface IAppProps {
  path: string;
}

export interface IAppState {
  title: string;
}

// export interface IAppCommonDeps {
//   [key: string]: React.ComponentClass;
// }

// const ExampleWithMods = withMods(Example, mod1, mod2);

export abstract class App extends Block<IAppProps, IAppState> {
  public block = 'App';

  constructor(props: IAppProps) {
    super(props);

    this.state = {
      title: 'not loaded'
    };
  }

  public componentDidMount() {
    this.setState({ title: 'Welcome to BEM in the TypeScript world' });
  }

  // protected abstract dependencies(): IAppDeps;

  // public content() {
  //   const {MyBlock} = this.dependencies();

  //   return (<MyBlock/>);
  // }

  // public content() {
  //   // const {MyBlock} = this.dependencies();

  //   return (
  //     <Fragment>
  //       <Header title={this.state.title}/>
  //       <ExampleWithMods mod1 />
  //       <ExampleWithMods mod1 mod2 />
  //       <Bem block="App" elem="Intro">
  //         To get started, edit <code>{this.props.path}</code> and save to reload.
  //         {/* <MyBlock {...this.myBlockProps()}/> */}
  //       </Bem>
  //     </Fragment>
  //   );
  // }

  // protected dependencies() {
  //   return { MyBlock };
  // }

  // protected myBlockProps() {
  //   return {};
  // }
}
