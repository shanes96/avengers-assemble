export const getSpecificUserShoppingCart = () => {
    return fetch("http://localhost:8000/carts?myCart", {
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