import '../styles/app.scss';

import { tree } from './store';
import React = require('react');
import ReactDOM = require('react-dom');
import { Menu } from './menu';

export class App extends React.Component {
    public render() {
        return (
            <div>
                <Menu />
            </div>
        );
    }
}
ReactDOM.render(
    <App/>,
     document.getElementById('app')
);
