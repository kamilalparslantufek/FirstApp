import { useEffect, useState } from 'react';
import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View, Button, TextInput, Fla } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

function Home({ navigation }){

  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const getData = async () => {
    const response = await fetch("https://eu.api.blizzard.com/data/wow/pet/39?namespace=static-eu&locale=en_GB&access_token=EUlOsP2apwkTNTdQGPxLErl7qmfy0MOdrp");
    const json = await response.json();
    setData({
      "name" : json.name,
      "id" : json.id,
      "icon" : json.icon,
    })
    // const mediaResponse = await fetch("");
    // we receive the data, need to render on page
    console.log(data);
    setLoading(false);
  }
  useEffect(() => {getData()}, []);
  return (
    <View style={styles.container}>
      <Button title="Login" onPress={ () => navigation.navigate('Login')}></Button>
      <Text style= {{color:'white'}}>Click to the button for more Data.</Text>
    </View>
  )
}

function LoginGoogle(){
}

function LoginPhone(){
  return(
  <View key="phone" style = {styles.container}>
  <Text style= {styles.loginTitle}>Login Using Your Phone Number</Text>
  <TextInput  
  style = {styles.input}
  placeholderTextColor = "#ddd"
  placeholder = "Phone Number">
  </TextInput>
  <Button title='Send Authentication Code' onPress={sendSMSCode()}/>
</View>
  )
}
/* importing crashlytics does not work with the expo go app, so i will try to import both authentication and crashlytics tomorrow. */
function sendSMSCode(){

}

function LoginEmail(){
  return (
    <View key="email" style = {styles.container}>
      <Text style = { styles.loginTitle}>Login Using Your Email & Password</Text>
      <TextInput  
      style = {styles.input}
      placeholderTextColor = "#ddd"
      placeholder = "email">
      </TextInput>
      <TextInput 
      secureTextEntry = {true}
      style = {styles.input}
      placeholderTextColor = "#ddd"
      placeholder = "password">
      </TextInput>
      <Button title='Login'></Button>
    </View>
    )
}

function Login({navigation}){
  let ret;
  const [loginSelection, setLoginMethod] = useState(0);
  if(loginSelection == 0) ret = LoginEmail();
  if(loginSelection == 1) ret = LoginPhone();
  let buttons = <View key="loginBtns" style = {styles.buttonGroup}>
     <Button style = {styles.buttonGroupButton} title='Email' onPress={() => {setLoginMethod(0); navigation.navigate('Login');}}></Button>
     <Button style = {styles.buttonGroupButton} title='Phone Number' onPress={() => {setLoginMethod(1); navigation.navigate('Login');;}} ></Button>
  </View>
  return [ret, buttons]
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
    flex: 2.7,
    backgroundColor: '#777',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom:0,
    paddingBottom:0
  },
  buttonGroup:{
      flex: 1,
      paddingBottom: 100,
      flexDirection: 'row',
      backgroundColor : '#777',
      alignItems: 'center',
      justifyContent: 'center'
  },
  buttonGroupButton:{
      border: 0,
      shadowOffset: 0,
  },
  input: {
    color: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    height: 40,
    width: '60%',
    marginBottom: '3%',
    paddingLeft: '1%'
  },
  loginTitle: {
    padding: '3%',
    color: '#fff',
  }
});