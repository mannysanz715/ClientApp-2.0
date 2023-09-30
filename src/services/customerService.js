import * as tokenService from './tokenService.js'
const BASE_URL =`https://client-backend-v3.fly.dev/api`
async function getAllCustomers(){
  try {
    const token = await tokenService.getValueFor('tokenKey')
    const res = await fetch(`${BASE_URL}/customers`, {
      method: 'GET',
      headers: {'Authorization': `Bearer ${token}`},
    })
    return await res.json()
  }catch(error){
    console.log(error.json)
  }
}

async function getCustomerDetails(customerId){
  try {
    const token = await tokenService.getValueFor('tokenKey')
    const res = await fetch(`${BASE_URL}/customers/${customerId}`, {
      method: 'GET',
      headers: {'Authorization': `Bearer ${token}`},
    })
    return await res.json()
  }catch(error){
    console.log(error.json)
  }
}

async function createNewCustomer(formData){
  try {
    const token = await tokenService.getValueFor('tokenKey')
    const res = await fetch(`${BASE_URL}/customers/create`, {
      method: 'POST',
      headers: {'Authorization': `Bearer ${token}`,
      "Content-Type": "application/json",},
      body: JSON.stringify(formData),
    })
    return await res.json()
  } catch (error) {
    console.log(error)
  }
}

export { 
  getAllCustomers,
  getCustomerDetails,
  createNewCustomer
}
