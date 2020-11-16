import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {toggleCartHidden} from '../../redux/cart/cart.actions';
import {selectCartItemsCount} from '../../redux/cart/cart.selectors';

import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg';

import './cart-icon.styles.scss';

const CartIcon = ({toggleCartHidden, itemCount}) => (
    <div className='cart-icon' onClick={toggleCartHidden}>
        <ShoppingIcon className='shopping-icon' />
        <span className='item-count'>{itemCount}</span>
    </div>
);

const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
});

//selectCartItemsCount is a memoized selector. only recalculate when its concern data (catItem) in state is changed and just returned the previously memoized value when no change.
//itemCount: integer, is a primitive value. redux does shallow comparison and re-renders when this integer is changed, not because of selector finding the change. 
const mapStateToProps = createStructuredSelector({
    itemCount: selectCartItemsCount
})
/*const mapStateToProps = state => ({
    itemCount: selectCartItemsCount(state)
})
const mapStateToProps = ({cart: {cartItems}}) => ({
    itemCount: cartItems.reduce((accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity, 0)
})
*/

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);

/*
 onClick invoked on the first time

=> toggleCartHidden() creates action {type: CartActionTypes.TOGGLE_CART_HIDDEN}

=> middleware receives action then invokes rootReducer with it

=> cartReducer receives action then creates new state object {...state,hidden: false}

=> store receives this new state object so as header component. so header component is updated accordingly

=> hidden:false in this {hidden ? null : <CartDropdown />}, so <CartDropdown /> selected
*/