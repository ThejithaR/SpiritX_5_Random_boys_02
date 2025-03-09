// import React , { useEffect, useState ,useContext } from 'react'
// import axios from 'axios'
// import { AppContext } from "../context/AppContext";
  

// const PlayerStat = () => {
//     const {backendUrl} = useContext(AppContext);
//     const [players, setPlayers] = useState([])

//     useEffect(() => {
//         getPlayers();

//         // console.log(players);

//     }, [])

//     const getPlayers = async () => {
//         const { data } = await axios.get(backendUrl + "/api/player/get-players");
//         setPlayers(data.players);
//     }

//     const [file, setFile] = useState(null)

//     const handleFileChange = (e) => {
//         const file = e.target.files[0];
//         const reader = new FileReader();
//         reader.readAsDataURL(file);
//         reader.onloadend = () => {
//             setFile(reader.result); // Base64 string
//             // setPreview(reader.result); // Preview image
//             console.log(reader.result);
//         };
//         // console.log(file);
//     }

//     return (
//         <>
//             <div>
//                 <h1>{JSON.stringify(players[10])}</h1>
//                 {/* <img src={players[10].profileImage} alt="" /> */}
//                 <img src={players[10].profileImage} alt="" />
//             </div>
//         </>
//     )
// }

// export default PlayerStat

import React, { useEffect , useState ,useContext } from 'react'
import { useParams } from 'react-router-dom'
import PlayerStatCard from '../components/PlayerStatCard'
import axios from 'axios'
import { AppContext } from "../context/AppContext";

//Meece input widihata player object eca ganna oni
const PlayerStat = () => {

    const {backendUrl} = useContext(AppContext);
    const [player, setPlayer] = useState({})
    const { id } = useParams();

    useEffect(() => {
        getPlayer();

    }, [])

    const getPlayer = async () => {
        const { data } = await axios.get(backendUrl + `/api/player/get-player-by-id/${id}`);
        setPlayer(data.player);
        console.log(data.player);
    }

    return (
        <>
            <div className='w-screen h-screen flex items-center justify-center ' >
                <PlayerStatCard player={player} />
                {/* <p>{JSON.stringify(player)}</p> */}
            </div>
        </>
    )
}

export default PlayerStat