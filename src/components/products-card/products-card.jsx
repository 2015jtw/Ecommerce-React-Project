import './products-card.scss';
import Button, {buttonTypeClass} from "../button/button";
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../../store/cart/cart-action';
import { selectCartItems } from '../../store/cart/cart-selector';

const ProductsCard = ({product}) => {

    const {name, imageUrl, price} = product;
    const cartItems = useSelector(selectCartItems);
    const dispatch = useDispatch();



    const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

    return(
        <div className="product-card-container">
            <img src={imageUrl} alt={`${name}`} />
            <div className="footer">
                <span className="name">{name}</span>
                <span className="price">{price}</span>
            </div>
            <Button buttonType='base' onClick={addProductToCart}>Add to Cart</Button>

        </div>
    )

    
}

export default ProductsCard;