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