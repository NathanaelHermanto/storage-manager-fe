import React from 'react';
import { Routes as RouterLink, Route } from "react-router-dom";
import Dashboard from './Dashboard';

const Routes = () => {

    return (
        <>
            <RouterLink>
                <Route exact path='/' element={<Dashboard/>}/>
            </RouterLink>
        </>
    )
}

export default Routes;