export const getSpecificUserMovieInfo = () => {
    return fetch("http://localhost:8000/movies?myMovies", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("aa_token")}`
        }
    })
        .then(response => response.json())
}