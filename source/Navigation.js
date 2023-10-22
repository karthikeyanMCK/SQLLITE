import React,{useState,useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View ,Dimensions,Text,Image} from 'react-native';
import LogIn from './LogIn';
import Register from './Register';
import HomeScreen from './HomeScreen';



import Colour from './Colour';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const Stack=createNativeStackNavigator();








const NavigationStack=()=>{
  return(
    
    <Stack.Navigator  
    initialRouteName='Login'
    screenOptions={{headerShown:false}}
    >
    
     <Stack.Screen name="LogIn" component={LogIn}  />
     <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name='Home' component={HomeScreen}/>
      


     </Stack.Navigator>
    
  )
}


const Navigation=()=>{

  
  return(
   
      
      <NavigationContainer >
        <Stack.Navigator>
          
       
          <Stack.Screen name="Navgation" component={NavigationStack} options={{headerShown:false}}/>
       
        </Stack.Navigator>      
      </NavigationContainer>
      
   
    
  );
}











export default Navigation;

