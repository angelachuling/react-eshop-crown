export const addItemToCart = (cartItems, cartItemToAdd) => {
    //check if cardItemToAdd exists in cartItems pool
    console.log('cartItems, cartItemToAdd', cartItems, cartItemToAdd )
    const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToAdd.id);

    if (existingCartItem) {
        //by using map(), new cartItems array will be returned.
        return cartItems.map(cartItem => 
            cartItem.id === cartItemToAdd.id ? 
            //the existing cardItem, same as cardItemToAdd, has its quantity increased by 1 
            {...cartItem, quantity: cartItem.quantity + 1} : cartItem
            //the one doesnt match remains unchanged
        );
    }

    return [...cartItems, {...cartItemToAdd, quantity: 1}]
    //quantity property gets attached to the item which is added at the first time

};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find(
      cartItem => cartItem.id === cartItemToRemove.id
    );
  
    if (existingCartItem.quantity === 1) {
      return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
    }
  
    //if not equal to 1
    return cartItems.map(cartItem =>
      cartItem.id === cartItemToRemove.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
  };
