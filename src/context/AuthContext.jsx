import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState('');
  const [PremiumGamesArr,setPremiumGamesArr] = useState([])
  const [CommunityGamesArr,setCommunityGamesArr] = useState([])
  const [emailToken,setEmailToken]=useState('')
  const [userDetails,setUserDetails] =useState({})
  const [myGames,setMyGames] = useState([])
  return (
    <AuthContext.Provider value={{ token, setToken,PremiumGamesArr,setPremiumGamesArr,CommunityGamesArr,setCommunityGamesArr,emailToken,setEmailToken,userDetails,setUserDetails,myGames,setMyGames }}>
      {children}
    </AuthContext.Provider>
  )
};
