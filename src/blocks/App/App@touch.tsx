import * as React from 'react';
import { App as Common } from './App';
import { MyBlock as B } from '../MyBlock/MyBlock@touch';

export class App extends Common {
  public content() {
    const {MyBlock} = this.dependencies();

    return (<MyBlock/>);
  }

  protected dependencies() {
    return { MyBlock: B };
  }
}
