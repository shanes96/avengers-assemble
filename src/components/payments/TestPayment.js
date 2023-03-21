// import { getSpecificUserShoppingCart } from "../managers/CartManager"
// import { useState, useEffect } from "react"
// import { useNavigate } from "react-router-dom"
// import "./TestPayment.css"

// const ProductDisplay = () => (
//     <section id="shopping_cart_section">
//         <div id="product">
//             <img
//                 id="image"
//                 src="https://cdn.marvel.com/u/prod/marvel/i/mg/f/10/598363848588e/detail.jpg"
//                 alt="The cover of Stubborn Attachments"
//             />
//             <div id="description">
//                 <h3 id="shopping_cart_text">Amazing Fantasy 15</h3>
//                 <h5 id="shopping_cart_text">$10.00</h5>
//             </div>
//         </div>
//         <form action="http://localhost:4242/create-checkout-session" method="POST">
//             <button type="submit" class="btn btn-danger">
//                 Checkout
//             </button>
//         </form>
//     </section>
// )

// const Message = ({ message }) => (
//     <section>
//         <p id="payment_text">{message}</p>
//     </section>
// )

// export const TestPayment = () => {
//     const [allCarts, setAllCarts] = useState([])
//     const [message, setMessage] = useState("")
//     const [showProductDisplay, setShowProductDisplay] = useState(true)
//     const navigate = useNavigate()

//     useEffect(() => {
//         getSpecificUserShoppingCart().then((data) => {
//             setAllCarts(data)
//         })
//     }, [])

//     useEffect(() => {
//         // Check to see if this is a redirect back from Checkout
//         const query = new URLSearchParams(window.location.search)

//         if (query.get("success")) {
//             const successMessage =
//                 "Order placed! You will receive an email confirmation."
//             setMessage(successMessage)
//             setShowProductDisplay(false)
//         }

//         if (query.get("canceled")) {
//             setMessage(
//                 "Order canceled -- continue to shop around and checkout when you're ready."
//             )
//             setShowProductDisplay(false)
//         }
//     }, [])

//     return (
//         <>
//             {allCarts.map((cart) => {
//                 return (
//                     <section id="shopping_cart_section" key={cart.id}>
//                         {cart.comics.map((comic) => (
//                             <div id="product" key={comic.id}>
//                                 <img
//                                     id="image"
//                                     src={`${comic.comic_picture}.${comic.comic_extension}`}
//                                 />
//                                 <div id="description">
//                                     <h3 id="shopping_cart_text">{comic.comic_title}</h3>
//                                     <h5 id="shopping_cart_text">$10.00</h5>
//                                 </div>
//                             </div>
//                         ))}
//                         <form
//                             action="http://localhost:4242/create-checkout-session"
//                             method="POST"
//                         >
//                             <button type="submit" class="btn btn-danger">
//                                 Checkout
//                             </button>
//                         </form>
//                     </section>
//                 )
//             })}
//             {message && <Message message={message} />}
//             {showProductDisplay && <ProductDisplay />}
//         </>
//     )
// }
