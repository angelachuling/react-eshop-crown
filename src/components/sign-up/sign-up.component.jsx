import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import {auth, createUserProfileDocument} from '../../firebase/firebase.utils';

import './sign-up.styles.scss';

class SignUp extends React.Component {
    constructor() {
      super();
  
      this.state = {
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
      };
    }
  
    handleSubmit = async event => {

      console.log('enter handleSubmit function');

      event.preventDefault();
  
      const { displayName, email, password, confirmPassword } = this.state;
  
      if (password !== confirmPassword) {
          console.log("passwords don't match");
        alert("passwords don't match");
        return;
      }
  
      try {
        
        //tells firebase to create a user account with given email and pw. firebase response with confirmation of receiving creation application. this confirmation (stored in {user}) contains uid which is needed for official creation.
        console.log('passwords match then start creating {user} in createUserWithEmailAndPassword')
        const {user} = await auth.createUserWithEmailAndPassword(email, password);
        console.log('{user} created. check user { displayName }', user, { displayName });
        
        await createUserProfileDocument(user, { displayName });
            
        this.setState({
          displayName: '',
          email: '',
          password: '',
          confirmPassword: ''
        }, ()=> console.log('handleSubmit: setSate with empty strings'));
      } catch (error) {
        console.error('check error', error);
      }
    };
  
    handleChange = event => {
      const { name, value } = event.target;
    //   console.log(name, value)
  
      this.setState({ [name]: value });
    };
  
    render() {
      const { displayName, email, password, confirmPassword } = this.state;
      console.log('sign-up component rendering');
      return (
        <div className='sign-up'>
          <h2 className='title'>I do not have a account</h2>
          <span>Sign up with your email and password</span>
          <form className='sign-up-form' onSubmit={this.handleSubmit}>
            <FormInput
              type='text'
              name='displayName'
              value={displayName}
              onChange={this.handleChange}
              label='Display Name'
              required
            />
            <FormInput
              type='email'
              name='email'
              value={email}
              onChange={this.handleChange}
              label='Email'
              required
            />
            <FormInput
              type='password'
              name='password'
              value={password}
              onChange={this.handleChange}
              label='Password'
              required
            />
            <FormInput
              type='password'
              name='confirmPassword'
              value={confirmPassword}
              onChange={this.handleChange}
              label='Confirm Password'
              required
            />
            <CustomButton type='submit'>SIGN UP</CustomButton>
          </form>
        </div>
      );
    }
  }
  
  export default SignUp;