import React, { useState, useEffect } from "react";

const ProductDisplay = () => (
    <section>
        <div className="product">
            <img
                src="https://cdn.marvel.com/u/prod/marvel/i/mg/f/10/598363848588e/detail.jpg"
                alt="The cover of Stubborn Attachments"
            />
            <div className="description">
                <h3>Amazing Fantasy 15</h3>
                <h5>$10.00</h5>
            </div>
        </div>
        <form action="http://localhost:4242/create-checkout-session" method="POST">
            <button type="submit">
                Checkout
            </button>
        </form>
    </section>
);

const Message = ({ message }) => (
    <section>
        <p>{message}</p>
    </section>
);

export default function TestPayment() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);

        if (window.location.pathname === "/success") {
            setMessage("Order placed! You will receive an email confirmation.");
        }

        if (query.get("canceled")) {
            setMessage(
                "Order canceled -- continue to shop around and checkout when you're ready."
            );
        }
    }, []);

    const handleClick = () => {
        window.location.href = "http://localhost:3000/profile";
    };

    return message ? (
        <Message message={message} />
    ) : (
        <ProductDisplay />
    );
}

