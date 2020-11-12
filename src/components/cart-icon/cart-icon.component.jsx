import React from 'react';
import {connect} from 'react-redux';

import {toggleCartHidden} from '../../redux/cart/cart.actions';

import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg';

import './cart-icon.styles.scss';

const CartIcon = ({toggleCartHidden}) => (
    <div className='cart-icon' onClick={toggleCartHidden}>
        <ShoppingIcon className='shopping-icon' />
        <span className='item-count'>0</span>
    </div>
);

const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
});

export default connect(null, mapDispatchToProps)(CartIcon);

/*
 onClick invoked on the first time

=> toggleCartHidden() creates action {type: CartActionTypes.TOGGLE_CART_HIDDEN}

=> middleware receives action then invokes rootReducer with it

=> cartReducer receives action then creates new state object {...state,hidden: false}

=> store receives this new state object so as header component. so header component is updated accordingly

=> hidden:false in this {hidden ? null : <CartDropdown />}, so <CartDropdown /> selected
*/