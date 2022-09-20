import './category.scss';
import { useParams } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { CategoriesContext } from '../../../contexts/categories-context';
import ProductsCard from '../../products-card/products-card';

const Category = () => {

    const {category} = useParams();
    const {categoriesMap} = useContext(CategoriesContext);
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category])
    }, [category, categoriesMap])

    return(
        <div className='category-container'>
            {products && products.map((product) => <ProductsCard key={product.id} product={product} />)}
        </div>
    )
}

export default Category;