export const addComic = (comic) => {
    return fetch("http://localhost:8000/comics", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("aa_token")}`
        },
        body: JSON.stringify(comic)

    }).then(res => res.json())
}

export const addComicForUser = (userComic) => {
    return fetch("http://localhost:8000/usercomics", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("aa_token")}`
        },
        body: JSON.stringify(userComic)

    }).then(res => res.json())
}

export const getComics = () => {
    return fetch("http://localhost:8000/comics", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("aa_token")}`
        }
    })
        .then(response => response.json())
}

export const updateComicQuantity = (id, quantity) => {
    return fetch(`http://localhost:8000/cartcomics/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("aa_token")}`
        },
        body: JSON.stringify({ quantity: quantity })
    }).then(response => response.json());
}



export const deleteComic = (id) => {
    return fetch(`http://localhost:8000/cartcomics/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("aa_token")}`,
            "Content-Type": "application/json"
        }, method: "DELETE"
    })
}