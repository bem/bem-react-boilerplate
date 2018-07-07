import { Block } from 'bem-react-core';

export default class Example<P> extends Block<P, {}> {
  public block = 'Example';

  public content() {
    return 'content';
  }
}
