import * as React from 'react';
import { App as Common } from './App';
import { MyBlock } from '../MyBlock/MyBlock@desktop';

export class App extends Common {
  public content() {
    const {MyBlock} = this.dependencies();

    return (<MyBlock/>);
  }

  protected dependencies() {
    return { MyBlock };
  }
}
