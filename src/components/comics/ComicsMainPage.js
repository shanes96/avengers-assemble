import React from "react"
import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import { ComicCard } from "./ComicCard"
import "./Comics.css"
export const ComicsMainPage = () => {
    const [url, setUrl] = useState("http://gateway.marvel.com/v1/public/comics?ts=1&apikey=9410888bec125d11c09be9b3037e4524&hash=60935f7b6e667cce8caedde91c7afe95")
    const [item, setItem] = useState();
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        const fetch = async () => {
            const res = await axios.get(`${url}&offset=${(currentPage - 1) * 24}&limit=24`);
            setItem(res.data.data.results);
        };
        fetch();
    }, [url, currentPage]);

    const searchMarvel = () => {
        setUrl(`https://gateway.marvel.com:443/v1/public/comics?titleStartsWith=${search}&ts=1&apikey=9410888bec125d11c09be9b3037e4524&hash=60935f7b6e667cce8caedde91c7afe95`)
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };

        return (
            <>
                <h1 className="page_title">Marvel Comics!</h1>
                <h4 className="page_description" >Browse Comics or Search Comics By Your Favorite Character!</h4>
                    <div className="comic_search_bar">
                        <input type="search" placeholder='Search Here' id="comic_search"
                            class="form-control"
                            onChange={e => setSearch(e.target.value)}
                            onKeyPress={searchMarvel} />
                    </div>
                <div className="content">

                    {
                        (!item) ? <p>Not Found</p> : <ComicCard data={item} />
                    }
                </div>
                <div className="page_buttons">
                    {currentPage > 1 && 
                    <button id="prev_button" class="btn btn-light" onClick={() => handlePageChange(currentPage - 1)}>Prev</button>}
                    <button id="next_button" class="btn btn-light" onClick={() => handlePageChange(currentPage + 1)}>Next</button>
                </div>
            </>
        )
    }
