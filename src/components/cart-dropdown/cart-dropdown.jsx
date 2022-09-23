import { useNavigate } from 'react-router-dom';
import Button from '../button/button'
import CartItem from '../cart-item/cart-item';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart-context';
import {CartDropdownContainer, EmptyMessage, CartItems} from'./cart-dropdown.styles.jsx';


const CartDropdown = () => {

    const {cartItems} = useContext(CartContext);
    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        navigate('/checkout');
    }

    return(
        <CartDropdownContainer>
            <CartItems>
                {/* leave message if there's no cart items */}
                {cartItems.length ? (cartItems.map((item) => (
                    <CartItem key={item.id} cartItem={item}/>
                ))) : (
                    <EmptyMessage>Your cart is empty</EmptyMessage>
                )}
            </CartItems>
            
            <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>


        </CartDropdownContainer>
    )
}

export default CartDropdown;