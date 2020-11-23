import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

//only use checkout component from Stripe. no payment is processed
//test credit card number: 4242 4242 4242 4242, Exp: 01/22, CW: 123
const StripeCheckoutButton = ({price}) => {
    // stripe uses cent.
   const priceForStripe = price * 100;
   const publishableKey = 'pk_test_51HqaiMDCqAGFjGQPziHqFH7I8BZ0hfLJ3LnpDGXdo14efmsp2UL31uR9gXb2gJ7jFDGYzQrVWvQiGncZDuGAL2BB00z7fuCum0';

   //token is created when submit. in our case, no payment will be processed and we only console it.
   const onToken = token => {
       console.log(token);
       alert('Payment Successful')
   }

   return (
       <StripeCheckout 
       lable='Pay Now'
       name='Crown Clothing Ltd'
       billingAddress
       shippingAddress
       image='https://sendeyo.com/up/d/f3eb2117da'
       description={`Your total is €${price}`}
       amount={priceForStripe}
       currency="EUR"
       panelLabel='Pay Now'
       token={onToken}
       stripeKey={publishableKey}
       />

   );
};

export default StripeCheckoutButton;