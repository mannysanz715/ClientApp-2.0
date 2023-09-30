import { Text, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import Login from "../../components/login/login";
import Landing from "../../components/landing/Landing";
import * as tokenService from '../../services/tokenService.js'

function Home(){
  const [isLoggedIn, setIsLoggedIn] = useState(false)
		useEffect(() => {
			(async ()=>{
				const tokenValue = await tokenService.getValueFor("tokenKey")
				if(tokenValue) setIsLoggedIn(true)
				console.log(tokenValue)
			})();
		}, [])

		async function logOut(){
			console.log('pressed')
			await tokenService.logOut("tokenKey")
			setIsLoggedIn(false)
		}
  return(
    <>
			{isLoggedIn ? <Landing logOut={logOut}/> : <Login setIsLoggedIn={setIsLoggedIn}/>}
    </>
  )
}

export default Home;


const styles = StyleSheet.create({
text:{
    color: 'white',
}
})