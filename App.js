import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';



function Home({ navigation }){
  return (
    <View style={styles.container}>
      <Button title="press me">Press The Button</Button>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  )
}

function Login({ navigation }){
  return (
    <View style = {styles.container}>
      <TextInput placeholder = "email">
      </TextInput>
      <TextInput placeholder = "password">
      </TextInput>
    </View>
    )
}
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component = { Home } />
        <Drawer.Screen name="Login" component = { Login } />
      </Drawer.Navigator>
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
