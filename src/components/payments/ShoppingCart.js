import { getSpecificUserShoppingCart } from "../managers/CartManager"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { updateComicQuantity } from "../managers/ComicManager"
import "./TestPayment.css"

const Message = ({ message }) => (
    <section>
        <p id="payment_text">{message}</p>
    </section>
)

export const ShoppingCart = () => {
    const [allCarts, setAllCarts] = useState([])
    const [message, setMessage] = useState("")
    const [showProductDisplay, setShowProductDisplay] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        getSpecificUserShoppingCart().then((data) => {
            setAllCarts(data)
        })
    }, [])

    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search)

        if (query.get("success")) {
            const successMessage =
                "Order placed! You will receive an email confirmation."
            setMessage(successMessage)
            setShowProductDisplay(false)
        }

        if (query.get("canceled")) {
            setMessage(
                "Order canceled -- continue to shop around and checkout when you're ready."
            )
            setShowProductDisplay(false)
        }
    }, [])

    return (
        <>
            {allCarts.map((cart) => {
                return (
                    <section id="shopping_cart_section" key={cart.id}>
                        {cart.comics.map((comic) => (
                            <div id="product" key={comic.id}>
                                <img
                                    id="image"
                                    src={`${comic.comic_picture}.${comic.comic_extension}`}
                                />
                                <div id="description">
                                    <h3 id="shopping_cart_text">{comic.comic_title}</h3>
                                    <h5 id="shopping_cart_text">${comic.comic_price}</h5>
                                    <div>
                                        <h5 id="shopping_cart_text">Quantity:</h5>
                                        <select  value={comic.quantity}>
                                            {[...Array(10).keys()].map((quantity) => (
                                                <option key={quantity} value={quantity + 1}>
                                                    {quantity + 1}
                                                </option>
                                            ))}
                                        </select>
                                    </div>


                                </div>
                            </div>
                        ))}
                        <div>Total:</div>
                        <form
                            action="http://localhost:8000/create-checkout-session"
                            method="POST"
                        >
                            <button type="submit" class="btn btn-danger">
                                Checkout
                            </button>
                        </form>
                    </section>
                )
            })}
            {message && <Message message={message} />}
            {showProductDisplay}
        </>
    )
}
