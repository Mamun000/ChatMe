import { View, Text, Image, TextInput, StatusBar, TouchableOpacity, Pressable, Alert, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, Animated } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Octicons from '@expo/vector-icons/Octicons';
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';
import { useState, useRef, useEffect } from 'react';
import CoustomKeyboardView from '../components/CoustomKeyboardView';
import { useAuth } from '../context/authContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function SignUp() {
    const router = useRouter();
    const { register } = useAuth();
    const [loading, setLoading] = useState(false);
    const [focusedField, setFocusedField] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const useref = useRef('');
    const profileRef = useRef('');
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(30)).current;

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
        if (!emailRef.current || !passwordRef.current || !useref.current || !profileRef.current) {
            Alert.alert('Sign Up', "Please fill all the fields!");
            return;
        }

        setLoading(true);

        let response = await register(emailRef.current, passwordRef.current, useref.current, profileRef.current);
        setLoading(false);

        console.log('got result :', response);
        if (!response || !response.success) {
            Alert.alert('Sign Up', response?.msg || 'Unknown error');
        }
    };

    const InputField = ({ icon, placeholder, onChangeText, keyboardType = 'default', secureTextEntry = false, fieldName, iconLibrary = 'Octicons' }) => {
        const isPressed = focusedField === fieldName;
        const IconComponent = iconLibrary === 'Feather' ? Feather : Octicons;
        
        return (
            <View>
                <Text style={{ 
                    fontSize: wp('3.5%'), 
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: hp('1%'),
                    marginLeft: wp('2%')
                }}>
                    {placeholder}
                </Text>
                <View style={{ 
                    height: hp('7%'),
                    backgroundColor: isPressed ? '#ffffff' : '#f8fafc',
                    borderColor: isPressed ? '#6366f1' : '#e2e8f0',
                    borderWidth: 2,
                    borderRadius: 16,
                    paddingHorizontal: wp('4%'),
                    shadowColor: isPressed ? '#6366f1' : '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: isPressed ? 0.1 : 0.05,
                    shadowRadius: 8,
                    elevation: isPressed ? 4 : 2
                }} className="flex-row items-center gap-3">
                    <IconComponent 
                        name={icon} 
                        size={20} 
                        color={isPressed ? '#6366f1' : '#9ca3af'} 
                    />
                    <TextInput
                        onChangeText={onChangeText}
                        onFocus={() => setFocusedField(fieldName)}
                        onBlur={() => setFocusedField('')}
                        style={{ 
                            fontSize: hp('2%'),
                            flex: 1,
                            color: '#1f2937'
                        }}
                        placeholder={`Enter your ${placeholder.toLowerCase()}`}
                        placeholderTextColor={'#9ca3af'}
                        keyboardType={keyboardType}
                        secureTextEntry={secureTextEntry && !showPassword}
                        autoCapitalize={keyboardType === 'email-address' ? 'none' : 'words'}
                    />
                    {fieldName === 'password' && (
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
                    )}
                </View>
            </View>
        );
    };

    return (
  <CoustomKeyboardView>
    <LinearGradient
      colors={['#f8fafc', '#e2e8f0', '#f1f5f9']}
      style={{ flex: 1 }}
    >
      <StatusBar style="dark" />
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
          paddingTop: hp('8%'),
          paddingHorizontal: wp('8%'),
          flexGrow: 1,
          justifyContent: 'space-between',
        }}
      >
        {/* Header Section */}
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

          <Text
            style={{
              fontSize: wp('7%'),
              fontWeight: '700',
              color: '#1e293b',
              marginBottom: hp('0.5%'),
            }}
          >
            Create Account
          </Text>

          <Text
            style={{
              fontSize: wp('3.5%'),
              color: '#64748b',
              textAlign: 'center',
              lineHeight: wp('4.5%'),
            }}
          >
            Sign up to get started with your account
          </Text>
        </View>

        {/* Form Section */}
        <View className="gap-5">
          <InputField
            icon="user"
            placeholder="Username"
            onChangeText={(value) => (useref.current = value)}
            fieldName="username"
            iconLibrary="Feather"
          />
          <InputField
            icon="mail"
            placeholder="Email Address"
            onChangeText={(value) => (emailRef.current = value)}
            keyboardType="email-address"
            fieldName="email"
          />
          <InputField
            icon="lock"
            placeholder="Password"
            onChangeText={(value) => (passwordRef.current = value)}
            secureTextEntry={true}
            fieldName="password"
          />
          <InputField
            icon="image"
            placeholder="Profile URL"
            onChangeText={(value) => (profileRef.current = value)}
            fieldName="profile"
            iconLibrary="Feather"
          />

          {/* Terms */}
          <View
            className="flex-row items-start gap-3"
            style={{ marginTop: hp('1%') }}
          >
            <View className="mt-1">
              <Octicons name="info" size={16} color="#6366f1" />
            </View>
            <Text
              style={{
                fontSize: wp('3%'),
                color: '#6b7280',
                lineHeight: wp('4%'),
                flex: 1,
              }}
            >
              By creating an account, you agree to our Terms of Service and
              Privacy Policy
            </Text>
          </View>

          {/* Sign Up Button */}
          <View style={{ marginTop: hp('2%') }}>
            {loading ? (
              <View
                style={{
                  height: hp('7%'),
                  backgroundColor: '#e2e8f0',
                  borderRadius: 16,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <ActivityIndicator size="small" color="#6366f1" />
              </View>
            ) : (
              <TouchableOpacity
                onPress={handleRegister}
                style={{
                  height: hp('7%'),
                  borderRadius: 16,
                  overflow: 'hidden',
                  shadowColor: '#6366f1',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 12,
                  elevation: 8,
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
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{
                      fontSize: wp('4.5%'),
                      fontWeight: '700',
                      color: '#ffffff',
                      letterSpacing: 0.5,
                    }}
                  >
                    Create Account
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            )}
          </View>

          {/* Divider */}
          <View
            className="flex-row items-center gap-4"
            style={{ marginVertical: hp('2%') }}
          >
            <View className="flex-1 h-px bg-gray-300" />
            <Text
              style={{
                fontSize: wp('3%'),
                color: '#9ca3af',
                fontWeight: '500',
              }}
            >
              or
            </Text>
            <View className="flex-1 h-px bg-gray-300" />
          </View>

          {/* Sign In Link */}
          <View className="flex-row justify-center items-center">
            <Text
              style={{
                fontSize: wp('3.5%'),
                color: '#6b7280',
                fontWeight: '500',
              }}
            >
              Already have an account?
            </Text>
            <Pressable onPress={() => router.push('SignIn')}>
              <Text
                style={{
                  fontSize: wp('3.5%'),
                  fontWeight: '700',
                  color: '#6366f1',
                  marginLeft: wp('1%'),
                }}
              >
                Sign In
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Fixed Footer Spacing */}
        <View style={{ height: hp('5%') }} />
      </Animated.View>
    </LinearGradient>
  </CoustomKeyboardView>
);
}