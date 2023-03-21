export const getSpecificUserShoppingCart = () => {
    return fetch("http://localhost:8000/cartcomics", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("aa_token")}`
        }
    })
        .then(response => response.json())
}

export const getCartTotal = (id) => {
    return fetch(`http://localhost:8000/get-cart-total/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("aa_token")}`
        }
    })
        .then(response => response.json())
}


export const addComicToUserCart = (cart) => {
    return fetch("http://localhost:8000/carts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("aa_token")}`
        },
        body: JSON.stringify(cart)

    }).then(res => res.json())
}

const csrftoken = getCookie('csrftoken');

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

export const checkoutUser = (cart_id) => {
    const csrftoken = getCookie('csrftoken');
    return fetch(`http://localhost:8000/create-checkout-session/${cart_id}/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("aa_token")}`,
            "X-CSRFToken": csrftoken
        },
        body: JSON.stringify({})
    }).then(res => res.json())
        .then((data) => {
            console.log("Session ID:", data.id); // log the session ID
            // redirect to Stripe checkout
            setTimeout(() => {
                var url = `https://checkout.stripe.com/c/pay/${data.id}#fidkdWxOYHwnPyd1blpxYHZxWjA0SGJAUzBCTU1XN1MyS3BmUnB8QmhRbWZzZ0o8PVR1bVJIa2o2QjxIcnB0SUpRbG50XTFwbjYzU2t%2FbE9uUjRtXEFgMm9fR1U8MkIxMUB3NXRKVHN9fWdBNTVXZzJHcDdnXycpJ2N3amhWYHdzYHcnP3F3cGApJ2lkfGpwcVF8dWAnPydocGlxbFpscWBoJyknYGtkZ2lgVWlkZmBtamlhYHd2Jz9xd3BgeCUl`;
                window.location.href = url;
            }); // add a delay of 2 seconds before redirecting
        })
        .catch((error) => {
            console.error(error);
        });


    }