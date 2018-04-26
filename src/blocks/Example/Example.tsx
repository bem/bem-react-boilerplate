import { Block } from 'bem-react-core';

export default class Example<P> extends Block<P, {}> {
  protected block = 'Example';

  protected content() {
    return 'content';
  }
}
