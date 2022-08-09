import './button.scss'
// have 3 types of buttons - default, inverted and google sign in 

const buttonTypeClass = {
    google: 'google-sign-in',
    inverted: 'inverted'
}

const Button = ({children, buttonType, ...otherProps}) => {

    return(
        <button className={`button-container ${buttonTypeClass[buttonType]}`} {...otherProps}>
            {children}
        </button>
    )
}

export default Button;