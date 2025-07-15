import { View, Text, TextInput, Alert, Keyboard} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar';
import ChatRoomHeader from '../../components/ChatRoomHeader';
import MessageList from '../../components/MessageList';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import {useAuth} from '../../context/authContext'
import CoustomKeyboardView from '../../components/CoustomKeyboardView'
import { getRoomId } from '../../utils/common';
import { addDoc, collection, doc, onSnapshot, orderBy, query, setDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
export default function ChatRoom() {
    const item=useLocalSearchParams();//second user
    const {user} =useAuth(); //logged in user
    const router=useRouter();
    const[messages, setMessages]=useState([]);
    const textRef= useRef('');
    const inputRef=useRef(null);
    const scrollViewRef=useRef(null);

    useEffect(()=>{
      createRoomIfNotExist();

      let roomId=getRoomId(user?.userId, item?.userId);
      const docRef=doc(db,"rooms",roomId);
      const messagesRef=collection(docRef,"messages");
      const q=query(messagesRef,orderBy('createdAt','asc'));

      let unsub=onSnapshot(q,(snapshot)=>{
        let allMessage=snapshot.docs.map(doc=>{
          return doc.data();
        });
        setMessages([...allMessage]);
      });
      
      const KeyboardDidShow=Keyboard.addListener(
        'keyboardDidShow',updateScrollView
      )

      return()=>{
        unsub();
        KeyboardDidShow.remove();
      }


      return unsub;

    },[]);

    useEffect(()=>{
      updateScrollView();
    },[messages])

    const updateScrollView=()=>{
      setTimeout(()=>{
        scrollViewRef?.current?.scrollToEnd({animated: true})

      },100)
    }

    const createRoomIfNotExist= async ()=>{
      //room id
      let roomId=getRoomId(user?.userId, item?.userId);
      await setDoc(doc(db,"rooms",roomId),{
        roomId,
        createdAt: Timestamp.fromDate(new Date())
      });

    }


    const handleSendMessage =async()=>{
      let message= textRef.current.trim();
      if(!message) return;

      try {
        let roomId=getRoomId(user?.userId, item?.userId);
        const docRef=doc(db,'rooms', roomId);
        const messagesRef=collection(docRef,"messages");
        textRef.current="";
        if(inputRef) inputRef?.current?.clear();
        const newDoc= await addDoc(messagesRef, {
          userId: user?.userId,
          text: message,
          profileUrl: user?.profileUrl,
          senderName: user?.username,
          createdAt: Timestamp.fromDate(new Date())
        });

        // console.log('new message id: ',newDoc.id);
        
      } catch (error) {
        Alert.alert('Message',error.message);
      }

    }

    

  return (
    <CoustomKeyboardView inchat={true}>
    <View className="flex-1 bg-white">
      <StatusBar style="dark"/>
      <ChatRoomHeader user={item} router={router}/>
      <View className="h-3 border-b border-neutral-300"/>
      <View className="flex-1 justify-between bg-neutral-100 overflow-visible">
           <View className="flex-1">
               <MessageList scrollViewRef={scrollViewRef} messages={messages} currentUser={user} />
           </View>
           <View style={{marginBottom: hp(2.7)}} className="pt-2">
           
                <View className="flex-row mx-3 justify-between bg-white border p-2 border-neutral-300 rounded-full pl-5">
                    <TextInput
                    ref={inputRef}
                    onChangeText={value=>textRef.current=value}
                    color="black"
                    placeholder='Type message...'
                    style={{fontSize:hp(2)}}
                    className="flex-1 mr-2"
                    />
                    <TouchableOpacity onPress={handleSendMessage} className="bg-neutral-200 p-2 mr-[1px] rounded-full">
                         <Feather name="send" size={hp(2.7)} color="#737373" />
                    </TouchableOpacity>
                </View>
            

           </View>
      </View>
    </View>
</CoustomKeyboardView>
   
  )
}