import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {withRouter} from 'react-router-dom';


import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';
import {selectCartItems} from '../../redux/cart/cart.selectors';
import {toggleCartHidden} from '../../redux/cart/cart.actions';

import './cart-dropdown.styles.scss';

const CartDropdown = ({cartItems, history, dispatch}) => (
    <div className='cart-dropdown'>
        <div className='cart-items'>
            {cartItems.length ? (
                cartItems.map(cartItem => (
                <CartItem key={cartItem.id} item={cartItem} />
            ))
            ) : (
            <span className='empty-message'>Your cart is empty</span>
            )
            }
        </div> 
        <CustomButton onClick={()=> {
            history.push('/checkout');
            dispatch(toggleCartHidden());
            }}>GO TO CHECKOUT</CustomButton>
    </div>
);

//selectCartItems is a memorized selector. only recalculate when its concern data (catItem) in state is changed and just returned the previously memoized value when no change.
const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
})

/*const mapStateToProps = state => ({
    cartItems: selectCartItems(state)
})

const mapStateToProps = ({cart: {cartItems}}) => ({
     cartItems
 })

*/

// withRouter takes the component that got returned from our connect call as its component argument 
//withRouter will pass updated match, location, and history props to the wrapped component whenever it renders
export default withRouter(connect(mapStateToProps)(CartDropdown));
//connect actually passes dispatch into our components as a prop if we do not supply a second argument to connect.