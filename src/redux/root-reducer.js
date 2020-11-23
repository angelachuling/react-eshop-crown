import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import directoryRedeucer from './directory/directory.reducer';
import shopReducer from './shop/shop.reducer';

const persistConfig = {
    key: 'root', //start from where
    storage,
    whitelist: ['cart'] //what data
}

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    directory: directoryRedeucer,
    shop: shopReducer
});

//enhance rootReducer with persist function
export default persistReducer(persistConfig, rootReducer);
