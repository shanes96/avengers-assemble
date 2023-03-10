import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { Typeahead } from 'react-bootstrap-typeahead';
import "./Navbar.css"
import { getSpecificUserInfo } from "../managers/AuthManager";
export const NavBar = () => {
    const navigate = useNavigate()
    const [selectedOption, setSelectedOption] = useState('');
    const [options, setOptions] = useState([]);
    const [specificUsers, setSpecificUsers] = useState([]);
    const avengerUser = localStorage.getItem("user");
    const avengerUserObject = JSON.parse(avengerUser);

    useEffect(() => {
        async function fetchData() {
            const response = await getSpecificUserInfo(avengerUser);
            setSpecificUsers(response);
        }
        if (avengerUser) {
            fetchData();
        }
    }, [avengerUser]);



    useEffect(() => {
        async function fetchData(searchQuery) {
            const response = await fetch(
                `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${searchQuery}&apikey=9410888bec125d11c09be9b3037e4524&hash=60935f7b6e667cce8caedde91c7afe95=${process.env.REACT_APP_MARVEL_API_KEY}`
            );
            const data = await response.json();
            setOptions(data.data.results.map((character) => ({ name: character.name })));
        }
        if (selectedOption) {
            fetchData(selectedOption);
        }
    }, [selectedOption]);

    const handleSearch = (selectedOptions) => {
        if (selectedOptions.length > 0) {
            const query = selectedOptions[0].name;
            navigate(`/characterProfile?query=${query}`, {
                search: `?query=${query}`
            });
        }
    }
    return (
        <nav id="nav" class="navbar navbar-expand-lg bg-body-tertiary">
            {
                (localStorage.getItem("aa_token") !== null) ? <>
                    <div class="container-fluid">
                        <Typeahead
                            id="nav-search"
                            labelKey="name"
                            minLength={0}
                            options={options}
                            placeholder="Search Character"
                            onChange={(selectedOptions) => handleSearch(selectedOptions)}
                            onInputChange={(selectedOption) => setSelectedOption(selectedOption)} />
                        <div class="float-right">
                            <img src="https://png.pngitem.com/pimgs/s/523-5230756_spiderman-marvel-comics-png-transparent-png.png" alt="Spider-Man" id="spiderman-img" />
                        </div>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul id="content_nav_bar" class="navbar-nav me-auto mb-2 mb-lg-0 justify-content-between">
                                <li id="battle_nav" class="nav-item">
                                    <a class="nav-link active" aria-current="page" href="/battles">Battles</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link active" aria-current="page" href="/comics">Comics</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link active" aria-current="page" href="/movies">Movies</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link active" aria-current="page" href="/shoppingcart">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
                                            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                        </svg>
                                    </a>
                                </li>


                            </ul>
                        </div>
                        {
                            Array.isArray(specificUsers) && specificUsers.map((specificUser) => {
                                return (
                                    <section key={`user--${specificUser.id}`}>
                                        <li id="profile_pic_nav_bar" class="nav-item dropdown">
                                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <img id="profile_picture" src={specificUser?.profile_image} class="rounded-circle" />
                                            </a>
                                            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                                <a class="dropdown-item rounded" href="/profile">Your Profile</a>
                                                <a class="dropdown-item" onClick={() => {
                                                    localStorage.removeItem("aa_token")
                                                    localStorage.removeItem("user")
                                                    navigate('/login')
                                                }} href="#">Log Out</a>
                                            </div>
                                        </li>
                                    </section>
                                )
                            })
                        }

                    </div>
                </>
                    :
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                    </>
            }
        </nav>
    )
}
