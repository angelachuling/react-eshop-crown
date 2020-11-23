import {createSelector} from 'reselect';

// const COLLECTION_ID_MAP = {
//     hats: 1,
//     sneakers: 2,
//     jackets: 3,
//     women: 4,
//     mens: 5
// }

//selector
const selectShop = state => state.shop;

// First argument, selectors. Second argument is a function called with the selectors as arguments.
export const selectCollections = createSelector(
    [selectShop],
    shop => shop.collections
)

export const selectCollectionsForPreview = createSelector(
    [selectCollections],
    //turn object into array
    collections => Object.keys(collections).map(key => collections[key])
)

export const selectCollection = (collectionUrlParam) => createSelector(
    [selectCollections],
    collections => collections[collectionUrlParam]
);