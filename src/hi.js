import React from 'react';
import ReactDOM from 'react-dom/client';

export default function sayHi() {
    const root = ReactDOM.createRoot(document.getElementById("app"));

    const link = React.createElement('a', { href: '#' }, 'Hola, mundo react!');

    const spanWrapper = React.createElement('span', null, link);

    const heading = React.createElement('h1', null, spanWrapper);
    
    root.render(
        heading 
    );
}
