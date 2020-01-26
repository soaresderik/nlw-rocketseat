import React, {useState, useEffect} from 'react';
import {
  SafeAreaView as View,
  Image,
  StyleSheet,
  AsyncStorage,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import socketio from 'socket.io-client';

import logo from '../assets/logo.png';
import SpotList from '../components/SpotList';

export default function List({navigation}) {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('user').then(user_id => {
      const socket = socketio('http://localhost:3000', {
        query: {user_id},
      });

      socket.on('booking_response', booking => {
        Alert.alert(
          `Sua reserva em ${booking.spot.company} em ${booking.date} foi ${
            booking.approved ? 'APROVADA' : 'REPROVADA'
          }`,
        );
      });
    });
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('techs').then(t => {
      const techsArray = t.split(',').map(tech => tech.trim());

      setTechs(techsArray);
    });
  }, []);

  async function handleLogout() {
    await AsyncStorage.clear();

    navigation.navigate('Login');
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleLogout}>
        <Image style={styles.logo} source={logo} />
      </TouchableOpacity>

      <ScrollView>
        {techs.map(tech => (
          <SpotList key={tech} tech={tech} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  logo: {
    height: 32,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 10,
  },
});
