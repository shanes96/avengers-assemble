import React from "react"
import { UpdateFormCard } from "./UpdateFormCard"
import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import "./CreateTeam.css"

export const UpdateTeamForm = () => {
    const [url, setUrl] = useState("http://gateway.marvel.com/v1/public/characters?ts=1&apikey=9410888bec125d11c09be9b3037e4524&hash=60935f7b6e667cce8caedde91c7afe95")
    const [item, setItem] = useState();
    useEffect(() => {
        const fetch = async () => {
            const res = await axios.get(url)
            setItem(res.data.data.results);
        }
        fetch();
    }, [url])

    return (
        <>
            <h1 id='update_team_text' >Update Your Avengers Team</h1>
            <h4 id='update_team_text' >Edit Your Team Name!</h4>
            <p id='update_team_text'>Coming Soon! Add & Delete Characters To Your Team!</p>
            <div className="content">
                {
                    (!item) ? <p>Not Found</p> : <UpdateFormCard data={item} />
                }
            </div>
        </>
    )
}