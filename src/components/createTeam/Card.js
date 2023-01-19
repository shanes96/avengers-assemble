import React, { useState, } from 'react'
import { useNavigate} from 'react-router-dom'
import "./CreateTeam.css"
import { addCharacter } from '../managers/AuthManager'
import { addTeam } from '../managers/AuthManager'
import { addCharacterTeam } from '../managers/AuthManager'


export const Card = ({ data }) => {
    const [team, setTeam] = useState({ team_name: "" });
    const [characterArray, setCharacterArray] = useState([]);
    const navigate = useNavigate()
    const handleTeamChange = (event) => {
        const copy = { ...team };
        copy[event.target.id] = event.target.value;
        setTeam(copy);
    };

    const handleCharacterInfo = (teamId) => {
        characterArray.forEach((chosenCharacter) => {
            const characterAPI = {
                team: teamId,
                character: chosenCharacter.id,
            };
            addCharacterTeam(characterAPI);
        });
    };

    const handleCharacterSelection = (characterId, characterName, characterPicture, characterExtension) => {
        const newCharacter = {
            character_id: characterId,
            character_name: characterName,
            character_picture: characterPicture,
            character_extension: characterExtension,
        };
        addCharacter(newCharacter).then((parsedResponse) => {
            setCharacterArray((array) => [...array, parsedResponse]);
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        addTeam(team)
            .then((parsedResponse) => handleCharacterInfo(parsedResponse.id))
            .then(() => navigate("/profile"));
    };

    return (
        <>
            <div id="team_name_field" class="field">
                <input
                    class="form-control"
                    type="text"
                    id="team_name"
                    required
                    autoFocus
                    placeholder="Type Your Team Name Here"
                    value={team.team_name}
                    onChange={handleTeamChange}
                />
            </div>
            {data ? (
                data.map((item) => (
                    <div className="card" key={item.id}>
                        <img id="create_character_picture" src={`${item.thumbnail.path}.${item.thumbnail.extension}`} alt="" />
                        <div className="title">
                            <h3>{item.name}</h3>
                        </div>
                        <div className="checkbox-container">
                            <input
                                type="checkbox"
                                className="addTags"
                                value={false}
                                onChange={() =>
                                    handleCharacterSelection(
                                        item.id,
                                        item.name,
                                        item.thumbnail.path,
                                        item.thumbnail.extension
                                    )
                                }
                            />
                            <label>Add Character To Team</label>
                        </div>
                        <button class="btn btn-dark" onClick={() => navigate(`/${item.id}/characterInfo`)}>
                            Learn More
                        </button>
                    </div>
                ))
            ) : (
                ""
            )}
            <button id="submit_team_button" class="btn btn-light" type="submit" onClick={handleSubmit}>
                Submit Team!
            </button>
        </>
    )
}
