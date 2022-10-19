import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { buttonTypeClass} from "../button/button";
import Button from "../button/button";
import { PaymentFormContainer, FormContainer } from "./payment-form-styles";


const PaymentForm = () => {

    const stripe = useStripe();
    const elements = useElements();

    const paymentHandler = async (e) => {
        e.preventDefault();

        if(!stripe || !elements){
            return;
        }


        const response = await fetch('/.netlify/functions/create-payment-intent', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: 1000 }),
        }).then((res) => res.json());

        console.log(response)
    }

    return(
        <div>
            <PaymentFormContainer>
                <FormContainer onSubmit={paymentHandler}>
                    <h2>Credit Card Payment: </h2>
                    <CardElement/>
                    <Button buttonType={buttonTypeClass.inverted}>Pay Now</Button>
                </FormContainer>
            </PaymentFormContainer>
        </div>
    )
}

export default PaymentForm;