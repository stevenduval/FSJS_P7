import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom';

import './index.css'
import apiKey from './config';
import SearchForm from './components/SearchForm';
import Nav from './components/Nav';
import PhotoList from './components/PhotoList';
import PageNotFound from './components/PageNotFound';


const App = () => {
  // get current location
  const location = useLocation();
  // set states
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([{}]);

  // fetch data from flicker API
  const fetchData = (query) => {
    setLoading(true);
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        setData(response.data.photos.photo)
        setLoading(false)
      })
      .catch(error => console.log('Error:', error))
  };

  // when location changes check if we need to run fetch for static routes
  useEffect(()=> {
    // if searchTerm doesnt equal current location
    if (searchTerm !== location.pathname.replace('/', '').replace('search/', '')) {
      // set search term state
      setSearchTerm(location.pathname.replace('/', '').replace('search/', ''));
      // fetch data from flicker API
      fetchData(location.pathname.replace('/', '').replace('search/', ''));
    }
  }, [location]);

  return (
    <div className="container">
      <SearchForm fetchData={fetchData}/>
      <Nav />
      <Routes>
        <Route path='/' end>
          <Route index element={<Navigate replace to="cats"/>}/>
        </Route>
        <Route path='/cats' element={(loading) ? <p>Loading...</p> : <PhotoList term='cats' data={data}/>}/>
        <Route path='/dogs' element={(loading) ? <p>Loading...</p> : <PhotoList term='dogs' data={data}/>}/>
        <Route path='/sunsets' element={ (loading) ? <p>Loading...</p> : <PhotoList term='sunsets' data={data}/>}/>
        <Route path='search/:term' element={(loading) ? <p>Loading...</p> : <PhotoList term={searchTerm} data={data}/>}/>
        <Route path='*' element={<PageNotFound />}/>
      </Routes>
    </div>
  )
}

export default App;