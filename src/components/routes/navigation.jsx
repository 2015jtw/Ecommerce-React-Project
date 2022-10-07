import React from "react";

// importing components
import { Fragment } from "react";
import CartIcon from "../cart-icon/cart-icon";
import CartDropdown from "../cart-dropdown/cart-dropdown";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";

// importing nav 
import {NavigationContainer, LogoContainer, NavLinksContainer, NavLinks} from './navigation.styles.jsx'
import {Outlet, Link} from 'react-router-dom';


// context and redux related imports
import { signOutUser } from "../../utils/firebase/firebase.utils";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user-selector";
import { selectIsCartOpen } from "../../store/cart/cart-selector";



const Navigation = () => {

    const currentUser = useSelector(selectCurrentUser);
    const isCartOpen = useSelector(selectIsCartOpen);

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