import { View, Text, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/authContext'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ActivityIndicator, StatusBar } from 'react-native';
import ChatList from '../../components/ChatList';
import { getDocs, query, where } from 'firebase/firestore';
import { userRef } from '../../firebaseConfig';
export default function Home() {
  const {logout,user}=useAuth();
  const [users,setUsers]=useState([]);
  useEffect(()=>{
    if(user?.uid){
       getUsers();
    }
    

  },[])
  const getUsers = async () => {
  try {
    const q = query(userRef, where('userId', '!=', user?.uid));
    const querySnapshot = await getDocs(q);

    let data = [];
    querySnapshot.forEach(doc => {
      data.push({ ...doc.data() });
    });

    setUsers(data);
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};
  


  //console.log('user data: ',user)
  return (
    <View className="flex-1 bg-white">
      <StatusBar style="light"/>{
        users.length>0?(
          <ChatList currentUser={user} users={users}/>

        ):(
          <View className="flex items-center" style={{top: hp(30)}}>
                  <ActivityIndicator size="large"/>
                  {/* <Loading size={hp(10)}/> */}
            </View>
        )
      }

      
    </View>
  )
}