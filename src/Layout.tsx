import React from "react";
import Header from "./Header";

export const Layout = (props: any) => {
    return (
        <div className="app">
            <div className="App-header">
                <Header/>
            </div>
            <div className="App-container">
                { props.children }
            </div>
        </div>
    );
};