import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import {auth, signInWithGoogle} from '../../firebase/firebase.utils';

import './sign-in.styles.scss';

class Signin extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }

    //clear out the fields after submit. can not define state inside handleSubmit method. Do that with this.setState() in the constructor and in the method to update state.
    handleSubmit = async event => {
        console.log('entering handleSubmit');
        event.preventDefault(); //prevent the default submit action from firing because we want full control over exactly what this summit is going to do.
        const {email, password} = this.state;
        try{
            console.log('runs auth.signInWithEmailAndPassword');
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({email: '', password: ''})
        } catch(error){
            console.log(error);
        }
        
    };

    handleChange = event => {
        const {value, name} = event.target;
        this.setState({[name]: value});
    }

    render(){
        console.log('sign-in rendering')
        return (
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput name="email" type='email' value={this.state.email} handleChange={this.handleChange} label='email' required />
                    <FormInput name="password" type='password' value={this.state.password} handleChange={this.handleChange} label='password' required />

                    <div className='buttons'>
                    <CustomButton type='submit'>Sign In</CustomButton>
                    <CustomButton onClick={signInWithGoogle} isGoogleSignIn>Sign In with Google</CustomButton>
                    </div>
                </form>
            </div>
        );
    };
};

export default Signin;

//before replacing with component FormInput and CustomButton
//<form onSubmit={this.handelSubmit}>
//<input name="email" type='email' value={this.state.email} onChange={} required />
//<label>Email</label>
//<input name="password" type='password' value={this.state.password} onChange={} required />
//<label>Pasword</label>
//<input type='submit' value='Submit Form' />
//</form>

