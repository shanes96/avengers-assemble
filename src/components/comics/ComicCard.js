import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./Comics.css"
import { addComic } from '../managers/ComicManager'
import { addComicForUser } from '../managers/ComicManager'

export const ComicCard = ({ data }) => {
    console.log(data)
    let navigate = useNavigate();
    const comicInfo = (parsedResponse) => {
        const ComicAPI = {
            comic: parsedResponse.id,
        }
        addComicForUser(ComicAPI)
    }

    return (
        <>
            {
                (data) ? (
                    data.map(item => {
                        return (
                            <div id="comic_card" className="card" key={item.id}>
                                <img id='comic_cover' src={`${item.thumbnail.path}.${item.thumbnail.extension}`} className="poster" alt="" />
                                <div className="title">
                                    <h3>{item.title}</h3>
                                </div>
                                <div className='card_button_container'>
                                <button
                                id="comic_button"
                                class="btn btn-danger"
                                    type="submit"
                                    onClick={(evt) => {
                                        evt.preventDefault()
                                        const newComic = {
                                            comic_id: item.id,
                                            comic_title: item.title,
                                            comic_picture: item.thumbnail.path,
                                            comic_extension: item.thumbnail.extension
                                        }
                                        addComic(newComic).then(parsedResponse => { comicInfo(parsedResponse) })
                                            .then(() => {
                                                alert("This comic has been added to your favorite comics list on your profile!")
                                                navigate("/profile")
                                            })
                                    }}
                                >
                                    Add Comic to My Favorite Comics List
                                </button>

                                <button id="comic_button"class="btn btn-danger" onClick={() => navigate(`/${item.id}/comicInfo`)}>Learn More</button>
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
