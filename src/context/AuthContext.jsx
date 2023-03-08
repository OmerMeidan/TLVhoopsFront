import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState('');
  const [PremiumGamesArr,setPremiumGamesArr] = useState([])
  const [CommunityGamesArr,setCommunityGamesArr] = useState([])
  return (
    <AuthContext.Provider value={{ token, setToken,PremiumGamesArr,setPremiumGamesArr,CommunityGamesArr,setCommunityGamesArr }}>
      {children}
    </AuthContext.Provider>
  )
};
