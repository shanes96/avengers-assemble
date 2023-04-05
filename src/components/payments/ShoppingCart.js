import { checkoutUser, getCartTotal, getSpecificUserShoppingCart } from "../managers/CartManager"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { deleteComic, updateComicQuantity } from "../managers/ComicManager"
import "./ShoppingCart.css"

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
            console.log('Success message:', successMessage)

        }

        if (query.get("canceled")) {
            setMessage(
                "Order canceled -- continue to shop around and checkout when you're ready."
            )
            setShowProductDisplay(false)
            console.log('Canceled message:', message)

        }
    }, [])

    return (
        <>
            {allCarts.length === 0 ? (
                <div>No items in cart</div>
            ) : (
                allCarts?.map((cart) => {
                    return (
                        <section id="shopping_cart_section" key={cart.id}>
                            <div id="product">
                                <img
                                    id="image"
                                    src={`${cart?.comic?.comic_picture}.${cart?.comic?.comic_extension}`}
                                />
                                <div id="description">
                                    <h3 id="shopping_cart_text">{cart?.comic?.comic_title}</h3>
                                    <h5 id="shopping_cart_text">${cart?.comic?.comic_price}</h5>
                                    {/* <h7 id="shopping_cart_text">Subtotal:${cart?.comic_sub_total}</h7> */}
                                    <div>
                                        <select onChange={(event) => {
                                            updateComicQuantity(cart?.comic?.id, event.target.value)
                                                .then(updatedComic => {
                                                    setAllCarts(prevCart => ({
                                                        ...prevCart,
                                                        comic: updatedComic
                                                    }));
                                                });
                                            window.location.reload()
                                        }}
                                            value={cart?.quantity}>
                                            {[...Array(10).keys()].map((quantity) => (
                                                <option key={quantity} value={quantity + 1}>
                                                    {quantity + 1}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <button
                                        id="delete_comic_button"
                                        class="btn btn-danger"
                                        onClick={() => {
                                            deleteComic(cart?.id)
                                                .then(() => {
                                                    window.location.reload(false);
                                                })
                                        }}
                                    >Delete Comic From Cart</button>
                                </div>
                            </div>
                        </section>
                    )
                })
            )}

            <div id="checkout" class="col-md-4 order-md-2 mb-4">
                <h4 class="d-flex justify-content-between align-items-center mb-3">
                    <span class="text-muted">Your cart</span>
                    <span class="badge badge-secondary badge-pill">3</span>
                </h4>
                <ul class="list-group mb-3">
                    <li class="list-group-item d-flex justify-content-between lh-condensed">
                        <div>
                            <h6 class="my-0">Sub Total</h6>
                        </div>
                        <span class="text-muted">{allCarts.length > 0 ? allCarts[0].cart_sub_total : 0}</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between bg-light">
                        <div class="text-success">
                            <h6 class="my-0">Tax</h6>
                            <small></small>
                        </div>
                        <span class="text-success">{allCarts.length > 0 ? allCarts[0].tax : 0}</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between">
                        <span>Total (USD)</span>
                        <strong>{allCarts.length > 0 ? allCarts[0].cart_total : 0}</strong>
                    </li>
                </ul>

                <button
                    class="btn btn-secondary"
                    onClick={() => {
                        checkoutUser(allCarts.length > 0 ? allCarts[0].cart?.id : null)
                    }}
                >
                    Checkout
                </button>
                <div id="divider" className="vr"></div>
                {message && <Message message={message} />}
            </div>

            {showProductDisplay}
        </>
    )
}
