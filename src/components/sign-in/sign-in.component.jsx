import React, { useState } from 'react';
import './sign-in.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import {
  googleSignInStart,
  emailSignInStart,
} from '../../redux/user/user.actions';
import { connect } from 'react-redux';

const SignIn = ({ emailSignInStart, googleSignInStart }) => {
  const [userCredential, setUserCredential] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async e => {
    const { email, password } = userCredential;
    e.preventDefault();
    emailSignInStart(email, password);
  };
  const handleChange = e => {
    const { name, value } = e;

    setUserCredential({ ...userCredential, [name]: value });
  };

  const { email, password } = userCredential;
  return (
    <div className="sign-in">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          type="email"
          name="email"
          value={email}
          handleChange={handleChange}
          required
          label="Email"
        />

        <FormInput
          type="password"
          name="password"
          value={password}
          handleChange={handleChange}
          required
          label="Password"
        />

        <div className="buttons">
          <CustomButton type="submit">Sign in </CustomButton>
          <CustomButton
            type="button"
            onClick={googleSignInStart}
            isGoogleSignin
          >
            Sign in with Google
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({ email, password })),
});

export default connect(null, mapDispatchToProps)(SignIn);
