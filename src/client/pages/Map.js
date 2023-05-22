import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker, Circle } from 'react-native-maps';
import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity, ScrollView } from 'react-native';
import AddCashe from './AddCashe';
import Rankings from './Rankings';
import CustomDrawer from './CustomDrawer';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios'; // Import Axios for HTTP requests
import * as Location from 'expo-location';
import { Modal } from 'react-native';
const Drawer = createDrawerNavigator();

const UserInfo = ({ user }) => {
  return (
    <View style={styles.userInfo}>
      <Text style={styles.userInfoText}>User: {user.pseudo}</Text>
      <Text style={styles.userInfoText}>Email: {user.email}</Text>
    </View>
  );
};

const MapScreen = () => {
  const [initialRegion, setInitialRegion] = useState(null);
  const [user, setUser] = useState(null);
  const [caches, setCaches] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedCache, setSelectedCache] = useState(null); 
  const navigation = useNavigation();

  useEffect(() => {
    const fetchToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const decodedToken = jwt_decode(token);
        setUser(decodedToken);
      }
    };

    fetchToken();
  }, []);

  useEffect(() => {
    const fetchCaches = async () => {
      try {
        const response = await axios.get('http://192.168.47.28:1337/api/caches');
        setCaches(response.data.caches);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCaches();
  }, []);

  useEffect(() => {
    const fetchUserLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setUserLocation({ latitude, longitude });
      setInitialRegion({
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    };

    fetchUserLocation();
  }, []);

  const handleAddCache = () => {
    navigation.navigate('Add a Cache');
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const earthRadius = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;
    return distance;
  };

  const toRad = (value) => {
    return (value * Math.PI) / 180;
  };

  const filteredCaches = caches.filter((cache) => {
    if (userLocation) {
      const distance = calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        cache.latitude,
        cache.longitude
      );
      return distance <= 2;
    }
    return false;
  });


  const handleMarkerPress = (cache) => {
    setSelectedCache(cache);
  };

  // Function to close the cache info modal
  const handleCloseModal = () => {
    setSelectedCache(null);
  };

  return (
    <View style={styles.container}>
      {initialRegion && (
        <MapView style={styles.map} initialRegion={initialRegion}>
          {userLocation && (
            <>
              <Circle
                center={userLocation}
                radius={2000}
                strokeColor="rgba(0, 122, 255, 0.3)"
                fillColor="rgba(0, 122, 255, 0.1)"
              />
              <Marker coordinate={userLocation} pinColor="blue" />
            </>
          )}
          {filteredCaches.map((cache, index) => (
           <Marker
           key={index}
           coordinate={{ latitude: cache.latitude, longitude: cache.longitude }}
           onPress={() => handleMarkerPress(cache)} // Handle marker press
         />
          ))}
        </MapView>
        
      )}

      <Modal visible={selectedCache !== null} animationType="slide">
        <View style={styles.modalContainer}>
          {selectedCache && (
            <ScrollView contentContainerStyle={styles.modalContentContainer}>
              <Text style={styles.cacheInfoTitle}>Cache Info: </Text>
              <Text style={styles.cacheInfoText}>Latitude: {selectedCache.latitude}</Text>
              <Text style={styles.cacheInfoText}>Longitude: {selectedCache.longitude}</Text>
              <Text style={styles.cacheInfoText}>Difficulty: {selectedCache.difficulty}</Text>
              <Text style={styles.cacheInfoText}>Description: {selectedCache.description}</Text>
            </ScrollView>
          )}
          <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {user && <UserInfo user={user} />}
      <TouchableOpacity style={styles.addButton} onPress={handleAddCache}>
        <Icon name="plus" color="white" style={styles.addButtonText} />
      </TouchableOpacity>
    </View>
  );
};




const DrawerNavigator = () => {
  
  const [user, setUser] = useState(null);
  const navigation = useNavigation(); // Get the navigation object

  useEffect(() => {
    // Fetch the token from AsyncStorage
    const fetchToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const decodedToken = jwt_decode(token);
        setUser(decodedToken); // Set the user information in the state
      }
    };

    fetchToken();
  }, []);

  return (
    <Drawer.Navigator  drawerContent={props => <CustomDrawer user={user} {...props}/>}  screenOptions={{drawerLabelStyle:{marginLeft: -5}, drawerActiveBackgroundColor:'#F6E9C8', drawerActiveTintColor:'#9D8A68'}}>
      <Drawer.Screen
        name="Map"
        component={MapScreen}
        options={{
          drawerIcon: ({ color }) => (
          <Icon name="map" size={20} color={color} />
          ),
        }}
      />
       <Drawer.Screen
        name="Add a Cache"
        component={AddCashe}
        options={{
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="plus"
              size={20}
              color={color} 
            />
          ),
        }}
      />
      
      <Drawer.Screen
        name="Rankings"
        component={Rankings}
        options={{
          drawerIcon: ({ color }) => (
          <MaterialIcon name="leaderboard" size={20} color={color} />
        ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  userInfo: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    borderRadius: 10,
  },
  userInfoText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
 
  drawerButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    borderRadius: 10,
    color: 'white',
  },
  addButton: {
    position: 'absolute',
    bottom: 40,
    right: 35,
    backgroundColor: 'black',
    borderRadius: 50,
    padding: 12,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 22,
    
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContentContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    maxWidth: '80%',
    marginTop: 100,
  },
  cacheInfoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cacheInfoText: {
    fontSize: 16,
    marginBottom: 5,
  },
  closeButton: {
    backgroundColor: 'black',
    borderRadius: 50, // make borders circular
    padding: 10,
    width: '35%',
    alignItems: 'center',
    marginBottom: 100,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  // ...

});
