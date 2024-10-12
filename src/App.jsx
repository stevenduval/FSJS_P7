import { useState } from 'react';

import './index.css'
import apiKey from './config';
import SearchForm from './components/SearchForm';
import Nav from './components/Nav';
import PhotoList from './components/PhotoList';

const App = () => {
 
  return (
    <div class="container">
      <SearchForm />
      <Nav />
      <PhotoList />
    </div>
  )
}

export default App;