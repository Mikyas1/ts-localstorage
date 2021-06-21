import React from 'react';
import {useLocalStorage} from "./useLocalStorage";

const App: React.FC = () => {

    const [state, setState, removeState] = useLocalStorage("testls", 100);

    return (
        <div className="App">
            <p>Value: {state}</p>
            <button onClick={() => setState(Math.floor(Math.random() * 10000))}>Change State!</button>
            <button onClick={removeState}>Reset</button>
        </div>
    );
}

export default App;
