import {BaseButton, GoogleSignInButton, InvertedButton} from './button.styles.jsx';
// have 3 types of buttons - default, inverted and google sign in 

export const buttonTypeClass = {
    base: 'base',
    google: 'google-sign-in',
    inverted: 'inverted'
}

const getButton = (buttonType = "base") => (
    {
        "base": BaseButton,
        "google": GoogleSignInButton,
        "inverted": InvertedButton,

    }[buttonType]
)

const Button = ({children, buttonType, ...otherProps}) => {

    const CustomButton = getButton(buttonType);

    return(
        <CustomButton {...otherProps}>
            {children}
        </CustomButton>
    )
};

export default Button;