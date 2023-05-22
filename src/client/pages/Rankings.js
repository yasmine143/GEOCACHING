import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Rankings = () => {
  return (
    <View style={styles.container}>
      <Text>No rankings available</Text>
    </View>
  );
};

export default Rankings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});