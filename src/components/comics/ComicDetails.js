import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { addComicToCart, addComicToUserCart } from '../managers/CartManager';
import { addComic } from '../managers/ComicManager';
export const ComicsDetails = () => {
    const { id } = useParams();
    const [allItems, setItem] = useState()

    const comicInfo = (parsedResponse) => {
        const ComicAPI = {
            comic: parsedResponse.id,
        }
        addComicToUserCart(ComicAPI)
    }

    // add a comic to the database which is happening right now 
    // comic is then added to the existing cart


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
                                <button
                                id='movie_button'
                                class="btn btn-secondary"
                                    type="submit"
                                    onClick={(evt) => {
                                        evt.preventDefault()
                                        const newComic = {
                                            comic_id: comic.id,
                                            comic_title: comic.title,
                                            comic_picture: comic.thumbnail.path,
                                            comic_extension: comic.thumbnail.extension, 
                                            comic_price: 10.00
                                        }
                                        addComic(newComic).then(parsedResponse => { comicInfo(parsedResponse) })
                                            .then(() => {
                                                alert("This comic has been added to your shopping cart!")

                                            })
                                    }}
                                >
                                    Add To Shopping Cart
                                </button>


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