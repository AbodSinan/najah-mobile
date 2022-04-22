import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as selectors from "../../sagas/selectors";

import api from "../../services/api/Api";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatcher = useDispatch();

  const userToken = useSelector(selectors.getUserToken);

  const onHandleLogin = () => {
    dispatcher(api.login.createAction({ email, password }));
  };

  useEffect(() => {
    if (userToken) {
      navigation.navigate("Main");
    }
  }, []);

  useEffect(() => {
    if (userToken) {
      navigation.navigate("Main");
    }
  }, [userToken]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome back!</Text>
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
        style={styles.input}
        placeholder="Enter password"
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={true}
        textContentType="password"
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button onPress={onHandleLogin} color="#f57c00" title="Login" />
      <Button
        onPress={() => navigation.navigate("Register")}
        title="Go to Signup"
      />
    </View>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#444",
    alignSelf: "center",
    paddingBottom: 24,
  },
  input: {
    backgroundColor: "#fff",
    marginBottom: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 8,
    padding: 12,
  },
});
