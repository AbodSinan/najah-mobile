import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, HelperText, TextInput, Text } from "react-native-paper";

import api from "../../services/api/Api";
import * as selectors from "../../sagas/selectors";
import styles from "../../styles";
import LoadingContainer from "../LoadingContainer";

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onHandleLogin = () => {
    dispatch(api.login.createAction({ email, password }));
  };

  const { loginStatus } = useSelector(selectors.getUserStatus);
  const loginErrors = useSelector(selectors.getLoginErrors);
  const shownError = loginErrors[0] && loginErrors[0].error;

  return (
    <LoadingContainer apiStatus={loginStatus} containerStyle={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        Welcome back!
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Enter email"
        textContentType="email"
        autoCapitalize="none"
        autoFocus={true}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      {shownError?.email &&
        shownError?.email.map((emailError) => (
          <HelperText type="error">{emailError}</HelperText>
        ))}
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
      {shownError?.password &&
        shownError?.password.map((passwordError) => (
          <HelperText type="error">{passwordError}</HelperText>
        ))}
      {shownError?.message && (
        <HelperText type="error">{shownError.message}</HelperText>
      )}
      <Button mode="contained" onPress={onHandleLogin}>
        Login
      </Button>
      <Button mode="text" onPress={() => navigation.navigate("Register")}>
        Register
      </Button>
    </LoadingContainer>
  );
};
export default LoginScreen;
