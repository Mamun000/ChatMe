import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React from 'react';

const ios = Platform.OS === 'ios';

export default function CoustomKeyboardView({ children, inchat }) {
  const keyboardVerticalOffset = inchat ? 90 : 0;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={ios ? 'padding' : 'height'}
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      {
        inchat ? (
          // For in-chat, just use View + Touchable to dismiss
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={{ flex: 1 }}>
              {children}
            </View>
          </TouchableWithoutFeedback>
        ) : (
          // For login/signup screens, ScrollView handles tap + keyboard
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
              <View style={{ flex: 1 }}>
                {children}
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        )
      }
    </KeyboardAvoidingView>
  );
}
