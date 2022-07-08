import React from 'react';
import { Routes as RouterLink, Route } from "react-router-dom";
import Dashboard from './Dashboard';
import CreateUpdate from './CreateUpdate';

const Routes = () => {

    return (
        <>
            <RouterLink>
                <Route exact path='/' element={<Dashboard/>}/>
                <Route exact path='/create-or-update' element={<CreateUpdate/>}/>
            </RouterLink>
        </>
    )
}

export default Routes;