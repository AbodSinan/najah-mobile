import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';

import { TextInput, Button } from 'react-native-paper';

import * as selectors from '../../sagas/selectors';
import api from '../../services/api/Api';



const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const userType = useSelector(selectors.getUserType)

  const dispatch = useDispatch()

  const onHandleRegister = () => {
    dispatch(api.register.createAction({
      email, password, password2, firstName, lastName, userType,
    }))
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create new account</Text>
      <TextInput
        style={styles.input}
        placeholder='Enter email'
        autoCapitalize='none'
        keyboardType='email-address'
        textContentType='emailAddress'
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder='Enter password'
        autoCorrect={false}
        secureTextEntry={true}
        textContentType='password'
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder='Confirm password'
        autoCorrect={false}
        secureTextEntry={true}
        textContentType='password'
        value={password2}
        onChangeText={text => setPassword2(text)}
      />
      <TextInput
        style={styles.input}
        placeholder='Enter first name'
        textContentType='name'
        value={firstName}
        onChangeText={text => setFirstName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder='Enter last name'
        textContentType='familyname'
        value={lastName}
        onChangeText={text => setLastName(text)}
      />
      <Button onPress={onHandleRegister} color='#f57c00' title='Signup' mode="contained" >
        Signup
      </Button>
      <Button
        onPress={() => navigation.navigate('Login')}
        title='Go to Login'
        mode="contained"
      >
        Go to Login
      </Button>
    </View>
  );
}

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 12
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#444',
    alignSelf: 'center',
    paddingBottom: 24
  },
  input: {
    backgroundColor: '#fff',
    marginBottom: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
  }
});