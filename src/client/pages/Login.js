import React,{useState} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, View, Button, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation(); // Get the navigation object
   
  const handleRegisterPress = () => {
    console.log('Register button pressed')
    navigation.navigate('Register'); // Navigate to the Register screen
  };

  async function connexion(event) {
    event.preventDefault();
    const response = await fetch('http://192.168.47.28:1337/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const received = await response.json();

    if (received.status=='ok') {
			await AsyncStorage.setItem('token', received.user); 
			
			navigation.navigate('Map'); 
		} else {
			alert('Wrong email or password')
		}

    
  }
  
  return(
  <ImageBackground
    source={require('./4ab1fd092d40f42a9ddfd91b1589603d~2.jpg')} // replace with the path to your background image
    style={styles.backgroundImage}
    resizeMode="cover" // adjust the resizeMode property to 'cover'
  >
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <TextInput
          keyboardType="email-address" // enforce email format
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
          placeholderTextColor="#FFFFFF" // set a semi-transparent placeholder text color
        />
        <TextInput
          secureTextEntry // to hide password characters
          value={password}
          onChangeText={text => setPassword(text)}
          placeholder="Password"
          style={styles.input}
          placeholderTextColor="#FFFFFF" // set a semi-transparent placeholder text color
        />
      </View>

      <TouchableOpacity onPress={connexion} style={styles.button}>
        <Text style={styles.loginbuttonText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.dividerContainer}>
        <View style={styles.dividerLineOne} />
        <Text style={styles.dividerText}>OR</Text>
        <View style={styles.dividerLineTwo} />
      </View>

      <TouchableOpacity onPress={handleRegisterPress} style={styles.registerButton}>
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  </ImageBackground>

 
 )
}

export default Login;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'contain', // adjust the resizeMode property as desired, e.g., 'cover', 'contain', 'stretch'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '65%', // adjust width as desired
  },
  input: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.5)', // set a semi-transparent border color
    padding: 10,
    marginBottom: 15,
    borderRadius: 50, // make borders circular
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // set a semi-transparent background color
    color: 'white', // set the text color to white for better visibility
  },
  button: {
    backgroundColor: 'black',
    borderRadius: 50, // make borders circular
    padding: 10,
    width: '65%',
    alignItems: 'center',
    marginBottom: 10,
  },
  loginbuttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },

  dividerLineOne: {
    flex: 1,
    height: 1,
    backgroundColor: 'white',
    marginHorizontal: 30,
    marginRight: 10,
    marginLeft: 80,

  },

  dividerLineTwo: {
    flex: 1,
    height: 1,
    backgroundColor: 'white',
    marginHorizontal: 30,
    marginLeft: 10,
    marginRight: 80,
  },
  
  dividerText: {
    color: 'white',
    marginHorizontal: 10,
  },
  registerButton: {
    backgroundColor: 'black',
    borderRadius: 50, // make borders circular
    padding: 10,
    width: '65%',
    alignItems: 'center',
    marginBottom: 10,
  },
  registerButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

