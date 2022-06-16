import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View } from "react-native";

import { TextInput, Button, Title } from "react-native-paper";

import * as selectors from "../../sagas/selectors";
import api from "../../services/api/Api";
import styles from "../../styles";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const userType = useSelector(selectors.getUserType);

  const dispatch = useDispatch();

  const onHandleRegister = () => {
    dispatch(
      api.register.createAction({
        email,
        password,
        password2,
        firstName,
        lastName,
        userType,
      })
    );
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Create new account</Title>
      <TextInput
        style={styles.input}
        placeholder="Enter email"
        autoCapitalize="none"
        keyboardType="email-address"
        textContentType="emailAddress"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter password"
        autoCorrect={false}
        secureTextEntry={true}
        textContentType="password"
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm password"
        autoCorrect={false}
        secureTextEntry={true}
        textContentType="password"
        value={password2}
        onChangeText={(text) => setPassword2(text)}
      />
      <Button
        onPress={onHandleRegister}
        color="#f57c00"
        title="Signup"
        mode="contained"
      >
        Signup
      </Button>
      <Button
        onPress={() => navigation.navigate("Login")}
        title="Go to Login"
        mode="contained"
      >
        Go to Login
      </Button>
    </View>
  );
};

export default RegisterScreen;
