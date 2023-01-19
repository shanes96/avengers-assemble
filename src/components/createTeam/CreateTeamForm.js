import React from "react"
import { Card } from "./Card"
import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import "./CreateTeam.css"
export const CreateTeamForm = () => {
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
            <h5 className="create_team_page_title">Assemble Your Own Avengers Team!</h5>
            <ul className="create_team_directions">
                <li>Create Your Own Avengers Team by browsing through all 8,000+ characters from Marvel
                    or type in your favorite characters in Search Character field!</li>
                <li>First Create A Team Name! Then choose and save your Avengers to your team by clicking on the checkbox "Add Character To Team".</li>
                <li>Once you feel like your team is ready to stop anyone who gets in their way click the "Create Team!" button!</li>
            </ul>

            <aside className="create_team_search_bar">
                <input type="search" placeholder='Search Character' id="search"
                    class="form-control"
                    onChange={e => setSearch(e.target.value)}
                    onKeyPress={searchMarvel} />
            </aside>
            <div className="content">

                {
                    (!item) ? <p>Not Found</p> : <Card data={item} />
                }
            </div>

            <div className="page_buttons">
                {currentPage > 1 && <button id="prev_button" class="btn btn-light" onClick={() => handlePageChange(currentPage - 1)}>Prev</button>}
                <button id="next_button" class="btn btn-light" onClick={() => handlePageChange(currentPage + 1)}>Next</button>
            </div>
        </>
    )
}