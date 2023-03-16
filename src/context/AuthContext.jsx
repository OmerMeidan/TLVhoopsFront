import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState('');
  const [PremiumGamesArr,setPremiumGamesArr] = useState([])
  const [CommunityGamesArr,setCommunityGamesArr] = useState([])
  const [emailToken,setEmailToken]=useState('')
  const [userDetails,setUserDetails] =useState({})
  const [myGames,setMyGames] = useState([])
  const [notificationCount,setNotificationCount]=useState(0)
  const [isRing,setIsRing]=useState(false)
  return (
    <AuthContext.Provider value={{ token, setToken,PremiumGamesArr,setPremiumGamesArr,CommunityGamesArr,setCommunityGamesArr,emailToken,setEmailToken,userDetails,setUserDetails,myGames,setMyGames,notificationCount,setNotificationCount,isRing,setIsRing }}>
      {children}
    </AuthContext.Provider>
  )
};
