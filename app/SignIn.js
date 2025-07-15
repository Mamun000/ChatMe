import { View, Text, Image, TextInput, StatusBar, TouchableOpacity, Pressable, Alert, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, Animated } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Octicons from '@expo/vector-icons/Octicons';
import { useRouter } from 'expo-router';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from "../context/authContext";
import { LinearGradient } from 'expo-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
export default function SignIn() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuth();

    const emailRef = useRef('');
    const passwordRef = useRef('');
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

    const handleLogin = async () => {
        if (!emailRef.current || !passwordRef.current) {
            Alert.alert('Sign In', "Please fill all the fields!");
            return;
        }

        setLoading(true);

        const response = await login(emailRef.current, passwordRef.current);
        setLoading(false);
        //console.log('Sign in response', response);
        if (!response.success) {
            Alert.alert('Sign In', response.msg);
        }
    };

   return (
  <KeyboardAwareScrollView
    contentContainerStyle={{ flexGrow: 1 }}
    enableOnAndroid={true}
    keyboardShouldPersistTaps="handled"
    showsVerticalScrollIndicator={false}
  >
    <LinearGradient
      colors={['#f8fafc', '#e2e8f0', '#f1f5f9']}
      style={{ flex: 1 }}
    >
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
          paddingTop: hp('10%'),
          paddingHorizontal: wp('8%'),
          flexGrow: 1, // ensures layout fills space, but doesn't break scroll
          justifyContent: 'space-between', // pushes footer down naturally
        }}
      >
                        {/* Header Section */}
                        <View className="items-center mb-8">
  <View
    className="bg-white rounded-full  shadow-lg mb-6"
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
      overflow: 'hidden', // to clip the image
    }}
  >
    <Image
      source={require('../assets/images/image.png')}
      style={{
        width: '100%',
        height: '100%',
        borderRadius: wp('10%'), // Half of width/height to make it round
        resizeMode: 'cover',
      }}
    />
  </View>


                            
                            <Text style={{ 
                                fontSize: wp('8%'), 
                                fontWeight: '700',
                                color: '#1e293b',
                                marginBottom: hp('1%')
                            }}>
                                Welcome Back
                            </Text>
                            
                            <Text style={{ 
                                fontSize: wp('4%'), 
                                color: '#64748b',
                                textAlign: 'center',
                                lineHeight: wp('5%')
                            }}>
                                Sign in to your account to continue
                            </Text>
                        </View>

                        {/* Form Section */}
                        <View className="gap-6">
                            {/* Email Input */}
                            <View>
                                <Text style={{ 
                                    fontSize: wp('3.5%'), 
                                    fontWeight: '600',
                                    color: '#374151',
                                    marginBottom: hp('1%'),
                                    marginLeft: wp('2%')
                                }}>
                                    Email Address
                                </Text>
                                <View style={{ 
                                    height: hp('7%'),
                                    backgroundColor: emailFocused ? '#ffffff' : '#f8fafc',
                                    borderColor: emailFocused ? '#6366f1' : '#e2e8f0',
                                    borderWidth: 2,
                                    borderRadius: 16,
                                    paddingHorizontal: wp('4%'),
                                    shadowColor: emailFocused ? '#6366f1' : '#000',
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: emailFocused ? 0.1 : 0.05,
                                    shadowRadius: 8,
                                    elevation: emailFocused ? 4 : 2
                                }} className="flex-row items-center gap-3">
                                    <Octicons 
                                        name="mail" 
                                        size={20} 
                                        color={emailFocused ? '#6366f1' : '#9ca3af'} 
                                    />
                                    <TextInput
                                        onChangeText={(value) => emailRef.current = value}
                                        onFocus={() => setEmailFocused(true)}
                                        onBlur={() => setEmailFocused(false)}
                                        style={{ 
                                            fontSize: hp('2%'),
                                            flex: 1,
                                            color: '#1f2937'
                                        }}
                                        placeholder='Enter your email'
                                        placeholderTextColor={'#9ca3af'}
                                        keyboardType='email-address'
                                        autoCapitalize='none'
                                    />
                                </View>
                            </View>

                            {/* Password Input */}
                            <View>
                                <Text style={{ 
                                    fontSize: wp('3.5%'), 
                                    fontWeight: '600',
                                    color: '#374151',
                                    marginBottom: hp('1%'),
                                    marginLeft: wp('2%')
                                }}>
                                    Password
                                </Text>
                                <View style={{ 
                                    height: hp('7%'),
                                    backgroundColor: passwordFocused ? '#ffffff' : '#f8fafc',
                                    borderColor: passwordFocused ? '#6366f1' : '#e2e8f0',
                                    borderWidth: 2,
                                    borderRadius: 16,
                                    paddingHorizontal: wp('4%'),
                                    shadowColor: passwordFocused ? '#6366f1' : '#000',
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: passwordFocused ? 0.1 : 0.05,
                                    shadowRadius: 8,
                                    elevation: passwordFocused ? 4 : 2
                                }} className="flex-row items-center gap-3">
                                    <Octicons 
                                        name="lock" 
                                        size={20} 
                                        color={passwordFocused ? '#6366f1' : '#9ca3af'} 
                                    />
                                    <TextInput
                                        onChangeText={(value) => passwordRef.current = value}
                                        onFocus={() => setPasswordFocused(true)}
                                        onBlur={() => setPasswordFocused(false)}
                                        style={{ 
                                            fontSize: hp('2%'),
                                            flex: 1,
                                            color: '#1f2937'
                                        }}
                                        placeholder='Enter your password'
                                        placeholderTextColor={'#9ca3af'}
                                        secureTextEntry={!showPassword}
                                    />
                                    <TouchableOpacity 
                                        onPress={() => setShowPassword(!showPassword)}
                                        className="p-1"
                                    >
                                        <Octicons 
                                            name={showPassword ? "eye-closed" : "eye"} 
                                            size={18} 
                                            color="#9ca3af" 
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* Forgot Password */}
                            <TouchableOpacity className="self-end">
                                <Text style={{ 
                                    fontSize: wp('3.5%'),
                                    fontWeight: '600',
                                    color: '#6366f1'
                                }}>
                                    Forgot Password
                                </Text>
                            </TouchableOpacity>

                            {/* Sign In Button */}
                            <View style={{ marginTop: hp('2%') }}>
                                {loading ? (
                                    <View style={{ 
                                        height: hp('7%'),
                                        backgroundColor: '#e2e8f0',
                                        borderRadius: 16,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <ActivityIndicator size="small" color="#6366f1" />
                                    </View>
                                ) : (
                                    <TouchableOpacity 
                                        onPress={handleLogin}
                                        style={{
                                            height: hp('7%'),
                                            borderRadius: 16,
                                            overflow: 'hidden',
                                            shadowColor: '#6366f1',
                                            shadowOffset: { width: 0, height: 4 },
                                            shadowOpacity: 0.3,
                                            shadowRadius: 12,
                                            elevation: 8
                                        }}
                                        activeOpacity={0.8}
                                    >
                                        <LinearGradient
                                            colors={['#6366f1', '#4f46e5', '#3730a3']}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 1 }}
                                            style={{
                                                flex: 1,
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <Text style={{ 
                                                fontSize: wp('4.5%'),
                                                fontWeight: '700',
                                                color: '#ffffff',
                                                letterSpacing: 0.5
                                            }}>
                                                Sign In
                                            </Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                )}
                            </View>

                            {/* Divider */}
                            <View className="flex-row items-center gap-4" style={{ marginVertical: hp('3%') }}>
                                <View className="flex-1 h-px bg-gray-300" />
                                <Text style={{ 
                                    fontSize: wp('3%'),
                                    color: '#9ca3af',
                                    fontWeight: '500'
                                }}>
                                    or
                                </Text>
                                <View className="flex-1 h-px bg-gray-300" />
                            </View>

                            {/* Sign Up Link */}
                            <View className="flex-row justify-center items-center">
                                <Text style={{ 
                                    fontSize: wp('3.5%'),
                                    color: '#6b7280',
                                    fontWeight: '500'
                                }}>
                                    Don't have an account? 
                                </Text>
                                <Pressable onPress={() => router.push('SignUp')}>
                                    <Text style={{ 
                                        fontSize: wp('3.5%'),
                                        fontWeight: '700',
                                        color: '#6366f1',
                                        marginLeft: wp('1%')
                                    }}>
                                        Sign Up
                                    </Text>
                                </Pressable>
                            </View>
                        </View>

                        {/* Footer */}
                        <View style={{ paddingVertical: hp('4%') }}>
          <Text
            style={{
              fontSize: wp('3%'),
              color: '#9ca3af',
              textAlign: 'center',
              lineHeight: wp('4%'),
            }}
          >
            By signing in, you agree to our Terms of Service and Privacy Policy
          </Text>
        </View>
      </Animated.View>
    </LinearGradient>
  </KeyboardAwareScrollView>
);
}