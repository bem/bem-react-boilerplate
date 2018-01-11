const nameRegEx = /^[a-zA-Z_][a-zA-Z\d_]*$/;

function toObjectKey(str) {
    return nameRegEx.test(str) ? str : `'${str}'`;
}

function toObjectValue(x) {
    return typeof x === 'boolean' ? x : `'${x}'`;
}

module.exports = function ({ block, elem, mod={} }) {
    const { name: modName, val: modVal } = mod;
    return `import { ${modName? 'declMod' : 'decl'} } from 'bem-react-core';

export default ${modName?
            `declMod({ ${toObjectKey(modName)}: ${toObjectValue(modVal || true)} }, {` :
            'decl({'}
    block: '${block}'${elem? `,
    elem: '${elem}'` : ''}
});
`;
};
