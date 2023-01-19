import React from "react"
import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import { MovieCard } from "./MovieCard"
let API_key = "&=a805a1ce4065c34d4f5f25ecb958aa83";
let base_url = "https://api.themoviedb.org/3";
let searchUrl = base_url + "/discover/movie?sort_by=revenue.desc&api_key=a805a1ce4065c34d4f5f25ecb958aa83&with_companies=420" + API_key;

export const MovieMainPage = () => {
    const [url, setUrl] = useState(`https://api.themoviedb.org/3/discover/movie?api_key=a805a1ce4065c34d4f5f25ecb958aa83&sort_by=popularity.desc&with_companies=420
    `);
    const [item, setItem] = useState();
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetch = async () => {
            const res = await axios.get(`${url}&offset=${(page - 1) * 20}&limit=20`);
            setItem(res.data.results);
            setPage(res.data.page);
        }
        fetch();
    }, [url,page]);

    const searchMovie = () => {
        const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=a805a1ce4065c34d4f5f25ecb958aa83&query=${search}&with_networks=5`;
        setUrl(searchUrl);
        setSearch("");
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
        setUrl(`https://api.themoviedb.org/3/discover/movie?api_key=a805a1ce4065c34d4f5f25ecb958aa83&sort_by=popularity.desc&with_companies=420&page=${newPage}
        `);
        window.scrollTo(0, 0);
    }

    return (
        <>
            <h1 className="page_title">Browse Movies!</h1>
            <h4 className="page_description">Look up all the movies your favorite character!</h4>
                <div className="movie_search_bar">
                    <input type="search" placeholder='Search Here' id="movie_search"
                        class="form-control"
                        onChange={e => setSearch(e.target.value)}
                        onKeyPress={searchMovie}
                    />
                </div>
            <div className="content">
                {
                    (!item) ? <p>Not Found</p> : <MovieCard data={item} />
                }
            </div>

            <div className="page_buttons">
                <button id="prev_button" class="btn btn-light" onClick={() => handlePageChange(page - 1)}>Prev</button>
                <button id="next_button" class="btn btn-light" onClick={() => handlePageChange(page + 1)}>Next</button>
            </div>
        </>
    )
}