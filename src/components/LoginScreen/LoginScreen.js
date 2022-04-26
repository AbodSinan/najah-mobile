import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Text, View } from "react-native";
import { Button, TextInput, Title } from "react-native-paper";

import api from "../../services/api/Api";
import * as selectors from "../../sagas/selectors";
import styles from "../../styles";

const LoginScreen = ({ navigation }) => {
  const dispatcher = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onHandleLogin = () => {
    dispatcher(api.login.createAction({ email, password }));
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Welcome back!</Title>
      <TextInput
        style={styles.input}
        placeholder="Enter email"
        textContentType="email"
        autoCapitalize="none"
        autoFocus={true}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        mode="outlined"
        style={styles.input}
        placeholder="Enter password"
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={true}
        textContentType="password"
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button mode="contained" onPress={onHandleLogin}>
        Login
      </Button>
      <Button mode="text" onPress={() => navigation.navigate("Register")}>
        Register
      </Button>
    </View>
  );
};
export default LoginScreen;
