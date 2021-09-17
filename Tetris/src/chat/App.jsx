import React from "react";
import ReactDOM from "react-dom";
import io from "socket.io-client";

ReactDOM.render(
    <React.StrictMode>
        <Chat />
    </React.StrictMode>,
    document.getElementById('root')
);
