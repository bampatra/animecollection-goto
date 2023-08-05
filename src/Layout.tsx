import React from "react";

export const Layout = (props: any) => {
    return (
        <div className="app">
            <div className="App-header">

            </div>
            <div className="App-container">
                { props.children }
            </div>
        </div>
    );
};