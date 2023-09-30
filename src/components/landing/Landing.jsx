import { StyleSheet, Text, View, TextInput, Pressable, Button, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import * as customerService from '../../services/customerService.js';

function Landing({logOut}){
  const [searchTerm, setSearchTerm] = useState()
  const [customers, setCustomers] = useState()
  const [contactsList, setContacts] = useState();
  const [modalState, setModalState] = useState(false)
  const [createContactModal, setCreateContactModal] = useState(false)

  function changeModalState(e){
    setModalState(!modalState)
  }

  function handleSearchTerm(text){
    setSearchTerm(text)
  }
  function changeContactModal(){
    setCreateContactModal(!createContactModal)
  }

  useEffect(() => {
    (async ()=>{
      let allCustomers = await customerService.getAllCustomers()
      allCustomers =  allCustomers.sort(function(a, b){
        if(a.name < b.name) return -1
        if(b.name < a.name) return 1
        return 0
      })
      setCustomers(allCustomers)
      console.log(allCustomers)
      })();
  },[]);


  return(
    <View style={styles.landingContainer}>
      <Pressable style={styles.logOutButton} onPress={logOut}><Text style={{color: 'white', fontSize:16, fontWeight:'600'}}>Log Out</Text></Pressable>
      <View style={styles.contentContainer}>
          <TextInput style={styles.textInput} onChangeText={(text)=> handleSearchTerm(text)} placeholder="Search For Customer"/>
          {searchTerm ?
            <ScrollView style={styles.customerCardContainer}>
              {customers.filter(customer =>{
                      const tempSearchTerm = searchTerm.toLowerCase()
                      let customerName = customer.name.toLowerCase()
                      return tempSearchTerm && customerName.includes(tempSearchTerm)}).map((customer, idx)=>
                    <Pressable key={idx} style={styles.customerCard} onPress={()=> buttonPress(customer._id)}>
                        <Text>{customer.name}</Text>
                    </Pressable>
                  )
              }
            </ScrollView > 
            :
            <ScrollView style={styles.customerCardContainer}>
            {customers && customers.map((customer, idx)=>
              <Pressable key={idx} style={styles.customerCard} onPress={()=> buttonPress(customer._id)}>
                <Text>{customer.name}</Text>
              </Pressable>
            )}

            </ScrollView>
          }
      </View>
        <Pressable style={styles.footer}>
          {createContactModal ? <View>
            <Pressable><Text>Create Manually</Text></Pressable>
            <Pressable ><Text>Import From Contacts</Text></Pressable>
          </View> : <Pressable onPress={changeContactModal} ><Text>Create New Contact</Text></Pressable>}
        </Pressable>
    </View>
  )
}

export default Landing;

const styles = StyleSheet.create({
  customerCardContainer:{
    height: '70%',
    display:'flex',
    width: '100%',
  },
  textInput:{
    height: 45,
    color: 'black',
    fontSize:16,
    backgroundColor: '#D3D3D3',
    width: '90%',
    margin: 15,
    borderRadius: 10,
    textAlign: 'center',
  },
  logOutButton:{
    backgroundColor:'#00A3FF',
    width: 150,
    height: 50,
    display: 'flex',
    justifyContent:'center',
    alignItems: 'center',
  },
  landingContainer:{
    backgroundColor:'white',
    height: '100%',
    width: '100%,',
    borderRadius: 30,
  },
  contentContainer:{
    display:'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '80%',
  },
  customerCard:{
    borderColor: 'gray',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    borderBottomWidth: .2,
    width:'100%',
    height: 60,
  },

  footer:{
    paddingTop: 10,
  },
})
