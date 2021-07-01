import React from 'react';

// import './form-input.styles.scss';

import {
  FormContainer,
  FormInputContainer,
  FormInputLabelContainer,
} from './form-input.styles';

const FormInput = ({ label, handleChange, ...otherProps }) => (
  // <div className="group">
  //   <input className="form-input" onChange={handleChange} {...otherProps} />
  //   {label ? (
  //     <label
  //       className={`${
  //         otherProps.value.length ? 'shrink' : ''
  //       } form-input-label`}
  //     >
  //       {label}
  //     </label>
  //   ) : null}
  // </div>
  <FormContainer>
    <FormInputContainer onChange={handleChange} {...otherProps} />
    {label ? (
      <FormInputLabelContainer {...otherProps}>{label}</FormInputLabelContainer>
    ) : null}
  </FormContainer>
);

export default FormInput;
