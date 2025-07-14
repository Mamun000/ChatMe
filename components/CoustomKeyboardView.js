import { View, Text, KeyboardAvoidingView, ScrollView, Platform } from 'react-native'
import React from 'react'

const ios=Platform.OS=='ios';
export default function CoustomKeyboardView({children,inchat}) {
  let kavConfig={};
  let scrollViewConfig={};
  if(inchat){
    kavConfig={keyboardVerticalOffset: 90};
    scrollViewConfig={contentContainerStyle:{flex:1}};
  }
  return (
    <KeyboardAvoidingView
     behavior={ios? 'padding':'height'}
     keyboardVerticalOffset={90}
     style={{flex: 1}}
     {...kavConfig}
    >
        <ScrollView
           style={{flex: 1}}
           
           bounces={false}
           showsVerticalScrollIndicator={false}
           {...scrollViewConfig}
        >
            {
                children
            }
        </ScrollView>
    </KeyboardAvoidingView>
  )
}