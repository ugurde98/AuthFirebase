import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Profile from "./screens/Profile";
import AuthProvider, { useAuth } from "./AuthContext";

const Stack = createNativeStackNavigator();

const Navigator = () => {
  const[user]=useAuth()

if (!user) {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}} >
      <Stack.Screen name="Register" component={Register}  />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}

  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};



const App = () => {
  return (
    <NavigationContainer>
    <AuthProvider>
      <Navigator />
    </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
