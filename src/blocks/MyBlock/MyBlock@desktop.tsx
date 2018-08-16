import * as React from 'react';
import { MyBlock as Common } from './MyBlock';

import './MyBlock@desktop.css';

// export interface IMyBlockProps {
//   blah?: string;
// }

export class MyBlock extends Common {
  public content() {
    return <span>desktop</span>;
  }
}
