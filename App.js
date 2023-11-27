import React, { useState, useEffect }from 'react';
import * as Location from 'expo-location'
import { StyleSheet, View, Pressable, Text,  TextInput, Image, Easing } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ImageViewer from './components/ImageViewer';
import MapView, {Marker} from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import Dialog from "react-native-dialog";
import DialogInput from 'react-native-dialog/lib/Input';


export let ESP32IP = 'http://192.168.1.1';

const PlaceholderImage = require('./assets/carboard.png');

const dir = 'https://carboard.lat/nodos/reg/'
const dirfetch = 'https://carboard.lat/measurement/nodo/30/latest'



function Init({ navigation }) {

  
  const [ssid, setSSID] = useState('');
  const [password, setPassword] = useState('');
  const [isDialogVisible, setDialogVisible] = useState(false);

  const handleOKIP = () =>{
    setDialogVisible(false);
  }

  const setwifi = () =>{
    setDialogVisible(true);
  }

  const handleSubmit = async () => {
    // Validate WiFi info if needed
    if (ssid && password) {
      try {
        const response = await fetch('http://192.168.1.1/wifi-info', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ ssid, password }),
        });

        if (response.ok) {
          console.log('WiFi info sent successfully');
        } else {
          console.error('Failed to send WiFi info');
        }
      } catch (error) {
        console.error('Error sending WiFi info', error);
      }

      handleOKIP();
    } else {
      // Handle validation error
      alert('Please enter both SSID and password.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer placeholderImageSource={PlaceholderImage} />
      </View>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={() => navigation.navigate('LogIn')}>
        <Text style={styles.buttonLabel}>Ingresar</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={setwifi}>
        <Text style={styles.buttonLabel}>Configurar</Text>
        </Pressable>

          <Dialog.Container visible = {isDialogVisible}>
          <Dialog.Title style = {{alignSelf: 'center'}}>Datos Wifi</Dialog.Title>
          <View>
          <Dialog.Description style = {{alignSelf: 'center'}}>
              Ingrese el nombre de su red
            </Dialog.Description>
          <DialogInput style={{color:'black'}} value={ssid} onChangeText={(text) => setSSID(text)}></DialogInput>
          </View>
          <View>
          <Dialog.Description style = {{alignSelf: 'center'}}>
              Ingrese la contraseña de su red
            </Dialog.Description>
          <DialogInput style={{color:'black'}} value={password} onChangeText={(text) => setPassword(text)}></DialogInput>
            <Dialog.Button label="OK" onPress={handleSubmit}/>
            </View>
        </Dialog.Container>

      </View>
    </View>
  );
}

function LogIn({ navigation }) {

  const [usuario, setUsuario] = useState('');
  const [modelo, setModelo] = useState('');
  const [anio, setAnio] = useState('');
  const [responseText, setResponseText] = useState(null);


  const signUp = async () => {
    try {
      const response = await fetch(dir, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usuario:usuario,
          modelo: modelo,
          anio: anio,
        }),
      });

      if (!response.ok) {
        throw new Error('No se recibe respuesta del servidor');
      }

      if (response.ok) {
        navigation.navigate('Principal');
      }
    } catch (error) {
      setResponseText('Error: ' + error.message);
    }
  };

  return (
    <SafeAreaView style = {{flex:1,  backgroundColor:'black'}}>
    <View style = {{paddingBottom:100}}>
    <Text style = {styles.titles}>
      Crea tu Usuario
    </Text>
    </View>
    <View style = {styles.InputContainer}>
      <Text style = {styles.description}>
        Usuario
      </Text>
      <View style = {styles.textinput}>
      <TextInput style = {styles.textBox}
        value={usuario}
        onChangeText={(text) => setUsuario(text)}
      />
      </View>

      <Text style = {styles.description}>
        Modelo del vehículo
      </Text>
      <View style = {styles.textinput}>
      <TextInput style = {styles.textBox}
        value={modelo}
        onChangeText={(text) => setModelo(text)}
      />
      </View>

      <Text style = {styles.description}>
        Año del Vehículo
      </Text>
      <View style = {styles.textinput}>
      <TextInput style = {styles.textBox}
        value={anio}
        onChangeText={(text) => setAnio(text)}
      />
      </View>

      <View style={{flexDirection: 'row', flexWrap: 'wrap',justifyContent: 'center',alignItems: 'center', width: '100%',position: 'relative', 
      top: 30, }}>
        <Pressable style={styles.button} onPress={signUp}>
        <Text style={styles.buttonLabel}>Registrarse</Text>
        </Pressable>
      </View>
      </View>
      {responseText && <Text>{responseText}</Text>}
    </SafeAreaView>
  );
};

function Principal({ navigation }) {
  /*
  const [initialRegion, setInitialRegion] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(dirfetch);
  
        if (!response.ok) {
          throw new Error('La respuesta no es exitosa');
        }
        const result = await response.json();
        setData(result[0]['fields']);
        setInitialRegion({
          latitude: result[0]['fields']['latitud'] * 10e-8,
          longitude: result[0]['fields']['longitud'] * 10e-8,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        });
        setLoading(false);
      } catch (error) {

        setError(error);
        setLoading(false);
      }
    };
  
    const interval = setInterval(() => {
      fetchData();
    }, 4000); // 4 seconds
  
    return () => clearInterval(interval);
  }, []); 

    if (loading) {
      return <Text>Loading...</Text>;
    }

    if (error) {
      return <Text>Error: {error.message}</Text>;
    }
    */
  return (
    <View style={{ flex: 1, justifyContent: 'right', alignItems: 'right' }}>

      <View style = {{height:'73%'}}>
      <MapView style={styles.map} initialRegion={{latitude: 4.60971,
          longitude: -74.08175,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,}}>
          <Marker 
            coordinate={{
              latitude: 4.60971,
              longitude: -74.08175,
            }}
            title="Posición actual"
          />
          
      </MapView>
      </View>

      <View style = {styles.InputContainer}>
        <View style = {{width:"180%"}}>
          <Text style = {styles.description}> Velocidad actual: 130 km/h</Text>
          <Text style = {styles.description}> Aceleración actual: 120 m/s^2 </Text>
          <Text style = {styles.description}> ID del nodo: 30</Text>
        </View>

        <View style = {{flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            width: '150%',
            position: 'relative',
            top: 20, }}>
        <Pressable style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonLabel}> Volver </Text>
        </Pressable>
        </View>

      </View>
    </View>
  );
}

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator screenOptions={{
      gestureEnabled: true,
      gestureDirection:'horizontal',
    }}>
      <Stack.Screen
        name="Principal"
        component={Principal}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Init"
        component={Init}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LogIn"
        component={LogIn}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  textinput:{
    height: 55,
    borderColor: 'black',
    borderWidth: 2.5,
    borderRadius: 20,
    alignContent: 'center',
    width:"170%",
    alignSelf: 'center',
    paddingBottom:10,
  },
  textBox:{
    width: '100%', alignSelf: 'center', textAlign: 'center', fontSize: 20, color: 'black', height:"100%"
  },
  InputContainer: {
    flex: 2,
    backgroundColor: '#f8f8ff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    padding: 95,
    borderTopLeftRadius:40,
    borderTopRightRadius:40,
    width: '100%',
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#f8f8ff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 100,
    width: '100%',
    alignSelf: 'center',
  },
  titles: {
    fontSize: 45,
    color: 'white',
    fontWeight: 'bold',
    paddingVertical: 12,
    alignSelf: 'center',
    paddingTop: 150,
  },
  imageContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingTop: 40,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    position: 'relative',
    top: -150, 

  },
  button: {
    backgroundColor: 'black',
    borderWidth: 4,
    borderColor: 'white',
    borderRadius: 60,
    paddingHorizontal: 8,
    width: "100%",
    paddingVertical: 8,
  },
  buttonLabel: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    
  },
  map: {
    width:'100%',
    height:'100%'
  },
  description: {
      fontSize: 20,
      color: 'black',
      paddingTop: 10,
      alignSelf: 'center',
      fontWeight: 'bold',
  },
});

