import React from 'react';
// import './custom-button.styles.scss';

import { CustomButtonContainer } from './custom-button.styles';

const CustomButton = ({
  children,
  // isGoogleSignin,
  // inverted,
  ...otherProps
}) => (
  // <button
  //   className={` ${inverted ? 'inverted' : ''} ${
  //     isGoogleSignin ? 'google-sign-in' : ''
  //   } custom-button`}
  //   {...otherProps}
  // >
  //   {children}
  // </button>
  <CustomButtonContainer {...otherProps}>{children}</CustomButtonContainer>
);

export default CustomButton;
