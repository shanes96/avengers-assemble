export const getBattles = () => {
    return fetch("http://localhost:8000/battles?allCurrentBattles", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("aa_token")}`
        }
    })
        .then(response => response.json())
}

export const getCompletedBattles = () => {
    return fetch("http://localhost:8000/battles?allCompletedBattles", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("aa_token")}`
        }
    })
        .then(response => response.json())
}

export const getVotes = () => {
    return fetch("http://localhost:8000/votes", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("aa_token")}`
        }
    })
        .then(response => response.json())
}

export const addVote = (vote) => {
    return fetch("http://localhost:8000/votes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("aa_token")}`
        },
        body: JSON.stringify(vote)

    }).then(res => res.json())
}

export const createBattle = (battle) => {
    return fetch("http://localhost:8000/battles", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("aa_token")}`
        },
        body: JSON.stringify(battle)

    }).then(res => res.json())
}

export const getSingleBattle = (id) => {
    return fetch(`http://localhost:8000/battles/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("aa_token")}`
        }
    })
        .then(response => response.json())
}

export const updateBattle = (userBattle, id) => {
    return fetch(`http://localhost:8000/battles/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("aa_token")}`
        },
        body: JSON.stringify(userBattle)

    })
}

export const getSpecificUserBattles = () => {
    return fetch("http://localhost:8000/battles?myBattles", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("aa_token")}`
        }
    })
        .then(response => response.json())
}

export const getSpecificUserBattlesResults = () => {
    return fetch("http://localhost:8000/battles?myCompletedBattles", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("aa_token")}`
        }
    })
        .then(response => response.json())
}


export const getOpponents = () => {
    return fetch("http://localhost:8000/users?myOpponents", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("aa_token")}`
        }
    })
        .then(response => response.json())
}

export const getSingleUser = (id) => {
    return fetch(`http://localhost:8000/users/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("aa_token")}`
        }
    })
        .then(response => response.json())
}