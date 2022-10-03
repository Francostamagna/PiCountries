import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Landing from './Components/Landing';
import Homepage from './Components/Homepage';
import Details from './Components/Details';
import Form from './Components/Form';

function App() {
  return (
    <BrowserRouter>
      <React.Fragment>
      <Route path={'/countries/activities'} component = {Form}/>
      <Route path={'/countries/details/:id'} component = {Details}/>
      <Route exact path={'/countries'} component = {Homepage}/>
      <Route exact path = {'/'} component = {Landing}/>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
