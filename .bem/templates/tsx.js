function capitalize(str) {
  return str ? str[0].toUpperCase() + str.substr(1, str.length) : '';
}

const blockTmpl = (block) =>
`import * as React from 'react';
import { Fragment } from 'react';
import { Block } from 'bem-react-core';

import './${block}.css';

export interface I${block}Props {

}

export class ${block} extends Block<I${block}Props> {
  block = '${block}';

  content() {
    return (
      <Fragment>
      </Fragment>
    );
  }
}
`;

const elemTmpl = (block, elem) =>
`import * as React from 'react';
import { Fragment } from 'react';
import { Elem } from 'bem-react-core';

export class ${elem} extends Elem {
  block = '${block}';
  elem = '${elem}';

  content() {
    return (
      <Fragment>
      </Fragment>
    );
  }
}
`;

const blockModTmpl = (block, mod) => {
  const { name: modName, val: modVal } = mod;

  return `import { ${block}, I${block}Props } from '../${block}';

export interface I${block}${capitalize(modName)}Props extends I${block}Props {
  ${modName}?: ${typeof modVal};
}

export class ${block}${capitalize(modName)}${capitalize(modVal)} extends ${block} {
  static mod = ({ ${modName} }: I${block}${capitalize(modName)}Props) => ${modName} === '${modVal}';
}
`;
}

module.exports = ({ block, elem, mod={} }) => {
  const { name: modName } = mod;

  if (block && elem) {
    return elemTmpl(block, elem);
  } else if (block && modName) {
    return blockModTmpl(block, mod);
  } else if (block) {
    return blockTmpl(block);
  }
}
