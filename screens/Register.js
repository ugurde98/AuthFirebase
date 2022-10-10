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

const Register = () => {
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useAuth();

  const handleRegister = () => {
    console.log("name: ", name);
    console.log("email: ", email);
    console.log("password: ", password);
    setIsLoading(true);
    axios({
      method: "POST",
      url: "https://identitytoolkit.googleapis.com/v1/accounts:signUp",
      params: {
        key: "AIzaSyCw769QXW3kj3YcASXg_SbeyPmi_ywaomI",
      },
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        axios({
          method: "POST",
          url: "https://identitytoolkit.googleapis.com/v1/accounts:update",
          params: {
            key: "AIzaSyCw769QXW3kj3YcASXg_SbeyPmi_ywaomI",
          },
          data: {
            idToken: res.data.idToken,
            displayName: name,
          },
        })
          .then((r) => {
            setUser({...r.data, idToken : res.data.idToken,});
            console.log("update profile res ", r.data);
          })
          .catch((e) => {
            console.log("update Profile error ", e);
          })
          .finally(() => {
            setIsLoading(false);
          });
      })
      .catch((e) => {
        console.warn(e);
        alert(e.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const handleLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView>
      <VStack spacing={6} style={{ padding: 16 }}>
        <Text variant="h6">Register</Text>
        <Text variant="subtitle1">Create an Account</Text>
        <VStack spacing={2}>
          <TextInput
            label="Name"
            variant="outlined"
            value={name}
            onChangeText={setName}
          />
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
            title="Login"
            variant="text"
            compact
            onPress={() => handleLogin()}
          />
          <Button
            title="Register"
            onPress={() => handleRegister()}
            loading={isLoading}
          />
        </HStack>
      </VStack>
    </SafeAreaView>
  );
};

export default Register;
