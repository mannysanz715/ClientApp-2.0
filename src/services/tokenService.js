import * as SecureStore from 'expo-secure-store'

async function save(key, value){
  await SecureStore.setItemAsync(key,value);
}

async function getValueFor(key){
  let result = await SecureStore.getItemAsync(key);
  if(result){
    return result
  }
}

async function logOut(key){
  let result = await SecureStore.deleteItemAsync(key)
  console.log('logout function', result)
}

export { save, getValueFor, logOut }