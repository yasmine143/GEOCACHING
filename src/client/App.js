import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './pages/Login';
import Register from './pages/Register';
import Map from './pages/Map';
import AddCashe from './pages/AddCashe';
import CustomDrawer from './pages/CustomDrawer';
const Stack = createNativeStackNavigator();

export default function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
         <Stack.Screen options={{headerShown: false}} name="Login"  component={Login} />
         <Stack.Screen options={{headerShown: false}} name="Register" component={Register} />
         <Stack.Screen options={{headerShown: false}} name="AddCashe" component={AddCashe} />
         <Stack.Screen options={{headerShown: false}} name="CustomDrawer" component={CustomDrawer} />
         <Stack.Screen options={{headerShown: false}} name="Map" component={Map} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
