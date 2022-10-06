// import SHOP_DATA from '../../../shop-data.json'

// import { useContext } from 'react';
// import { CategoriesContext } from '../../../contexts/categories-context';
// import CategoryPreview from '../../category-preview/category-preview';

import { Route, Routes } from 'react-router-dom';
import CategoriesPreview from '../categories-preview/categories-preview';
import Category from '../category/category';
import './shop.scss';

// import redux packages
import { useEffect } from 'react';
import { getCategoriesAndDocuments } from '../../../utils/firebase/firebase.utils';
import { setCategories } from '../../../store/categories/category-action';
import { useDispatch } from 'react-redux';

const Shop = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoriesArray = await getCategoriesAndDocuments('categories');
            dispatch(setCategories(categoriesArray));
        };

        getCategoriesMap();
    }, [])

    return(
            <Routes>
                <Route index element={<CategoriesPreview/>} /> 
                <Route path=':category' element={<Category/>} /> 
            </Routes>
    )
}

export default Shop;