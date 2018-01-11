import React from 'react';
import ReactDOM from 'react-dom';

import registerServiceWorker from './registerServiceWorker';

import 'b:Page';
import App from 'b:App';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
