import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { v4 as uuidv4 } from 'uuid';

const guid = uuidv4()

document.cookie=guid;

ReactDOM.render(
<App id={guid}/>,
document.getElementById('root')
);