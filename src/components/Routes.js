import React from 'react';
import { Routes as RouterLink, Route } from "react-router-dom";
import Dashboard from './Dashboard';
import CreateUpdate from './CreateProduct';
import ProductView from './ProductView';

const Routes = () => {

    return (
        <>
            <RouterLink>
                <Route exact path='/' element={<Dashboard/>}/>
                <Route path='/create' element={<CreateUpdate/>}/>
                <Route path='/product/:id' element={<ProductView/>}/>
            </RouterLink>
        </>
    )
}

export default Routes;