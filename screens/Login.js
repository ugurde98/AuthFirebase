import { SafeAreaView, View } from "react-native";
import React, { useState } from "react";
import {
  TextInput,
  VStack,
  Text,
  HStack,
  Button,
} from "@react-native-material/core";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useAuth } from "../AuthContext";

const Login = () => {
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
      navigation.navigate("Register"); 
  };

  const[user,setUser]=useAuth()

  const handleLogin = () => {
    setIsLoading(true)
    axios({
        method: "POST",
        url: "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword",
        params: {
          key: "[**Firebase-key**]",
        },
        data: {
          email,
          password,
        },
      }).then((res)=>{
        setUser(res.data)
        

      }).catch(e=>{
        console.log('e: ', e);

      }).finally(()=>{
        setIsLoading(false)
      })
      



  };

  return (
    <SafeAreaView>
      <VStack spacing={6} style={{ padding: 16 }}>
        <Text variant="h6">Login</Text>
        
        <VStack spacing={2}>
    
          <TextInput
            label="Email"
            variant="outlined"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            label="Password"
            variant="outlined"
            value={password}
            onChangeText={setPassword}
          />
        </VStack>
        <HStack justify="between">
          <Button
            title="Register Instead"
            onPress={() => handleRegister()}
            variant="text"
            compact
          />
          <Button
            title="Login"
            loading={isLoading}
            
            onPress={() => handleLogin()}
          />
        </HStack>
      </VStack>
    </SafeAreaView>
  );
};

export default Login;
