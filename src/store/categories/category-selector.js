import { createSelector } from 'reselect';


const selectCategoryReducer = (state) => state.categories;

// this createSelector func takes 2 args: the input selector array, and the output selector function
export const selectCategories = createSelector(
    // input selector is what do i want as part of the parameters to produce what the selector should return back
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.categories

)
 

export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories) => categories.reduce((accumulator, category) => {
        const {title, items} = category;
        accumulator[title.toLowerCase()] = items;
        return accumulator;
    }, {})
)
