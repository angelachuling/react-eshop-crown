import {createSelector} from 'reselect';

//selector
const selectShop = state => state.shop;

// First argument, selectors. Second argument is a function called with the selectors as arguments.
export const selectCollections = createSelector(
    [selectShop],
    shop => shop.collections
);

export const selectCollectionsForPreview = createSelector(
    [selectCollections],
    collections =>
      collections ? Object.keys(collections).map(key => collections[key]) : []
);

export const selectCollection = collectionUrlParam =>
  createSelector(
    [selectCollections],
    collections => (collections ? collections[collectionUrlParam] : null)
);