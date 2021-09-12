import React from "react";
import ReactDOM from "react-dom";

class Chat extends React.Component {
    render() {
        return (
            <div id="chat">
                <h1>hello....ll.</h1>
            </div>
        );
    }    
}

ReactDOM.render(
    <React.StrictMode>
        <Chat />
    </React.StrictMode>,
    document.getElementById('root')
);
