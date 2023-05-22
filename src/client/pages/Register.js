
import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, View, TouchableOpacity, ImageBackground } from 'react-native';

import { useNavigation } from '@react-navigation/native';

const Register = () => {
  const [pseudo, setPseudo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  async function register() {
      
    
      const response = await fetch('http://192.168.47.28:1337/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pseudo,
          email,
          password,
        }),
      });

      const received = await response.json();
      if (received.status=='ok') {
        //localStorage.setItem('token', received.user)
        alert('Welcome to the adventure ! Login to start Geocashing with us')
        navigation.navigate('Login'); 
      } else {
        alert('Email already used')
       }

      
    
     
    
  }

  return (
    <ImageBackground
      source={require('./4ab1fd092d40f42a9ddfd91b1589603d~2.jpg')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.inputContainer}>
          <TextInput
            value={pseudo}
            onChangeText={text => setPseudo(text)}
            placeholder="Pseudo"
            style={styles.input}
            placeholderTextColor="#FFFFFF"
          />
          <TextInput
            value={email}
            onChangeText={text => setEmail(text)}
            keyboardType="email-address"
            placeholder="Email"
            style={styles.input}
            placeholderTextColor="#FFFFFF"
          />
          <TextInput
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry
            placeholder="Password"
            style={styles.input}
            placeholderTextColor="#FFFFFF"
          />
        </View>

        <TouchableOpacity onPress={register} style={styles.button}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default Register;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'contain',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '65%',
  },
  input: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    marginBottom: 15,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    color: 'white',
  },
  button: {
    backgroundColor: 'black',
    borderRadius: 50,
    padding: 10,
    width: '65%',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
