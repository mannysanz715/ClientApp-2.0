import * as tokenService from './tokenService'
const BASE_URL = `https://client-backend-v3.fly.dev/api/auth`



async function login(credentials) {
    try {
      const res = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      })
      const json = await res.json()
  
      tokenService.save('tokenKey', json.token)
      return json
    }catch(err){
      console.log(err)
    }
  }
  export { login }