import { Block } from 'bem-react-core';

import './MyBlock.css';

export class MyBlock<P = {}> extends Block<P> {
  public block = 'MyBlock';

  public tag() {
    return 'span';
  }
}
