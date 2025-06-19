import './App.css';
import NavBar from './components/NavBar';
import News from './components/News';
import LoadingBar from "react-top-loading-bar";

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { useState } from 'react';

const App=()=>{
  //  pagesize less than 9 creating error due to api limitation
  const pageSize = 9;
  const apiKey = process.env.REACT_APP_NEWS_API;
  const [progress, setProgress] = useState(0);
  
    return (
      <div>
        <Router>
          <NavBar />
          <LoadingBar
            color="#f11946"
            progress={progress}
          />
          <Routes>
            <Route path='/' element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country="us" category="general"/>} />
            <Route path='/business' element={<News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={pageSize} country="us" category="business" />} />
            <Route path='/entertainment' element={<News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={pageSize} country="us" category="entertainment" />} />
            <Route path='/health' element={<News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={pageSize} country="us" category="health" />} />
            <Route path='/science' element={<News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={pageSize} country="us" category="science" />} />
            <Route path='/sports' element={<News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={pageSize} country="us" category="sports" />} />
            <Route path='/technology' element={<News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={pageSize} country="us" category="technology" />} />
          </Routes>
        </Router>
      </div>
    );
}

export default App;