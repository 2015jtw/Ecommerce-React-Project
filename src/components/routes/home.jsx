import Directory from "../directory/Directory"

import {Outlet} from 'react-router-dom';

function Home() {
  
    return (
        <div>
            <Outlet/>
            <Directory/>
        </div>
      
    )
  }
  
export default Home;