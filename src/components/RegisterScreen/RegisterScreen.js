import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View } from "react-native";

import {
  ActivityIndicator,
  TextInput,
  Button,
  Title,
  HelperText,
} from "react-native-paper";

import api from "../../services/api/Api";
import { getRegisterStatus, getRegisterErrors } from "../../sagas/selectors";

import apiStatusEnum from "../../enums/apiStatusEnum";
import styles from "../../styles";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const registerStatus = useSelector(getRegisterStatus);
  const registerErrors = useSelector(getRegisterErrors);
  const shownError = registerErrors[0] && registerErrors[0].error;

  const dispatch = useDispatch();

  const onHandleRegister = () => {
    dispatch(
      api.register.createAction({
        email,
        password,
        password2,
      })
    );
  };

  useEffect(() => {
    if (registerStatus === apiStatusEnum.SUCCESS) {
      navigation.navigate("Create Profile");
      setIsLoading(false);
    }

    if (
      [apiStatusEnum.AWAITING, apiStatusEnum.REQUESTED].includes(registerStatus)
    ) {
      setIsLoading(true);
    }

    if (registerStatus === apiStatusEnum.ERROR) {
      setIsLoading(false);
    }
  }, [registerStatus]);

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

      {shownError?.email?.map((emailError) => (
        <HelperText type="error">{emailError}</HelperText>
      ))}
      <TextInput
        style={styles.input}
        placeholder="Enter password"
        autoCorrect={false}
        secureTextEntry={true}
        textContentType="password"
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      {shownError?.password?.map((passwordError) => (
        <HelperText type="error">{passwordError}</HelperText>
      ))}
      <TextInput
        style={styles.input}
        placeholder="Confirm password"
        autoCorrect={false}
        secureTextEntry={true}
        textContentType="password"
        value={password2}
        onChangeText={(text) => setPassword2(text)}
      />
      {shownError?.password2?.map((passwordError) => (
        <HelperText type="error">{passwordError}</HelperText>
      ))}
      <Button
        onPress={onHandleRegister}
        color="#f57c00"
        title="Signup"
        mode="contained"
        disabled={isLoading}
      >
        Signup
      </Button>
      <Button
        onPress={() => navigation.navigate("Login")}
        title="Go to Login"
        mode="contained"
        disabled={isLoading}
      >
        Go to Login
      </Button>
      {registerErrors.map((error) => (
        <HelperText type="error">{error.message}</HelperText>
      ))}
      {isLoading && <ActivityIndicator size="large" />}
    </View>
  );
};

export default RegisterScreen;
