import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { addComicToCart, addComicToUserCart } from '../managers/CartManager';
export const ComicsDetails = () => {
    const { id } = useParams();
    const [allItems, setItem] = useState()
    useEffect(() => {
        const fetch = async () => {
            const res = await axios.get(`https://gateway.marvel.com:443/v1/public/comics/${id}?ts=1&apikey=9410888bec125d11c09be9b3037e4524&hash=60935f7b6e667cce8caedde91c7afe95`)
            setItem(res.data.data.results);
            console.log(res.data.data.results);

        }
        fetch();
    },
        [])
    return (
        <>
            {
                (allItems) ? (
                    allItems.map(comic => {
                        return (
                            <div id='comic_cover_details' className="card" key={comic.id} style={{ border: '0' }}>
                                <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt="" />
                                <div id='comic_detail_title' className="title">
                                    <h3>{comic.title}</h3>
                                </div>
                                <button type="button"
                                id="team_one_button" 
                                class="btn btn-dark"
                                onClick={addComicToUserCart()}
                                >
                                    Add To Cart</button>
                                <div id="creators">Creators:</div>
                                {
                                    comic?.creators?.items.map(item => {

                                        return <>
                                            <li id='creators'>
                                                {item.name} | {item.role}<br></br>
                                            </li>
                                        </>
                                    }
                                    )
                                }
                            </div>
                        )
                    })
                )
                    : ""
            }
        </>
    )
}