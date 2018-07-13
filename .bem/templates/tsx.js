function capitalize(str) {
  return str[0].toUpperCase() + str.substr(1, str.length);
}

module.exports = function ({ block, elem, mod={} }) {
  const { name: modName, val: modVal } = mod;
  const entityClass = elem ? 'Elem' : 'Block';

  if (!modName) return `import { ${entityClass} } from 'bem-react-core';
import * as React from 'react';
import { Fragment } from 'react';
${elem ? '' : `\nimport './${block}.css';\n`}
export default class ${block}${elem ? `${elem}` : ''} extends ${entityClass} {
  protected block = '${block}';
${elem ? `  protected elem = '${elem}';\n` : ''}
  protected content() {
    return (
      <Fragment>
      </Fragment>
    );
  }
}
`;

  return `import ${block} from '../${block}';

export interface I${block}${capitalize(modName)}Props {
  ${modName}?: ${typeof modVal};
}

export default class ${block}${capitalize(modName)} extends ${block}<I${block}${capitalize(modName)}Props> {
  public static mod = ({ ${modName} }: I${block}${capitalize(modName)}Props) => ${modName} === ${modVal};
}
`;
};
