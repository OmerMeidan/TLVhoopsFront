import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from '../../context/AuthContext';
import { Text, View } from 'react-native'
import axios from 'axios'
const MyGames = () => {
    const { setToken, token,PremiumGamesArr,setPremiumGamesArr,CommunityGamesArr,setCommunityGamesArr,emailToken,userDetails,setUserDetails,myGames,setMyGames  } = useContext(AuthContext);
    useEffect(()=>{
        const getPlayerGames = async()=>{
            setMyGames([])
            try{
                const response = await axios.post('https://tlv-hoops-server.onrender.com/gameList',{})
                if(response.data){
                    setMyGames(prevState => [...prevState, response.data.filter(game=>(game.participants.find(player=>player._id===userDetails._id)))]);
                }
            }
            catch(error){
                console.log(error)
            }
        }
        getPlayerGames()
    },[])

    console.log('myGames')
console.log(myGames)
    return (
        <View>
            {myGames.map((array,i)=>array.map((a,j)=><Text key={j}>{a.date}</Text>))}
        </View>
    )

}

export default MyGames;
