import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
export const Marvel = () => {
    const { id } = useParams();
    const [allItems, setItem] = useState()
    useEffect(() => {
        const fetch = async () => {
            const res = await axios.get(`https://gateway.marvel.com:443/v1/public/characters/${id}?ts=1&apikey=9410888bec125d11c09be9b3037e4524&hash=60935f7b6e667cce8caedde91c7afe95`)
            setItem(res.data.data.results);
        }
        fetch();
    },
        [])
    return (
        <>
            {
                (allItems) ? (
                    allItems.map(character => {
                        return (
                            <div id="character_details" className="card" key={character.id}>
                                <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt="" />
                                <div id='character_detail_name' className="title">
                                    <h3>{character.name}</h3>
                                </div>
                                <div id='character_detail_info'>
                                Comics:
                                {
                                    character?.comics?.items.map(item => {

                                        return <>
                                            <li>
                                                {item.name}<br></br>
                                            </li>
                                        </>
                                    }
                                    )
                                }
                                Series:
                                {
                                    character?.series?.items.map(item => {
                                        return <>
                                            <li>
                                                {item.name}<br></br>
                                            </li>
                                        </>
                                    }
                                    )
                                }
                                </div>
                            </div>
                        )
                    })
                )
                    : ""
            }
        </>
    )
}