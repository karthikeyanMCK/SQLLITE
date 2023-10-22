import React, { useEffect, useState } from 'react';
import { Text,View,StyleSheet,TextInput,TouchableOpacity,Image,SafeAreaView,ScrollView,Alert,Modal,ToastAndroid, ActivityIndicator, KeyboardAvoidingView,BackHandler} from "react-native";
import {Dimensions} from 'react-native';
const { width, height } = Dimensions.get('window');
import Colour from './Colour';
import { useFocusEffect } from "@react-navigation/native";
import {openDatabase} from 'react-native-sqlite-storage';
const DB=openDatabase({name: 'userDetails.db', location: 'default'});




function LogIn(props){ 

  const [phonenumber, setPhoneNumber] = useState('')
  const [phoneNumberError, setPhoneNumberError] = useState('')
  const [password,setPassword]=useState('')
  const [errorMessage,setErrorMessage]=useState('')
  const[isLoading,setIsLoding]=useState(false)
  const digitRegx=/^[0-9]*$/    
  const phoneNumberReg=/^(0|91)?[6-9][0-9]{9}$/;
   


  useFocusEffect(
    React.useCallback(() => {
        const backAction = () => {
            Alert.alert("Dear user!", "Are you sure you want to exit?", [
                { text: "Cancel" },
                { text: "Yes", onPress: () => BackHandler.exitApp() }
            ]);
            return true;
        };
  
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );
  
        return () => backHandler.remove();
    }, [])
  );
  





  function handleValidation(){
    var phonenumberValue,passwordValue=false
  
    if((phonenumber!="")&&(phonenumber!=null))
    {
  
        if(phoneNumberReg.test(phonenumber))
        {
            phonenumberValue=true
            setPhoneNumberError("")        
        }
        else{
            phonenumberValue=false
            setPhoneNumberError("Invalid phone number")        
        }
    }
    else{
        phonenumberValue=false
        setPhoneNumberError("Please enter the valid phone number")
    }
  
    
    
    if((password!="")&&(password!=null))
    {
      passwordValue=true
      setErrorMessage("")
    }
    else{
      passwordValue=false
      setErrorMessage("Password shoud not be empty")
    }
  
    
      if((phonenumberValue==true)&&(passwordValue==true))
      {
         
          setPhoneNumberError("")
          setErrorMessage("")
          console.warn("ALL ok")
          checkUser()
              
      }
     
    }
  
    
    
  



function checkUser()
{
  DB.transaction(tx => {
    tx.executeSql(`SELECT * FROM user where user_contact=${phonenumber}`, [], (tx, results) => {
      if(results.rows.length==0)
      {
        console.warn("Kindly register")
        ToastAndroid.show("Kindly register",ToastAndroid.SHORT)
      }
      else if(password==results.rows.item(0).password){
          ToastAndroid.show("Welcome",ToastAndroid.SHORT)
          props.navigation.navigate('Home')
          console.warn('regisered user');
      }
      else{
        ToastAndroid.show("Password mismatch",ToastAndroid.SHORT)
        setErrorMessage("Password mismatch")
        console.warn('password mismatch');
      }
      
    });
  });
}
  
  


  
return(
    
    <SafeAreaView style={{flex:1,backgroundColor:Colour.white}}>
      
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        


          <View style={{width:'80%',justifyContent:'center',alignItems:'center',marginBottom:30}}>
            <View style={{width:'100%',justifyContent:"center",alignItems:'center',marginBottom:10}}>
              <Text 
              style={{ fontFamily:"Montserrat-Semibold",fontSize:width/14,fontWeight:"600",color:Colour.black,textAlign:'center',}}>
                Login
              </Text>
            </View>
            <View style={{justifyContent:'center',marginBottom:10}}>
              <Text style={{ fontFamily:"Montserrat-Regular",fontSize:width/20,fontWeight:"400",textAlign:'center',color:Colour.liteGrey,}}>
              Please login to continue  
              </Text>
            </View>

        </View>

        <View style={{width:'85%',justifyContent:'center',alignItems:'center'}}>
            <View style={{width:'100%',justifyContent:"center",marginBottom:10}}>
              <Text 
              style={{ fontFamily:"Montserrat-Semibold",fontSize:width/30,fontWeight:"600",color:Colour.black,}}>
                Phone number <Text style={{color:Colour.redColour}}>*</Text>
              </Text>
            </View>
            <View style={{width:'100%',justifyContent:'center',marginBottom:10}}>
              <View style={{width:'100%',flexDirection:'row',borderWidth:1,borderRadius:5,borderColor:Colour.greyBorder,backgroundColor:Colour.white,elevation:5}}>
                
                <View style={{width:'90%'}}>
                <TextInput
                  keyboardType='numeric'
                  maxLength={10}
                  value={phonenumber}
                  onChangeText={(text) =>{
                    if((digitRegx.test(text))||(text==""))
                    {
                      setPhoneNumber(text)
                    }
                  }
                    
                    }
                  style={{fontWeight:"400",fontSize:14, fontFamily:"Montserrat-Regular",width:"100%",color:Colour.black}}   

                  placeholderTextColor={Colour.black} placeholder="Enter Phone Number"/>
                </View>

              </View>
            </View>

        </View>
        <>
        {
          phoneNumberError!=""?
          <View style={{width:'85%',justifyContent:'center'}}>
          <Text style={{fontSize:width/30,color:Colour.redColour,fontWeight:"200",fontFamily:"Montserrat-Regular"}}>{phoneNumberError}</Text>                        
          </View>
          :
          null
        }
        </>
        


<View style={{width:'85%',justifyContent:'center',alignItems:'center'}}>
            <View style={{width:'100%',justifyContent:"center",marginBottom:10}}>
              <Text 
              style={{ fontFamily:"Montserrat-Semibold",fontSize:width/30,fontWeight:"600",color:Colour.black,}}>
                Password <Text style={{color:Colour.redColour}}>*</Text>
              </Text>
            </View>
            <View style={{width:'100%',justifyContent:'center',marginBottom:10}}>
              <View style={{width:'100%',flexDirection:'row',borderWidth:1,borderRadius:5,borderColor:Colour.greyBorder,backgroundColor:Colour.white,elevation:5}}>
                
                <View style={{width:'90%'}}>
                <TextInput
                  keyboardType='default'
                  maxLength={10}
                  value={password}
                  onChangeText={(text) =>{
                    setPassword(text)
                  }
                    
                    }
                  style={{fontWeight:"400",fontSize:14, fontFamily:"Montserrat-Regular",width:"100%",color:Colour.black}}   

                  placeholderTextColor={Colour.black} placeholder="Enter password"/>
                </View>

              </View>
            </View>

        </View>
        <>
        {
          errorMessage!=""?
          <View style={{width:'85%',justifyContent:'center'}}>
          <Text style={{fontSize:width/30,color:Colour.redColour,fontWeight:"200",fontFamily:"Montserrat-Regular"}}>{errorMessage}</Text>                        
          </View>
          :
          null
        }
        </>


        <View style={{width:'85%',marginTop:50,marginBottom:20}}>
            {
                isLoading ==false?
                <TouchableOpacity  onPress={()=>{handleValidation()}} 
                style={{width:"100%",backgroundColor:Colour.primary,borderRadius:15,padding:15,alignItems:"center",justifyContent:"center"}}
                >
                
                 <Text style={{fontWeight:"600",fontSize:20, fontFamily:"Montserrat-Semibold",color:Colour.white,}}>SIGN IN</Text>
                 
                 </TouchableOpacity>
                 :
                 <View   
                 style={{width:"100%",backgroundColor:Colour.primary,padding:15,borderRadius:15,alignItems:"center",justifyContent:"center"}}
                 >
            
                  <ActivityIndicator color={Colour.white}/>
             
                </View>    
            }
            </View>



        <View style={{width:'85%',flexDirection:"row",justifyContent:"center",alignItems:"center" }}>
          <View style={{justifyContent:"center"}}>
                <Text 
                style={{ fontFamily:"Montserrat-Semibold",fontSize:width/30,fontWeight:"600",color:Colour.black,marginRight:10}}>
                  Don’t have an account?
                </Text>
          </View>
         
         <TouchableOpacity style={{justifyContent:'center'}}>
         <Text   onPress={()=>{props.navigation.navigate("Register")}}  style={{fontSize:width/30,fontFamily:"Montserrat-Bold",color:Colour.black,fontWeight:"400",textDecorationLine:'underline'}}>Register</Text>
         </TouchableOpacity>
      </View>

      </View>
      



<Modal
              animationType="fade"
              transparent={true}
              visible={isLoading}>
        <View style={{flex:1,justifyContent:'center',alignItems:'center',}}>

          <View style={{width:'100%',height:height,opacity:0.7,backgroundColor:Colour.black,zIndex:-1,position:'absolute'}}/>
          <ActivityIndicator color={Colour.white} size="large"/>
        </View>
  </Modal>


    </SafeAreaView>
  
  
  )
}
  export default LogIn;
  