export const addMovie = (movie) => {
    return fetch("http://localhost:8000/movies", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("aa_token")}`
        },
        body: JSON.stringify(movie)

    }).then(res => res.json())
}


export const addMovieForUser = (userMovie) => {
    return fetch("http://localhost:8000/usermovies", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("aa_token")}`
        },
        body: JSON.stringify(userMovie)

    }).then(res => res.json())
}

export const getMovies = () => {
    return fetch("http://localhost:8000/movies", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("aa_token")}`
        }
    })
        .then(response => response.json())
}