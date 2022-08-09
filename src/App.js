import logo from './logo.svg';

// import components
import Home from './components/routes/home';
import Navigation from './components/routes/navigation';
import Shop from './components/routes/shop';
import Authentication from './components/routes/authentication/authentication';

// import react-router 
import {Route, Routes} from 'react-router-dom'

function App() {
  return(

    <Routes>
      <Route path='/' element={<Navigation/>}>
        <Route index element={<Home/>}/>
        <Route path='shop' element={<Shop/>}/>
        <Route path='auth' element={<Authentication/>}/>
      </Route>
      
      
    </Routes>
    
  )
}

export default App;
