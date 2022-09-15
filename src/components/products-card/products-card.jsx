import './products-card.scss';
import Button from '../button/button'
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart-context';

const ProductsCard = ({product}) => {

    const {name, imageUrl, price} = product;
    const {addItemToCart} = useContext(CartContext);

    const addProductToCart = () => {
        addItemToCart(product);
    }

    return(
        <div className="product-card-container">
            <img src={imageUrl} alt={`${name}`} />
            <div className="footer">
                <span className="name">{name}</span>
                <span className="price">{price}</span>
            </div>
            <Button buttonType='inverted' onClick={() => addItemToCart(product)}>Add to Cart</Button>

        </div>
    )

    
}

export default ProductsCard;