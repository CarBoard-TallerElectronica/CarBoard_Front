import { StatusBar } from 'expo-status-bar';
import ImageViewer from './components/ImageViewer';
import { StyleSheet, View, Pressable, Text } from 'react-native';

const PlaceholderImage = require('./assets/carboard.png');

export default function Principal({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer placeholderImageSource={PlaceholderImage} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
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
  marginVertical: 20,
  },
  button: {
    backgroundColor: 'black',
    borderWidth: 4,
    borderColor: 'white',
    borderRadius: 60,
    paddingHorizontal: 8,
    paddingVertical: 6,

  },
  buttonLabel: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
