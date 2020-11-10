import React from 'react';

import './custom-button.styles.scss';

const CustomButton = ({children, isGoogleSignIn, ...otherProps}) => (
    <button className={`${isGoogleSignIn ? 'google-sign-in':''} custom-button`} {...otherProps}>
        {children}
    </button>
);

export default CustomButton;

//<CustomButton type='submit'>Sign In</CustomButton>
//{type:'submit', children: 'Sign In'}