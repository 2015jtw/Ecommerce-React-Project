// import SHOP_DATA from '../../../shop-data.json'

import { useContext } from 'react';
import { ProductsContext } from '../../../contexts/products-context';
import ProductsCard from '../../products-card/products-card';
import './shop.scss';

const Shop = () => {
    const {products} = useContext(ProductsContext);

    return(
        <div className='products-container'>
            {products.map((product) => (
                <ProductsCard key={product.id} product={product} />
            ))}
        </div>
    )
}

export default Shop;