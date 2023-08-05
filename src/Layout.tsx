import React from "react";
import Header from "./Header";
import { MasterCSS } from "./MasterStyling";

export const Layout = (props: any) => {

    const { AppContainer } = MasterCSS

    return (
        <div>
            <Header/>
            <AppContainer>
                { props.children }
            </AppContainer>
        </div>
    );
};