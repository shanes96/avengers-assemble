import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import "./CreateTeam.css"
import { getSingleTeam, updateTeam, addCharacter, addCharacterToCreatedTeam, deleteCharacterFromCreatedTeam } from '../managers/AuthManager'

export const UpdateFormCard = ({ data }) => {
    const { teamId } = useParams()
    const navigate = useNavigate()
    const [characterArray, setCharacterArray] = useState([]);
    const [displayCharacters, setDisplayCharacters] = useState(false);
    const [team, setNewTeamDetails] = useState({
        team_name: "",
        characters: []
    });
    useEffect(() => {
        getSingleTeam(teamId).then(data => setNewTeamDetails(data))
    }, [teamId])


    const changeTeamState = (domEvent) => {
        const copy = { ...team }
        copy[domEvent.target.id] = domEvent.target.value
        setNewTeamDetails(copy)
    }

    const handleDeleteCharacter = async characterId => {
        await deleteCharacterFromCreatedTeam(characterId);
        setCharacterArray(characterArray.filter(character => character.id !== characterId));
        setNewTeamDetails(newTeam => ({
            ...newTeam,
            characters: newTeam.characters.filter(character => character.id !== characterId)
        }));
    };


    const handleCharacterInfo = (teamId) => {
        characterArray.forEach((chosenCharacter) => {
            const characterAPI = {
                team_id: teamId,
                character_id: chosenCharacter.id,
            };
            addCharacterToCreatedTeam(characterAPI);
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

            // Add the selected character to the `newTeamDetails` state
            setNewTeamDetails(newTeam => ({
                ...newTeam,
                characters: [...newTeam.characters, parsedResponse]
            }));
        });
    };

    return (
        <>
            <button
                id="view_team_button"
                class="btn btn-danger"
                onClick={() => setDisplayCharacters(!displayCharacters)}
            >
                {displayCharacters ? "View All Characters" : "View Current Team"}
            </button>

            {displayCharacters && (
                team?.characters?.map((character) => (
                    <div class="card" key={character.id} >
                        <img id="create_character_picture" src={`${character.character_picture}.${character.character_extension}`} class="card-img-top" alt={character.character_name} />
                        <div class="title">
                            <h5>{character.character_name}</h5>
                        </div>
                        <button
                            id="delete_team_button"
                            class="btn btn-danger"
                            onClick={() => {
                                handleDeleteCharacter(character.id)
                            }}
                        >Delete Character</button>

                    </div>
                ))
            )}

            <div id='team_name_field' class="field">
                <label id='update_team_text' class="label">Team Name</label>
                <div class="">
                    <input
                        class="form-control"
                        type="text"
                        id="team_name"
                        required
                        autoFocus
                        placeholder="Type Your Team Name Here"
                        value={team.team_name}
                        onChange={changeTeamState}
                    />
                </div>
            </div>
            <button
                id="update_team_button"
                class="btn btn-danger"
                type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    updateTeam(team, teamId)
                        .then((parsedResponse) => handleCharacterInfo(teamId, parsedResponse.id))
                        .then(() => navigate("/profile"))
                }}
            >
                Update Team!
            </button>
            {
                !displayCharacters ? (
                    data ? (
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
                    )
                ) : ""
            }

        </>
    )
}