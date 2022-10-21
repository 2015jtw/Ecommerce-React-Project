require("dotenv").config();
const stripe = require("stripe")('sk_test_51LrpqyG3v7jJSjGJRbsiah1pTKjmo9rcfQjfVPpaNMaGs5kihm9th69l4fJZgkTFVLd0POkW3kDYMU6ywxiGFbNZ00ANyEALMZ');

exports.handler = async (event) => {
  try {
    const { amount } = JSON.parse(event.body);

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ paymentIntent }),
    };
  } catch (error) {
    console.log({ error });

    return {
      statusCode: 400,
      body: JSON.stringify({ error }),
    };
  }
};