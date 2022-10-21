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
            body: JSON.stringify({ amount: 10000 }),
        }).then((res) => res.json());

        

        const clientSecret = response.paymentIntent.client_secret;

        const paymentResult = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: 'Josh Worden'
                }
            }
        });

        if(paymentResult.error){
            alert(paymentResult.error)
        }
        else{
            if(paymentResult.paymentIntent.status === 'succeeded'){
                alert('Payment successful')
            }
        }

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