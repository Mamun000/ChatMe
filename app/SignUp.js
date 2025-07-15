import { View, Text, Image, TextInput, StatusBar, TouchableOpacity, Pressable, Alert, ActivityIndicator, Animated } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Octicons from '@expo/vector-icons/Octicons';
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';
import { useState, useRef, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useAuth } from '../context/authContext';

export default function SignUp() {
  const router = useRouter();
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [profileFocused, setProfileFocused] = useState(false);

  const emailRef = useRef('');
  const passwordRef = useRef('');
  const useref = useRef('');
  const profileRef = useRef('');

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const handleRegister = async () => {
    if (!emailRef.current || !passwordRef.current || !useref.current ) {
      Alert.alert('Sign Up', 'Please fill all the fields!');
      return;
    }

    setLoading(true);
    if(!profileRef.current) profileRef.current='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF02Jj8T2t7PdkytAw42HDuuSz7yXguKn8Lg&s';
    const response = await register(emailRef.current, passwordRef.current, useref.current, profileRef.current);
    setLoading(false);

    if (!response || !response.success) {
      Alert.alert('Sign Up', response?.msg || 'Unknown error');
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <LinearGradient colors={['#f8fafc', '#e2e8f0', '#f1f5f9']} style={{ flex: 1 }}>
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
            paddingTop: hp('10%'),
            paddingHorizontal: wp('8%'),
            flexGrow: 1,
            justifyContent: 'space-between',
          }}
        >
          {/* Header */}
          <View className="items-center mb-8">
            <View
              className="bg-white rounded-full shadow-lg mb-6"
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 10,
                elevation: 8,
                width: wp('50%'),
                height: wp('20%'),
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
              }}
            >
              <Image
                source={require('../assets/images/image.png')}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: wp('10%'),
                  resizeMode: 'cover',
                }}
              />
            </View>
            <Text style={{ fontSize: wp('7%'), fontWeight: '700', color: '#1e293b', marginTop: hp('1%') }}>Create Account</Text>
          </View>

          {/* Form Fields */}
          <View className="gap-5">
            {/* Username */}
            <View>
              <Text style={{ fontSize: wp('3.5%'), fontWeight: '600', color: '#374151', marginBottom: hp('0.7%') }}>Username</Text>
              <View style={{
                height: hp('7%'),
                backgroundColor: usernameFocused ? '#ffffff' : '#f8fafc',
                borderColor: usernameFocused ? '#6366f1' : '#e2e8f0',
                borderWidth: 2,
                borderRadius: 16,
                paddingHorizontal: wp('4%'),
                flexDirection: 'row',
                alignItems: 'center',
              }}>
                <Feather name="user" size={20} color={usernameFocused ? '#6366f1' : '#9ca3af'} />
                <TextInput
                  onChangeText={(value) => useref.current = value}
                  onFocus={() => setUsernameFocused(true)}
                  onBlur={() => setUsernameFocused(false)}
                  style={{ fontSize: hp('2%'), flex: 1, marginLeft: wp('2%'), color: '#1f2937' }}
                  placeholder='Enter username'
                  placeholderTextColor={'#9ca3af'}
                />
              </View>
            </View>

            {/* Email */}
            <View>
              <Text style={{ fontSize: wp('3.5%'), fontWeight: '600', color: '#374151', marginBottom: hp('0.7%') }}>Email Address</Text>
              <View style={{
                height: hp('7%'),
                backgroundColor: emailFocused ? '#ffffff' : '#f8fafc',
                borderColor: emailFocused ? '#6366f1' : '#e2e8f0',
                borderWidth: 2,
                borderRadius: 16,
                paddingHorizontal: wp('4%'),
                flexDirection: 'row',
                alignItems: 'center',
              }}>
                <Octicons name="mail" size={20} color={emailFocused ? '#6366f1' : '#9ca3af'} />
                <TextInput
                  onChangeText={(value) => emailRef.current = value}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                  style={{ fontSize: hp('2%'), flex: 1, marginLeft: wp('2%'), color: '#1f2937' }}
                  placeholder='Enter your email'
                  placeholderTextColor={'#9ca3af'}
                  keyboardType='email-address'
                  autoCapitalize='none'
                />
              </View>
            </View>

            {/* Password */}
            <View>
              <Text style={{ fontSize: wp('3.5%'), fontWeight: '600', color: '#374151', marginBottom: hp('0.7%') }}>Password</Text>
              <View style={{
                height: hp('7%'),
                backgroundColor: passwordFocused ? '#ffffff' : '#f8fafc',
                borderColor: passwordFocused ? '#6366f1' : '#e2e8f0',
                borderWidth: 2,
                borderRadius: 16,
                paddingHorizontal: wp('4%'),
                flexDirection: 'row',
                alignItems: 'center',
              }}>
                <Octicons name="lock" size={20} color={passwordFocused ? '#6366f1' : '#9ca3af'} />
                <TextInput
                  onChangeText={(value) => passwordRef.current = value}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  style={{ fontSize: hp('2%'), flex: 1, marginLeft: wp('2%'), color: '#1f2937' }}
                  placeholder='Enter your password'
                  placeholderTextColor={'#9ca3af'}
                  secureTextEntry={true}
                />
              </View>
            </View>

            {/* Profile URL */}
            <View>
              <Text style={{ fontSize: wp('3.5%'), fontWeight: '600', color: '#374151', marginBottom: hp('0.7%') }}>Profile URL</Text>
              <View style={{
                height: hp('7%'),
                backgroundColor: profileFocused ? '#ffffff' : '#f8fafc',
                borderColor: profileFocused ? '#6366f1' : '#e2e8f0',
                borderWidth: 2,
                borderRadius: 16,
                paddingHorizontal: wp('4%'),
                flexDirection: 'row',
                alignItems: 'center',
              }}>
                <Feather name="image" size={20} color={profileFocused ? '#6366f1' : '#9ca3af'} />
                <TextInput
                  onChangeText={(value) => profileRef.current = value}
                  onFocus={() => setProfileFocused(true)}
                  onBlur={() => setProfileFocused(false)}
                  style={{ fontSize: hp('2%'), flex: 1, marginLeft: wp('2%'), color: '#1f2937' }}
                  placeholder='Enter profile URL'
                  placeholderTextColor={'#9ca3af'}
                />
              </View>
            </View>
          </View>

          {/* Submit Button */}
          <View style={{ marginTop: hp('4%') }}>
            {loading ? (
              <View style={{ height: hp('7%'), borderRadius: 16, justifyContent: 'center', alignItems: 'center', backgroundColor: '#e2e8f0' }}>
                <ActivityIndicator size="small" color="#6366f1" />
              </View>
            ) : (
              <TouchableOpacity
                onPress={handleRegister}
                style={{ height: hp('7%'), borderRadius: 16, overflow: 'hidden', elevation: 4 }}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={["#6366f1", "#4f46e5", "#3730a3"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                >
                  <Text style={{ fontSize: wp('4.5%'), fontWeight: '700', color: '#ffffff' }}>
                    Sign Up
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            )}
          </View>

          {/* Already have account */}
          <View className="flex-row justify-center mt-6 pb-6">
            <Text style={{ fontSize: wp('3.5%'), color: '#6b7280' }}>Already have an account?</Text>
            <Pressable onPress={() => router.push('SignIn')}>
              <Text style={{ fontSize: wp('3.5%'), fontWeight: '700', color: '#6366f1', marginLeft: wp('1%') }}>Sign In</Text>
            </Pressable>
          </View>
        </Animated.View>
      </LinearGradient>
    </KeyboardAwareScrollView>
  );
}