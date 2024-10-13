
import { Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom';

import './index.css'
import apiKey from './config';
import SearchForm from './components/SearchForm';
import Nav from './components/Nav';
import PhotoList from './components/PhotoList';
import { useEffect, useState } from 'react';
import axios from 'axios';


const App = () => {
  // get current location
  const location = useLocation();
  // set states
  const [term, setTerm] = useState(location.pathname.replace('/', ''));
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  // fetch data from flicker API
  const fetchData = (query) => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}s&per_page=24&format=json&nojsoncallback=1`)
      .then(response => setData(response.data.photos.photo))
      .catch(error => console.log('Error:', error));
  };
  // 
  useEffect(()=> {
    // lets us know if we are still actively fetching the current term
    let activeFetch = true;
    // if location doesn't include search/ setTerm value equal to it
    if (!location.pathname.includes('search/') && term !== location.pathname.replace('/', '') ) {
      setTerm(location.pathname.replace('/', ''))
    }
    // if we are still using the current fetch
    // need to fix as i am still running into race condition issues cause the data setting happens in the fetch
    if (activeFetch) { 
      console.log(term);
      fetchData(term);
      console.log('ww')
      setLoading(false); 
    }
    // clean up function to stop fetch if it is called again
    return () => { activeFetch = false; console.log('stopping old') }
  }, [location, term]);

  return (
    <div className="container">
      <SearchForm />
      <Nav />
      <Routes>
        <Route path='/' end>
          <Route index element={<Navigate replace to="cats"/>}/>
        </Route>
        <Route path=':term' element={<PhotoList term={term} data={data}/>}/>
        <Route path='search/:term' element={<PhotoList term={term} data={data}/>}/>
      </Routes>
    </div>
  )
}

export default App;