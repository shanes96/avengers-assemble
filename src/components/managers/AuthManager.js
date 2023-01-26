export const loginUser = (user) => {
    return fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(res => res.json())
}

export const registerUser = (user) => {
    return fetch("http://127.0.0.1:8000/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(res => res.json())
}

export const getUserById = (id) => {
    return fetch(`http://localhost:8000/users/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("aa_token")}`
        }
    })
        .then(response => response.json())
}

export const getComicsById = (id) => {
    return fetch(`http://localhost:8000/comics/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("aa_token")}`
        }
    })
        .then(response => response.json())
}

export const getTeamsById = (id) => {
    return fetch(`http://localhost:8000/teams/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("aa_token")}`
        }
    })
        .then(response => response.json())
}

export const getBattlesById = (id) => {
    return fetch(`http://localhost:8000/battles/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("aa_token")}`
        }
    })
        .then(response => response.json())
}

export const getMoviesById = (id) => {
    return fetch(`http://localhost:8000/movies/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("aa_token")}`
        }
    })
        .then(response => response.json())
}

export const getSpecificUserTeamInfo = () => {
    return fetch("http://localhost:8000/teams?myTeams", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("aa_token")}`
        }
    })
        .then(response => response.json())
}

export const getSpecificUserInfo = () => {
    return fetch("http://localhost:8000/users?myProfile", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("aa_token")}`
        }
    })
        .then(response => response.json())
}

export const getSpecificUserComics = () => {
    return fetch("http://localhost:8000/comics?myComics", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("aa_token")}`
        }
    })
        .then(response => response.json())
}

export const getUsers = () => {
    return fetch("http://localhost:8000/users", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("aa_token")}`
        }
    })
        .then(response => response.json())
}

export const getTeams = () => {
    return fetch("http://localhost:8000/teams", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("aa_token")}`
        }
    })
        .then(response => response.json())
}


export const deleteTeam = (id) => {
    return fetch(`http://localhost:8000/teams/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("aa_token")}`,
            "Content-Type": "application/json"
        }, method: "DELETE"
    })
}

export const addCharacter = (character) => {
    return fetch("http://localhost:8000/characters", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("aa_token")}`
        },
        body: JSON.stringify(character)

    }).then(res => res.json())
}

export const addTeam = (team) => {
    return fetch("http://localhost:8000/teams", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("aa_token")}`
        },
        body: JSON.stringify(team)

    }).then(res => res.json())
}

export const addCharacterTeam = (characterTeam) => {
    return fetch("http://localhost:8000/characterteams", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("aa_token")}`
        },
        body: JSON.stringify(characterTeam)

    }).then(res => res.json())
}

export const updateTeam = (userTeam, id) => {
    return fetch(`http://localhost:8000/teams/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("aa_token")}`
        },
        body: JSON.stringify(userTeam)

    })
}

export const getSingleTeam = (id) => {
    return fetch(`http://localhost:8000/teams/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("aa_token")}`
        }
    })
        .then(response => response.json())
}

export const getSingleCharacter = (id) => {
    return fetch(`http://localhost:8000/characters/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("aa_token")}`
        }
    })
        .then(response => response.json())
}