import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';

import './index.css'
import apiKey from './config';
import SearchForm from './components/SearchForm';
import Nav from './components/Nav';
import PhotoList from './components/PhotoList';
import PageNotFound from './components/PageNotFound';

const App = () => {
  const navigate = useNavigate();
  // get current location
  const location = useLocation();
  // set states
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([{}]);

  // fetch data from flicker API
  const fetchData = (query) => {
    // set loading state
    setLoading(true);
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        // set data as the data returned from api response
        setData(response.data.photos.photo);
        // set loading state
        setLoading(false);
        // set searchTerm value
        setSearchTerm(query);
      })
      .catch(error => console.log('Error:', error))
  };

  // upon first render and when window location changes this useEffect will execute
  useEffect(()=> {
    // store the searchTerm being pulled from location into a variable
    let currentSearchTerm = location.pathname.replace('/', '').replace('search/', '');
    // if searchTerm not equal to current term and location change is not from search form
    // this prevents this from loading when we use the form in the SearchForm component
    if (searchTerm !== currentSearchTerm && location?.state?.key !== 'searchForm') {
      // fetch data from flicker API
      fetchData(currentSearchTerm);
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