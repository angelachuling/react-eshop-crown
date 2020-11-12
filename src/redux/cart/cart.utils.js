export const addItemToCart = (cartItems, cartItemToAdd) => {
    //check if cardItemToAdd exists in cartItems pool
    const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToAdd.id);

    if (existingCartItem) {
        //by using map(), new cartItems array will be returned.
        return cartItems.map(cartItem => 
            cartItem.id === cartItemToAdd.id ? 
            //the existing cardItem, same as cardItemToAdd, has its quantity increased by 1 
            {...cartItem, quantiy: cartItem.quantity + 1} : cartItem
            //the one doesnt match remains unchanged
        );
    }

    return [...cartItems, {...cartItemToAdd, quantity: 1}]
    //quantity property gets attached to the item which is added at the first time

};

