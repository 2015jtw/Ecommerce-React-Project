// import SHOP_DATA from '../../../shop-data.json'

// import { useContext } from 'react';
// import { CategoriesContext } from '../../../contexts/categories-context';
// import CategoryPreview from '../../category-preview/category-preview';

import { Route, Routes } from 'react-router-dom';
import CategoriesPreview from '../categories-preview/categories-preview';
import Category from '../category/category';
import './shop.scss';

const Shop = () => {

    return(
            <Routes>
                <Route index element={<CategoriesPreview/>} /> 
                <Route path=':category' element={<Category/>} /> 
            </Routes>
    )
}

export default Shop;