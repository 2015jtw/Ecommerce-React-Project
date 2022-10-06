// import SHOP_DATA from '../../../shop-data.json'
import { Fragment } from 'react';
import CategoryPreview from '../../category-preview/category-preview';

// import redux shop files
import { selectCategoriesMap } from '../../../store/categories/category-selector';
import { useSelector } from 'react-redux';


const CategoriesPreview = () => {

    const categoriesMap = useSelector(selectCategoriesMap);

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