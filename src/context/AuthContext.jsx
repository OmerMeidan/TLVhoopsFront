import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [test, setTest] = useState('Test Value')
  return (
    <AuthContext.Provider>{children}</AuthContext.Provider>
  )
};
