import { useEffect, useState } from 'react';
import 'react-native-gesture-handler'
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View, Button, TextInput, Image } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

function Home({ navigation }){

  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const getDataAxios = async () => {
    axios.get("https://eu.api.blizzard.com/data/wow/pet/39?namespace=static-eu&locale=en_GB&access_token=EUwbXptNK1KjPQsXNVHLLxqNoDm4w5YAkr")
    .then((res) => {
      const result = {
        "name": res.data.name,
        "id" : res.data.id,
        "icon": res.data.icon
      }
      setData(result)
      console.log(res.data.name)
      console.log(result)
      setLoading(false);
    })
    .catch((err) => {
      console.log(err);
      setData("err")
      setLoading(false);
    })
    
  }
  useEffect(() => {getDataAxios()}, []);
  return (
    <View style={styles.container}>
      {isLoading ? (<ActivityIndicator/>) : (
        <View>
          <View style = {styles.containerinfo}>
            <Image
            style = {{
              width: 56,
              height: 56
            }}
            source={{uri: data.icon}}
            />
            <Text style={styles.loginTitle}>Name:{data.name}</Text>
          </View>
          <Button title="Login" onPress={ () => navigation.navigate('Login')}></Button>
          <Text style= {{color:'white'}}>Click to the button for more Data.</Text>
        </View>
      ) }
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
  containerinfo:{
    backgroundColor: '#777',
    alignItems: 'center',
    justifyContent: 'center'
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