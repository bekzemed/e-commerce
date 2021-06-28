import React, { Component } from 'react';

import './sign-up.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  }

  handleSubmit = async e => {
    const { displayName, email, password, confirmPassword } = this.state;
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Password mismatch');
    }
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await createUserProfileDocument(user, { displayName });
      this.setState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    } catch (error) {
      console.error(error);
    }
  };

  handleChange = e => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  render() {
    const { displayName, email, password, confirmPassword } = this.state;
    return (
      <div className="sign-up">
        <h2 className="title">I do not have a account</h2>
        <span>Sign up with your email and password</span>

        <form className="sign-up-form" onSubmit={this.handleSubmit}>
          <FormInput
            type="text"
            handleChange={this.handleChange}
            label="Display Name"
            value={displayName}
            name="displayName"
            required
          />

          <FormInput
            type="email"
            handleChange={this.handleChange}
            label="Email"
            value={email}
            name="email"
            required
          />
          <FormInput
            type="password"
            handleChange={this.handleChange}
            label="Password"
            value={password}
            name="password"
            required
          />

          <FormInput
            type="password"
            handleChange={this.handleChange}
            label="Confirm Password"
            value={confirmPassword}
            name="confirmPassword"
            required
          />

          <CustomButton type="submit"> SIGN UP </CustomButton>
        </form>
      </div>
    );
  }
}

export default SignUp;
