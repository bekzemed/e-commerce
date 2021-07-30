import React, { useState } from 'react';

import './sign-up.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { signUpStart } from '../../redux/user/user.actions';
import { connect } from 'react-redux';

const SignUp = ({ signUpStart }) => {
  const [userCredential, setUserCredential] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async e => {
    e.preventDefault();

    const { email, password, displayName, confirmPassword } = userCredential;

    if (password !== confirmPassword) {
      alert('Password mismatch');
    }

    signUpStart({ email, password, displayName });
    // try {
    //   const { user } = await auth.createUserWithEmailAndPassword(
    //     email,
    //     password
    //   );
    //   await createUserProfileDocument(user, { displayName });
    //   this.setState({
    //     displayName: '',
    //     email: '',
    //     password: '',
    //     confirmPassword: '',
    //   });
    // } catch (error) {
    //   console.error(error);
    // }
  };

  const handleChange = e => {
    const { name, value } = e.target;

    setUserCredential({ ...userCredential, [name]: value });
  };

  const { displayName, email, password, confirmPassword } = userCredential;
  return (
    <div className="sign-up">
      <h2 className="title">I do not have a account</h2>
      <span>Sign up with your email and password</span>

      <form className="sign-up-form" onSubmit={handleSubmit}>
        <FormInput
          type="text"
          handleChange={handleChange}
          label="Display Name"
          value={displayName}
          name="displayName"
          required
        />

        <FormInput
          type="email"
          handleChange={handleChange}
          label="Email"
          value={email}
          name="email"
          required
        />
        <FormInput
          type="password"
          handleChange={handleChange}
          label="Password"
          value={password}
          name="password"
          required
        />

        <FormInput
          type="password"
          handleChange={handleChange}
          label="Confirm Password"
          value={confirmPassword}
          name="confirmPassword"
          required
        />

        <CustomButton type="submit"> SIGN UP </CustomButton>
      </form>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  signUpStart: user => dispatch(signUpStart(user)),
});

export default connect(null, mapDispatchToProps)(SignUp);
