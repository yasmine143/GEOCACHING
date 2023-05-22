import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, ImageBackground, KeyboardAvoidingView, TouchableOpacity, Text } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const AddCache = () => {
  const [cacheData, setCacheData] = useState({
   
    latitude: '',
    longitude: '',
    difficulty: '',
    description: '',
  });
   const navigation = useNavigation();
   
   const handleSubmit = async () => {
      
      try {
        const response = await axios.post('http://192.168.47.28:1337/api/caches', cacheData);
        console.log(response.data);
        alert('Successfully added the cache')
        navigation.navigate('Map'); 
    
      } catch (error) {
        
        alert('Please enter valid values')
         
      }
   
     
    
    };




  const handleChange = (attribute, value) => {
    setCacheData(prevData => ({
      ...prevData,
      [attribute]: value,
    }));
  };

  return (
    <ImageBackground
      source={require('./4ab1fd092d40f42a9ddfd91b1589603d~2.jpg')} // replace with the path to your background image
      style={styles.backgroundImage}
      resizeMode="cover" // adjust the resizeMode property to 'cover'
    >
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.inputContainer}>
          
          <TextInput
            style={styles.input}
            placeholder="Latitude"
            value={cacheData.latitude}
            onChangeText={value => handleChange('latitude', value)}
            placeholderTextColor="#FFFFFF" // set a semi-transparent placeholder text color
          />
          <TextInput
            style={styles.input}
            placeholder="Longitude"
            value={cacheData.longitude}
            onChangeText={value => handleChange('longitude', value)}
            placeholderTextColor="#FFFFFF" // set a semi-transparent placeholder text color
          />
          
          <TextInput
            style={styles.input}
            placeholder="Difficulty"
            value={cacheData.difficulty}
            onChangeText={value => handleChange('difficulty', value)}
            placeholderTextColor="#FFFFFF" // set a semi-transparent placeholder text color
          />
          <TextInput
            style={styles.descriptionInput}
            placeholder="   Description"
            value={cacheData.description}
            onChangeText={value => handleChange('description', value)}
            placeholderTextColor="#FFFFFF" // set a semi-transparent placeholder text color
            multiline
          />
        </View>
        <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
        

      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

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
    width: '80%', // adjust width as desired
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
  descriptionInput: {
    height: 80,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.5)', // set a semi-transparent border color
    padding: 10,
    marginBottom: 15,
    borderRadius: 50, // make borders circular
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // set a semi-transparent background color
    color: 'white', // set the text color to white for better visibility
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: 'black',
    borderRadius: 50, // make borders circular
    padding: 10,
    width: '65%',
    alignItems: 'center',
    marginBottom: 10,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddCache;
