import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const CustomDrawer = ({ user, ...props}) => {
  const navigation = useNavigation(); 
  return (
    <View style={{ flex: 1 }}>
        <ImageBackground source={require('./4ab1fd092d40f42a9ddfd91b1589603d~2.jpg')} style={{ padding: 55 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <Image source={require('./724877d7438cd53dbe791b52019c5fe3.jpg')} style={{ height: 75, width: 75, borderRadius: 40, marginRight: 5 }} />
                <Text
                    style={{
                    color: '#fff',
                    fontSize: 18,
                    fontWeight: 'bold',
                    marginTop: 5,
                    marginLeft: 10,
                    }}>
                    {user && user.pseudo}
                </Text>
            </View>
        </ImageBackground>

      <DrawerContentScrollView {...props}>

        <DrawerItemList {...props} />

      </DrawerContentScrollView>
      <View style={{borderTopWidth: 1, borderTopColor:'rgba(128, 128, 128, 0.5)',padding: 20 }}>
        <TouchableOpacity onPress={() => {}} style={{ paddingVertical: 17 }}>
          <View style={{ flexDirection: 'row' }}>
            <Icon name="share-alt" size={22}  style={{color: '#666666', marginRight: 20 }} />
            <Text style={{ fontWeight: 'bold',fontSize: 14, color: '#666666'}}>   Share</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{ paddingVertical: 17 }}>
          <View style={{ flexDirection: 'row' }}>
            <MaterialIcon name="logout" size={22}  style={{color: '#666666', marginRight: 20 }} />
            <Text style={{ fontWeight: 'bold',fontSize: 14, color: '#666666' }}>  Log Out</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
