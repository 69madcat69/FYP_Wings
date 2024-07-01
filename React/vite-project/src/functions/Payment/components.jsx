import React from "react";
import scriptLoader from "react-async-script-loader";
import axios from "axios";

const CURRENCY = "MYR";

const toCent = (amount) => amount * 100;

const StripeForm = ({ isScriptLoaded, isScriptLoadSucceed }) => {
  const [stripe, setStripe] = React.useState(null);

  React.useEffect(() => {
    if (isScriptLoaded && isScriptLoadSucceed) {
      setStripe(
        window.Stripe(
          "pk_test_51PWOIqI3e1sVFW09z8mhXJMsNf5CWogm1qvEzO6qb6PrhiEU7V3rSylXF3T3ImwzM4w7wpimrf3sdU6Qxni8x0Y6001HJ1mHDo"
        )
      );
    }
  }, [isScriptLoaded, isScriptLoadSucceed]);

  const [amount, setAmount] = React.useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const session = await axios.post(
      "https://api.example.com/payment/session-initiate",
      {
        customerEmail: "example@gmail.com",
        clientReferenceId: "A123",
        lineItem: {
          name: "My Name",
          description: "My Description",
          images: ["https://example.com/static/product.jpg"],
          amount: toCent(amount),
          currency: CURRENCY,
          quantity: 1,
        },
        successUrl: "https://example.com/success",
        cancelUrl: "https://example.com/cancel",
      }
    );

    const result = await stripe.redirectToCheckout({
      sessionId: session.data.id,
    });

    console.log(result.error.message);
  };

  if (!stripe) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        value={amount}
        onChange={(event) => setAmount(event.target.value)}
      />
      Euro
      <button type="submit">Buy</button>
    </form>
  );
};

export default scriptLoader("https://js.stripe.com/v3/")(StripeForm);
