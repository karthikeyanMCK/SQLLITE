import React, { useEffect, useState } from 'react';
import { Text,View,StyleSheet,TextInput,TouchableOpacity,Image,SafeAreaView,ScrollView,Alert,Modal,ToastAndroid, ActivityIndicator, KeyboardAvoidingView,BackHandler} from "react-native";
import {Dimensions} from 'react-native';
const { width, height } = Dimensions.get('window');
import Colour from './Colour';
import { useFocusEffect } from "@react-navigation/native";
import {openDatabase} from 'react-native-sqlite-storage';
const DB=openDatabase({name: 'userDetails.db', location: 'default'});



export default function HomeScreen() {

const [users,setUsers]=useState([]);




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
  


    function getAllUser()
    {
      console.warn('get user')
        DB.transaction(tx => {
            tx.executeSql('SELECT * FROM user', [], (tx, results) => {
              var temp = [];
              for (let i = 0; i < results.rows.length; ++i) {
                
                temp.push(results.rows.item(i));
              }
              setUsers(temp)
              console.warn(temp)
            });
          });
    }

  return (
    <SafeAreaView style={{flex:1,backgroundColor:"#FFF"}}>
        <View style={{width:'100%',paddingVertical:20,backgroundColor:Colour.primary,justifyContent:'center',alignItems:'center'}}>
            <Text style={{color:'#FFF',fontSize:width/20}}>Users detail</Text>
        </View>
        <View style={{width:'100%',paddingVertical:30,flexDirection:'row',justifyContent:'space-evenly'}}>

            <TouchableOpacity 
            onPress={()=>{getAllUser()}}
            style={{backgroundColor:Colour.primary,padding:10}}>
                <Text style={{color:'#FFF',fontSize:width/20}}>Fetch users</Text>
            </TouchableOpacity>

            <TouchableOpacity 
            onPress={() => BackHandler.exitApp() }
            style={{borderWidth:1,borderColor:Colour.primary,padding:10}}>
                <Text style={{color:Colour.primary,fontSize:width/20}}>Log out</Text>
            </TouchableOpacity>

        </View>
        <View style={{width:'100%',padding:10,}}>
            <Text style={{color:'#000',fontSize:width/20,textAlign:'center'}}>Users name list</Text>
        </View>
        <ScrollView>
            <View style={{width:'100%',justifyContent:'center',alignItems:'center'}}>
                {
                    users.map((data,index)=>{
                        return(
                            <View style={{width:'90%',padding:10,borderBottomWidth:1}}>
                                <Text style={{color:'#000',fontSize:width/20}}>Name : {data.user_name}</Text>
                            </View>
                        )
                    })
                }
            </View>

        </ScrollView>

    </SafeAreaView>
  )
}