import React from "react"
import { UpdateFormCard } from "./UpdateFormCard"
import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import "./CreateTeam.css"

export const UpdateTeamForm = () => {
    const [url, setUrl] = useState("http://gateway.marvel.com/v1/public/characters?ts=1&apikey=9410888bec125d11c09be9b3037e4524&hash=60935f7b6e667cce8caedde91c7afe95")
    const [item, setItem] = useState();
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        const fetch = async () => {
            const res = await axios.get(`${url}&offset=${(currentPage - 1) * 20}&limit=20`);
            setItem(res.data.data.results);
        };
        fetch();
    }, [url, currentPage]);

    const searchMarvel = () => {
        setUrl(`https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${search}&ts=1&apikey=9410888bec125d11c09be9b3037e4524&hash=60935f7b6e667cce8caedde91c7afe95`)
    }
    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };

    return (
        <>
            <h1 id='update_team_text' >Update Your Avengers Team</h1>
            <h4 id='update_team_text' >Edit Your Team Name!</h4>
            <p id='update_team_text'>Coming Soon! Add & Delete Characters To Your Team!</p>

            <aside className="create_team_search_bar">
                <input type="search" placeholder='Search Character' id="search"
                    class="form-control"
                    onChange={e => setSearch(e.target.value)}
                    onKeyPress={searchMarvel} />
            </aside>
            <div className="content">
                {
                    (!item) ? <p>Not Found</p> : <UpdateFormCard data={item} />
                }
            </div>
            <div className="page_buttons">
                {currentPage > 1 && <button id="prev_button" class="btn btn-light" onClick={() => handlePageChange(currentPage - 1)}>Prev</button>}
                <button id="next_button" class="btn btn-light" onClick={() => handlePageChange(currentPage + 1)}>Next</button>
            </div>
        </>
    )
}