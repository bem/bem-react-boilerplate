function capitalize(str) {
  return str[0].toUpperCase() + str.substr(1, str.length);
}

module.exports = function ({ block, elem, mod={} }) {
  const { name: modName, val: modVal } = mod;
  if (!modName) return `import { Block } from 'bem-react-core';
import * as React from 'react';
import { Fragment } from 'react';

import './${block}.css';

export default class ${block} extends Block {
  protected block = '${block}';

  protected content() {
    return (
      <Fragment>
      </Fragment>
    );
  }
};
`;

  return `import ${block} from '../Example';

export interface I${block}${capitalize(modName)}Props {
  ${modName}?: ${typeof modVal};
}

export default () => class ${block}${capitalize(modName)} extends ${block}<I${block}${capitalize(modName)}Props> {
  public static mod = { ${modName}: ${modVal} };
};
`;
};
