import { Route, Routes } from "react-router-dom"
import { Authorized } from "./Authorized"
import { Login } from "../auth/Login"
import { UserProfile } from "../Profile/UserProfile"
import { CreateTeamForm } from "../createTeam/CreateTeamForm"
import { Marvel } from "../createTeam/CharacterDetails"
import { UpdateTeamForm } from "../createTeam/UpdateTeamForm"
import { Register } from "../auth/Register"
import { ComicsMainPage } from "../comics/ComicsMainPage"
import { ComicsDetails } from "../comics/ComicDetails"
import { MovieMainPage } from "../movies/MovieMainPage"
import { MovieDetails } from "../movies/MovieDetails"
import { BattlePage } from "../battles/BattlePage"
import { CreateBattleForm } from "../battles/CreateBattleForm"
import { UpdateBattleForm } from "../battles/UpdateBattleForm"
import { CharacterProfilePage } from "../search/SearchCharacter"
import { BattleOpponentProfile } from "../battles/BattleOpponentProfile"
import { ShoppingCart } from "../payments/ShoppingCart"
import { SuccessMessage } from "../payments/SuccessMessage"
export const ApplicationViews = () => {
    
    return <>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Authorized />}>
                <>
                    <Route path="/characterProfile" element={<CharacterProfilePage />} />
                    <Route path="/profile" element={<UserProfile />} />
                    <Route path="/battles" element={<BattlePage />} />
                    <Route path="/success" element={<SuccessMessage />} />
                    <Route path="/characters" element={<CharacterProfilePage/>} />
                    <Route path="/comics" element={<ComicsMainPage />} />
                    <Route path="/movies" element={<MovieMainPage />} />
                    <Route path="/createTeam" element={<CreateTeamForm />} />
                    <Route path="/shoppingcart" element={<ShoppingCart />} />
                    <Route path="/createBattle" element={<CreateBattleForm />} />
                    <Route path='/:id/comicInfo' element={<ComicsDetails/>}/>
                    <Route path='/:id/characterInfo' element={<Marvel/>}/>
                    <Route path='/:id/movieInfo' element={<MovieDetails />} />
                    <Route path='teams/:teamId' element={<UpdateTeamForm />} />
                    <Route path='/battles/:battleId' element={<UpdateBattleForm />} />
                    <Route path='/battles/:opponentId/opponentProfile' element={<BattleOpponentProfile />} />
                </>
            </Route>
        </Routes>
    </>
}