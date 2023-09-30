import { View, Text, Pressable, TextInput, StyleSheet } from "react-native";
import { useState } from "react";
import * as authService from '../../services/authService.js'

function Login({setIsLoggedIn}){
    const [loginData, setLoginData] = useState({email: '', password: ''});
    const [emailValidError, setEmailValidError] = useState('');
    const [emailMessage, setEmailMessage] = useState()


    async function submitLogin(){
      if(loginData.email && !emailValidError && loginData.password){
        try {
         const response = await authService.login(loginData)
         console.log(response)
         setEmailMessage(response.err)
          if(response.token){
            setIsLoggedIn(true)
          }
        } catch (error) {
          console.log(error)
        }
      } else{ 
        console.log('Enter Email and Password')
        }
    }
  
    function setEmailData(e){
      setLoginData({...loginData, email : e})
    }
  
    function setPasswordData(e){
      setLoginData({...loginData, password : e})
    }
  
    function handleValidEmail(val) {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      if (val.length === 0) {
        setEmailValidError('Email address must be entered.');
      } else if (reg.test(val) === false) {
        setEmailValidError('Enter a valid email address.');
      } else if (reg.test(val) === true) {
        setEmailValidError('');
      }
    };
  
    return (
      <View style={styles.loginContainer}>
        <Text style={{fontSize:35, fontWeight:'700',}}>Login</Text>
        {emailMessage && <Text style={{color: 'red', fontSize: 16}}>{emailMessage}</Text>}
        {emailValidError ? <Text>{emailValidError}</Text> : null}
        <TextInput
        style={styles.textInput}
          placeholder="Email"
          value={loginData.email}
          autoCorrect={false}
          autoCapitalize="none"
          onChange={setEmailData}
          onChangeText={value => {
            setEmailData(value);
            handleValidEmail(value);
          }}
          />
  
        <TextInput
        style={styles.textInput} 
          autoCapitalize="none" 
          textContentType="password"
          onChangeText={value => {
            setPasswordData(value);
          }}
          secureTextEntry={true} 
          placeholder="Password"/>
          <Pressable style={styles.loginButton} onPress={submitLogin}>
              <Text style={{color:'white', fontSize:16, fontWeight:'700'}}>Login</Text>
          </Pressable>
      </View>
  
    )
}   

export default Login;


const styles = StyleSheet.create({
    loginContainer:{
        backgroundColor: 'white',
        height: '100%',
        borderRadius: 30,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 30,
    },
    textInput:{
        backgroundColor: '#D3D3D3',
        width: '70%',
        height: 50,
        borderRadius: 20,
        textAlign: 'center',
        fontSize: 16,
    },
    loginButton:{
        backgroundColor: '#00A3FF',
        width: 125,
        height: 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12
    },
    titleHeader:{

    }
})