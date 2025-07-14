import { View, Text } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'
export default function Loading() {
  return (
    <View style={{height:useFrameSize,aspectRatio:1}}>
      <LottieView style={{flex:1}}source={require('../assets/images/Animation - 1752077218377.json')} autoPlay loop />
      
    </View>
  )
}