import { createSelector} from 'reselect';

//input selector. select which (user) part of the state
const selectCart = state => state.cart;
//const selectUser = state => state.user;

//memoized selectors checks if selectCart has changes.
export const selectCartItems = createSelector(
    //[selectCart, selectUser]
    [selectCart],
    //(cart, user)
    (cart) => cart.cartItems
);

export const selectCartHidden = createSelector (
    [selectCart],
    cart => cart.hidden
)

//memoized selectors checks if selectCartItems has changes.
//A memoized selector (selectCartItems) can itself be an input-selector to another memoized selector.
export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce((accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity, 0)
)

export const selectCartTotal = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce((accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity * cartItem.price, 0)
)

/*
createSelector takes an array of input-selectors and a transform function as its arguments. If the Redux state tree is mutated in a way that causes the value of an input-selector to change, the selector will call its transform function with the values of the input-selectors as arguments and return the result. If the values of the input-selectors are the same as the previous call to the selector, it will return the previously computed value instead of calling the transform function.
*/