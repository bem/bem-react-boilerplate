import { Block } from 'bem-react-core';

import './MyBlock.css';

export interface IMyBlockProps {
  blah?: string;
}

export class MyBlock<P extends IMyBlockProps = IMyBlockProps> extends Block<P> {
  public block = 'MyBlock';

  public tag() {
    return 'span';
  }

  public attrs() {
    return {
      blah: 'ololo'
    };
  }
}
