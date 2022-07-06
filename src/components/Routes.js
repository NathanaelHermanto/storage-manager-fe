import React from 'react';
import { Routes as RouterLink, Route } from "react-router-dom";
import Login from './Login';

const Routes = () => {
  return (
    <>
        <RouterLink>
            <Route exact path='/' element={<Login/>}/>
        </RouterLink>
    </>
  )
}

export default Routes;