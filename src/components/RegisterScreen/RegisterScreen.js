import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View } from "react-native";
import { TextInput, Button, HelperText } from "react-native-paper";

import AlignedText from "../AlignedText";
import LoadingContainer from "../LoadingContainer";

import api from "../../services/api/Api";
import { getUserStatus, getRegisterErrors } from "../../sagas/selectors";

import styles from "../../styles";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const { registerStatus } = useSelector(getUserStatus);
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

  return (
    <LoadingContainer
      apiStatus={registerStatus}
      containerStyle={styles.container}
      onSuccess={() => navigation.navigate("Create Profile")}
    >
      <View style={styles.container}>
        <AlignedText variant="headlineMedium" style={styles.title}>
          صنع حساب
        </AlignedText>
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
        <Button onPress={onHandleRegister} title="Signup" mode="contained">
          Signup
        </Button>
        <Button
          onPress={() => navigation.navigate("Login")}
          title="Go to Login"
          mode="text"
        >
          Go to Login
        </Button>
        {registerErrors.map((error) => (
          <HelperText type="error">{error.message}</HelperText>
        ))}
      </View>
    </LoadingContainer>
  );
};

export default RegisterScreen;
