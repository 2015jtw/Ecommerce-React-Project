import { useState } from "react";
import { signInWithGooglePopUp, createUserDocFromAuth, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import Button from "../button/button";
import FormInput from "../form-input/form-input";
import './Sign-in.scss'

const defaultFormFields = {
    email: '',
    password: ''
}

const SignIn = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;

    const resetFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        const {user} = await signInWithGooglePopUp();
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        try {
            const {user} = await signInAuthUserWithEmailAndPassword(
              email,
              password
            );
            resetFields();
          } catch (error) {
            switch (error.code) {
              case 'auth/wrong-password':
                alert('incorrect password for email');
                break;
              case 'auth/user-not-found':
                alert('no user associated with this email');
                break;
              default:
                console.log(error);
            }
          }
    }

    const handleChange = (evt) => {
        const {name, value} = evt.target;
        setFormFields({...formFields, [name]: value})
    }

    return(
        <div className="sign-up-container">
            <h2>Already have an account</h2>
            <span>Sign In with your email and password</span>

            <form onSubmit={handleSubmit}>
       
                <FormInput 
                    label="Email"
                    onChange={handleChange} 
                    type="email" 
                    required 
                    name="email" 
                    value={email}
                />

                <FormInput 
                    label="Password"
                    onChange={handleChange} 
                    type="password" 
                    required 
                    name="password" 
                    value={password}
                />

                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button type='button' buttonType='google' onClick={signInWithGoogle}>Google sign In</Button>
                </div>
                
            </form>
        </div>
    )
}

export default SignIn;