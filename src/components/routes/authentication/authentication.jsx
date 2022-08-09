// import React from "react";
// import { auth, signInWithGoogleRedirect, createUserDocFromAuth } from "../../../utils/firebase/firebase.utils";
// import { useEffect } from "react";
// import { getRedirectResult } from "firebase/auth";
import SignUp from "../../sign-up/sign-up";
import SignIn from "../../sign-in/Sign-in";
import './authentication.scss'

const Authentication = () => {

    // useEffect(() => {
    //     async function _getRedirectResult() {
    //         const response = await getRedirectResult(auth);
    //         console.log(response);
    //     }
    //     _getRedirectResult();
    // }, []);
    
    return(
        <div className="authentication-container">

            <SignIn/>
            <SignUp/>
            
        </div>
    )
}

export default Authentication;