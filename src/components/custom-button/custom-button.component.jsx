import React from 'react';

//import './custom-button.styles.scss';
import {CustomButtonContainer} from './custom-button.styles'

// const CustomButton = ({children, isGoogleSignIn, inverted, ...otherProps}) => (
//     <button className={
//         `${inverted ? 'inverted':''} 
//         ${isGoogleSignIn ? 'google-sign-in':''} 
//         custom-button`} 
//         {...otherProps}
//     >
//         {children}
//     </button>
// );

const CustomButton = ({children, ...props}) => (
    <CustomButtonContainer {...props}>
        {children}
    </CustomButtonContainer>
);


export default CustomButton;

//<CustomButton type='submit'>Sign In</CustomButton>
//{children: 'Sign In', type:'submit'}