import React from "react";
import {Outlet, Link} from 'react-router-dom';
import { Fragment, useContext } from "react";

import CartIcon from "../cart-icon/cart-icon";
import CartDropdown from "../cart-dropdown/cart-dropdown";

import { UserContext } from "../../contexts/user-context";
import { CartContext } from "../../contexts/cart-context";
import { signOutUser } from "../../utils/firebase/firebase.utils";

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import {NavigationContainer, LogoContainer, NavLinksContainer, NavLinks} from './navigation.styles.jsx'

const Navigation = () => {

    const {currentUser} = useContext(UserContext);
    const {isCartOpen} = useContext(CartContext);

    const signOutHandler = async () => {
        const res = await signOutUser();
    }

    return(
        <Fragment>
            <NavigationContainer>

                <LogoContainer to='/'>
                    <CrwnLogo className="logo" />
                </LogoContainer>
                
                <NavLinksContainer>

                    <NavLinks to='/shop'>
                        Shop
                    </NavLinks>
                    
                    {currentUser ? (<NavLinks as='span' onClick={signOutHandler}>Sign Out</NavLinks>) : (<NavLinks to='/auth'>
                        Sign-In
                    </NavLinks>)}
                    
                    <CartIcon/>

                </NavLinksContainer>

                {/* conditionally render cart drop down is cart is open */}
                {isCartOpen && <CartDropdown/> }

            </NavigationContainer>

            
            <Outlet/>
        </Fragment>
    )
}


export default Navigation;