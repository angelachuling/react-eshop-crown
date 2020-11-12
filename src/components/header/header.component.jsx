import React from 'react';
import {Link} from 'react-router-dom';
import {connect}  from 'react-redux';

import {auth} from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import {ReactComponent as Logo} from '../../assets/crown.svg';

import './header.styles.scss';

const Header = ({currentUser, hidden}) => (
    <div className='header'>
        <Link className='logo' to='"/'>
            <Logo className='logo' />
        </Link>
        <div className='options'>
            <Link className='option' to='/shop'>
                SHOP
            </Link>
            <Link className='option' to='/contact'>
                CONTACT
            </Link>
            {currentUser ? (
                <div className='option' onClick={()=> auth.signOut()}>
                    SIGN OUT
                </div>
            ) : (
                <Link className='option' to='/signin'>
                    SIGN IN
                </Link>
            )}
            <CartIcon />
        </div>
        {hidden ? null : <CartDropdown />}
    </div>
);

//to access some part of redux store
const mapStateToProps = ({user: {currentUser}, cart: {hidden}}) => ({
    //function parameter is state.
    //state is combineReducers = {user: userReducer} 
    //state.user = userReducer = {...state,currentUser: action.payload}
    // state.user.currentUser = action.payload
    //currentUser: state.user.currentUser

    currentUser,
    hidden
});

export default connect(mapStateToProps)(Header);
