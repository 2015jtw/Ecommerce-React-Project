// import SHOP_DATA from '../../../shop-data.json'

import { useContext, Fragment } from 'react';
import { CategoriesContext } from '../../../contexts/categories-context';
import CategoryPreview from '../../category-preview/category-preview';

const CategoriesPreview = () => {
    const {categoriesMap} = useContext(CategoriesContext);

    return(

        <Fragment>
        
            {
            Object.keys(categoriesMap).map(title => {
                const products = categoriesMap[title];

                return <CategoryPreview key={title} title={title} products={products} />
            })}
        
        </Fragment>
        
    )
}

export default CategoriesPreview;