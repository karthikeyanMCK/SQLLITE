import { Text,View,StyleSheet,TextInput,TouchableOpacity,Image,Dimensions,Modal,ToastAndroid,SafeAreaView,BackHandler,ScrollView,ActivityIndicator,TouchableHighlight} from "react-native";
import React, { Component } from 'react'
import Colour from "./Colour";
import {openDatabase} from 'react-native-sqlite-storage';



const { width, height } = Dimensions.get('window');
const DB=openDatabase({name: 'userDetails.db', location: 'default'});

export default class Register extends Component {

constructor(props) {
  super(props)

  this.state = {
     userName:'',
     phoneNumber:'',
     password:'',
     confirmPassword:'',
     numberRegx:/^[0-9]*$/,
     phoneNumberRegx:/^(0|91)?[6-9][0-9]{9}$/ ,
     nameRegx:/^[a-zA-Z0-9 ]*$/,
    isLoad:false ,
    nameError:'',
    phoneNumberError:'',
    passwordError:''    
  }
}


componentDidMount()
{
    this.createTable();
}





createTable(){

console.warn('table create')
DB.transaction(function(txn) {
    txn.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='user'",
      [],
      function(tx, res) {
        console.warn('item:', res.rows.length);
        if (res.rows.length == 0) {
          txn.executeSql('DROP TABLE IF EXISTS user', []);
          txn.executeSql(
            'CREATE TABLE IF NOT EXISTS user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_contact INT(10), password VARCHAR(40))',
            []
          );
        }
      }
    );
  });
}




registerUser(){
  console.warn('register user',this.state.userName,this.state.phoneNumber,DB)
  let name=this.state.userName;
  let phone=this.state.phoneNumber;
  let password=this.state.password
  DB.transaction(function (tx) {
    tx.executeSql(
      'INSERT INTO user (user_name, user_contact, password) VALUES (?,?,?)',
      [name, phone, password],
      (tx, results) => {
        console.warn('Results', results);
        if (results.rowsAffected > 0) {
          
          ToastAndroid.show("Successfully register",ToastAndroid.SHORT)
          
        } else console.warn("not inserted")
      }
    );
  });

        
  };
  
  
  checkAlreadyRegister()
  {
    DB.transaction(tx => {
        tx.executeSql(`SELECT * FROM user where user_contact=${this.state.phoneNumber}`, [], (tx, results) => {
          if(results.rows.length==0)
          {
            this.registerUser()
          }
          else{
            ToastAndroid.show("User already exists",ToastAndroid.SHORT)
          }
          
        });
      });

  }


  
  



handleValidation()
{
    var userValue=false,phonenumberValue=false,passwordValue=false, confirmPasswordValue=false

    if((this.state.userName!="")&&(this.state.userName!=null))
    {
        
        userValue=true
        this.setState({
            nameError:''
        })
        
    }
    else{
        userValue=false
        this.setState({
            nameError:"Please enter the name"
        })
        
    }

console.warn(this.state.phoneNumber)
    if((this.state.phoneNumber!="")&&(this.state.phoneNumber!=null))
    {
        console.warn(this.state.phoneNumber)

        this.setState({
            phoneNumberError:''
        })
        
        if(this.state.phoneNumberRegx.test(this.state.phoneNumber))
        {
            phonenumberValue=true
            this.setState({
                phoneNumberError:''
            })
        }
        else{
            phonenumberValue=false
            this.setState({
                phoneNumberError:"Please enter the valid phone number"
            })
                    
        }
    }
    else{
        phonenumberValue=false
        this.setState({
            phoneNumberError:"Please enter the phone number "
        })
        
    }

    
    

    if((this.state.password!="")&&(this.state.password!=null))
    {
    passwordValue=true
    this.setState({
        passwordError:''
    })
    if((this.state.password.length>=8))
    {
      passwordValue=true
      this.setState({
        passwordError:''
    })
      }
      else{
          passwordValue=false
          this.setState({
            passwordError:"Password length should be 8 or more"
        })
          
      }
    }
    else{
        passwordValue=false
        this.setState({
            passwordError:"Please enter the password"
        })
        
    }
   
    

    if((this.state.confirmPassword!="")&&(this.state.confirmPassword!=null)&&(this.state.confirmPassword.length>=8))
    {
    confirmPasswordValue=true
    this.setState({
        passwordError:""
    })
    
    }
    else{
        confirmPasswordValue=false
        this.setState({
            passwordError:"Password length atleast 8"
        })
        
    }


    if((this.state.password==this.state.confirmPassword)&& this.state.password.length>=8 && this.state.confirmPassword.length>=8)
    {
      
      confirmPasswordValue=true
      this.setState({
        passwordError:''
      })
    }
    else{
      
      confirmPasswordValue=false
      this.setState({
        passwordError:"Both password should't be empty and unequal"
      })
      
    }


    




  if((userValue==true)&&(phonenumberValue==true)&&(passwordValue==true))
    {
        this.setState({
            nameError:'',
            phoneNumberError:'',
            passwordError:''
        })
        
        console.warn("All ok")
        this.checkAlreadyRegister()
    }
    
}













  render() {
    return (
        <SafeAreaView style={{flex:1,backgroundColor:'#FFF'}}>
        <ScrollView>
      
      
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            {/* <View style={{width:'100%',height:height/6.,justifyContent:'center',alignItems:'center'}}>
              <View style={{width:'50%',height:'100%'}}>
                  <Image source={lavenjallogo} style={{flex:1,width:undefined,height:undefined,resizeMode:'contain'}}/>
              </View>
            </View> */}
  
            <View style={{width:'80%',justifyContent:'center',alignItems:'center',marginBottom:30}}>
              <View style={{width:'100%',justifyContent:"center",alignItems:'center',marginBottom:10}}>
                <Text 
                style={{ fontFamily:"Montserrat-Semibold",fontSize:width/14,fontWeight:"600",color:Colour.primary,textAlign:'center',}}>
                  Register Now
                </Text>
              </View>
              <View style={{justifyContent:'center',marginBottom:10}}>
                <Text style={{ fontFamily:"Montserrat-Regular",fontSize:width/20,fontWeight:"400",textAlign:'center',color:Colour.liteGrey,}}>
                Please register to continue  
                </Text>
              </View>
  
          </View>
  
  
  
          <View style={{width:'85%',justifyContent:'center',alignItems:'center'}}>
              <View style={{width:'100%',justifyContent:"center",marginBottom:10}}>
                <Text 
                style={{ fontFamily:"Montserrat-Semibold",fontSize:width/30,fontWeight:"600",color:Colour.black,}}>
                  Name <Text style={{color:Colour.redColour}}>*</Text>
                </Text>
              </View>
              <View style={{width:'100%',justifyContent:'center',marginBottom:10}}>
                <View style={{width:'100%',flexDirection:'row',borderWidth:1,borderRadius:5,borderColor:Colour.greyBorder,backgroundColor:Colour.white,elevation:5}}>
                  
                  <View style={{width:'90%'}}>
                  <TextInput
                    keyboardType='default'
                    maxLength={40}
                    value={this.state.userName}
                    onChangeText={(text) =>{
                      if(this.state.nameRegx.test(text)==true){
                        this.setState({
                            userName:text
                        })
                      }
                    } }
                    placeholder='Enter Name' 
                    placeholderTextColor={Colour.black}
                    style={{fontWeight:"400",fontSize:14, fontFamily:"Montserrat-Regular",width:"100%",color:Colour.black}}  />
                  </View>
  
                </View>
              </View>
  
          </View>
          <>
          {
            this.state.nameError!=""?
            <View style={{width:'85%',justifyContent:'center',marginBottom:10}}>
            <Text style={{fontSize:width/30,color:Colour.redColour,fontWeight:"200",fontFamily:"Montserrat-Regular"}}>{this.state.nameError}</Text>                        
          </View>
          :
          null
  
          }
          </>
          
            
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
             value={this.state.phoneNumber}
             maxLength={10}
             onChangeText={(text) => 
              {
                if(this.state.nameRegx.test(text)==true){
                  this.setState({
                    phoneNumber:text
                  })
                }}
              }
             placeholder='Enter Phone Number' 
             placeholderTextColor={Colour.black}
             style={{fontWeight:"400",fontSize:14, fontFamily:"Montserrat-Regular",width:"100%",color:Colour.black}}  />
                  </View>
  
                </View>
              </View>
  
          </View>
          <>
          {
            this.state.phoneNumberError!=""?
            <View style={{width:'85%',justifyContent:'center',marginBottom:10}}>
            <Text style={{fontSize:width/30,color:Colour.redColour,fontWeight:"200",fontFamily:"Montserrat-Regular"}}>{this.state.phoneNumberError}</Text>                        
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
                    
                    value={this.state.password}
                    onChangeText={(text) =>{
                      this.setState({
                        password:text
                      })
                    } }
                    placeholder='Enter password' 
                    placeholderTextColor={Colour.black}
                    style={{fontWeight:"400",fontSize:14, fontFamily:"Montserrat-Regular",width:"100%",color:Colour.black}}  />
                  </View>
  
                </View>
              </View>
  
          </View>
          

          <View style={{width:'85%',justifyContent:'center',alignItems:'center'}}>
              <View style={{width:'100%',justifyContent:"center",marginBottom:10}}>
                <Text 
                style={{ fontFamily:"Montserrat-Semibold",fontSize:width/30,fontWeight:"600",color:Colour.black,}}>
                  Confirm password <Text style={{color:Colour.redColour}}>*</Text>
                </Text>
              </View>
              <View style={{width:'100%',justifyContent:'center',marginBottom:10}}>
                <View style={{width:'100%',flexDirection:'row',borderWidth:1,borderRadius:5,borderColor:Colour.greyBorder,backgroundColor:Colour.white,elevation:5}}>
                  
                  <View style={{width:'90%'}}>
                  <TextInput
                    keyboardType='default'
                    
                    value={this.state.confirmPassword}
                    onChangeText={(text) =>{
                      this.setState({
                        confirmPassword:text
                      })
                    } }
                    placeholder='Confirm your password' 
                    placeholderTextColor={Colour.black}
                    style={{fontWeight:"400",fontSize:14, fontFamily:"Montserrat-Regular",width:"100%",color:Colour.black}}  />
                  </View>
  
                </View>
              </View>
  
          </View>
          <>
          {
            this.state.passwordError!=""?
            <View style={{width:'85%',justifyContent:'center',marginBottom:10}}>
            <Text style={{fontSize:width/30,color:Colour.redColour,fontWeight:"200",fontFamily:"Montserrat-Regular"}}>{this.state.passwordError}</Text>                        
          </View>
          :
          null
  
          }
          </>
          
  
  
          
  
  
            <View style={{width:'85%',marginVertical:20,}}>
              {
                  this.state.isLoad ==false?
                  <TouchableOpacity  onPress={()=>{this.handleValidation()}} 
                  style={{width:"100%",backgroundColor:Colour.primary,borderRadius:15,padding:15,alignItems:"center",justifyContent:"center"}}
                  >
                  
                   <Text style={{fontWeight:"600",fontSize:20, fontFamily:"Montserrat-Semibold",color:Colour.white,}}>SUBMIT</Text>
                  
                   </TouchableOpacity>
                   :
                   <View   style={{width:"100%",backgroundColor:Colour.primary,padding:15,borderRadius:15,alignItems:"center",justifyContent:"center"}}>
                        <ActivityIndicator color={Colour.white}/>
                    </View>   
              }
              </View>
  
              <View style={{width:'100%',flexDirection:'row',alignItems:"center",justifyContent:"center",marginBottom:height/20}}>
                <View style={{justifyContent:'center',marginRight:10}}>
                <Text  style={{fontWeight:"700",fontSize:13, fontFamily:"Montserrat-Regular",color:Colour.black,}}>Have an account ?</Text>
                </View>
                
  
                <TouchableOpacity 
                onPress={()=>this.props.navigation.navigate('LogIn')} 
                style={{justifyContent:'center'}}>
                <Text  style={{fontWeight:"400",fontSize:13, fontFamily:"Montserrat-Bold",color:Colour.primary,textDecorationLine:'underline',}}>Sign in</Text>
                </TouchableOpacity>
               </View>
  
        </View>
        
  
        
      
  </ScrollView>
         
      
  
  <Modal
                animationType="Fade"
                transparent={true}
                visible={this.state.isLoad}>
          <View style={{flex:1,justifyContent:'center',alignItems:'center',}}>
  
            <View style={{width:'100%',height:height,opacity:0.7,backgroundColor:Colour.black,zIndex:-1,position:'absolute'}}/>
            <ActivityIndicator color={Colour.white} size="large"/>
          </View>
    </Modal>
  
  
  
        
      </SafeAreaView>
    )
  }
}