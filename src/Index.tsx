import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from 'src/components/App';

//import { beachParty} from 'BeachPartyShape/shapeEng';


import './stylesheet.css';

const rootElement = document.getElementById('root');


const createUi = (AppComponent: typeof App) => {
    if (__DEV__) {

        return (
            <div>
                <AppComponent />

            </div>
        );
    }

    return <AppComponent />;
}

ReactDOM.render(createUi(App), rootElement);

// Hot Module Replacement APIs
if (module.hot) {
    module.hot.accept('./components/App', () => {
        const NextApp = require<{ App: typeof App }>('./components/App').App;
        ReactDOM.render(createUi(NextApp), rootElement);
    });
}
