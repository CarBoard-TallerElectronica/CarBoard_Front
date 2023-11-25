import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet,  Animated  } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import Init from './Init';
import Principal from './Principal';

const Stack = createStackNavigator();
const Logo = require('./assets/onlylogo.png');

export default function App() {
  return (
    
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name = "Init" component={Init} options={{headerShown: false}}/>
      <Stack.Screen name= "Principal" components={Principal} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});
