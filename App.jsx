import { NavigationContainer } from "@react-navigation/native";
import React from "react";

import { AuthProvider } from "./src/context/AuthContext";
import AppNav from "./src/Navigation/AppNav";
import AppStack from "./src/Navigation/AppStack";
import AuthStack from "./src/Navigation/AuthStack";


const App = () => {
  return (
    <AuthProvider>
      <AppNav />
    </AuthProvider>



  );
};

export default App;
