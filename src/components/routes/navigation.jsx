import React from "react";
import {Outlet, Link} from 'react-router-dom';
import { Fragment, useContext } from "react";

import CartIcon from "../cart-icon/cart-icon";
import CartDropdown from "../cart-dropdown/cart-dropdown";

import { UserContext } from "../../contexts/user-context";
import { CartContext } from "../../contexts/cart-context";
import { signOutUser } from "../../utils/firebase/firebase.utils";

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import './navigation.styles.scss'

const Navigation = () => {

    const {currentUser} = useContext(UserContext);
    const {isCartOpen} = useContext(CartContext);

    const signOutHandler = async () => {
        const res = await signOutUser();
    }

    return(
        <Fragment>
            <div className="navigation">
                <Link className="logo-container" to='/'>
                    <CrwnLogo className="logo" />
                </Link>
                
                <div className="nav-links-container">

                    <Link className="nav-link" to='/shop'>
                        Shop
                    </Link>
                    
                    {currentUser ? (<span className="nav-link" onClick={signOutHandler}>Sign Out</span>) : (<Link className="nav-link" to='/auth'>
                        Sign-In
                    </Link>)}
                    
                    <CartIcon/>

                </div>

                {/* conditionally render cart drop down is cart is open */}
                {isCartOpen && <CartDropdown/> }

            </div>
            <Outlet/>
        </Fragment>
    )
}


export default Navigation;