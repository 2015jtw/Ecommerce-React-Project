import logo from './logo.svg';

// import components
import Home from './components/routes/home';
import Navigation from './components/routes/navigation';
import Shop from './components/routes/shop/shop';
import Authentication from './components/routes/authentication/authentication';
import Checkout from './components/routes/checkout/checkout';

// import react-router 
import {Route, Routes} from 'react-router-dom'

// import context dependencies for useEffect
import { onAuthStateChangedListener, createUserDocFromAuth } from "./utils/firebase/firebase.utils";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {setCurrentUser} from './store/user/user-action';


const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
        if(user){
            createUserDocFromAuth(user);
        }
        dispatch(setCurrentUser(user));
    });

    return unsubscribe;
  }, [dispatch]);

  return(

    <Routes>
      <Route path='/' element={<Navigation/>}>
        <Route index element={<Home/>}/>
        <Route path='shop/*' element={<Shop/>}/>
        <Route path='auth' element={<Authentication/>}/>
        <Route path='checkout' element={<Checkout/>}/>
      </Route>
      {/* {/* this gd */}
      
    </Routes>
    
  )
}

export default App;
