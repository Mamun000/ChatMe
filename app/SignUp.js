import { View, Text, Image, TextInput, StatusBar, TouchableOpacity, Pressable, Alert, ActivityIndicator } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Octicons from '@expo/vector-icons/Octicons';
import { useRouter } from 'expo-router';
import { useState, useRef } from 'react';
import Feather from '@expo/vector-icons/Feather';
import CoustomKeyboardView from '../components/CoustomKeyboardView';
import { useAuth } from '../context/authContext';
export default function SignUp() {
    const router = useRouter();
    const {register}=useAuth();
    const [loading, setLoading] = useState(false);
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const useref=useRef('');
    const profileRef=useRef('');
    const handleRegister = async () => {
        if (!emailRef.current || !passwordRef.current || !useref.current || !profileRef) {
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

        // try {
        //     // Perform login logic here
        //     // Simulate delay
        //     setTimeout(() => {
        //         setLoading(false);
        //         Alert.alert('Success', 'Logged in!');
        //         // Navigate if needed
        //         // router.push('/Home');
        //     }, 2000);
        // } catch (err) {
        //     setLoading(false);
        //     Alert.alert('Error', 'Login failed!');
        // }
    };

    return (
        <CoustomKeyboardView>
            <StatusBar style="dark" />
            <View style={{ paddingTop: hp('7%'), paddingHorizontal: wp('5%') }} className="flex-1 gap-12">
                <View className="items-center">
                    <Image source={require('../assets/images/register.png')} style={{ width: wp('30%'), height: hp('10%') }} />
                </View>

                <View className="gap-10">
                    <View className='gap-4'>
                        <Text style={{ fontSize: wp('6%'), fontWeight: 'bold', color: '#000' }} className="text-center tracking-wide text-neutral-800">
                            Sign Up
                        </Text>

                        <View style={{ height: hp('7%') }} className="bg-neutral-200 rounded-full px-5 flex-row items-center gap-2">
                            <Feather name="user" size={24} color="gray" />
                            <TextInput
                                onChangeText={(value) => useref.current = value}
                                style={{ fontSize: hp('2%') }}
                                className="flex-1 font-semibold text-neutral-700"
                                placeholder='Username'
                                placeholderTextColor={'gray'}
                            />
                        </View>
                        <View style={{ height: hp('7%') }} className="bg-neutral-200 rounded-full px-5 flex-row items-center gap-2">
                            <Octicons name="mail" size={24} color="gray" />
                            <TextInput
                                onChangeText={(value) => emailRef.current = value}
                                style={{ fontSize: hp('2%') }}
                                className="flex-1 font-semibold text-neutral-700"
                                placeholder='Email address'
                                placeholderTextColor={'gray'}
                                keyboardType='email-address'
                            />
                        </View>
                        <View style={{ height: hp('7%') }} className="bg-neutral-200 rounded-full px-5 flex-row items-center gap-2">
                                <Octicons name="lock" size={24} color="gray" />
                                <TextInput
                                    onChangeText={(value) => passwordRef.current = value}
                                    style={{ fontSize: hp('2%') }}
                                    className="flex-1 font-semibold text-neutral-700"
                                    placeholder='Password'
                                    placeholderTextColor={'gray'}
                                    secureTextEntry={true}
                                />
                            </View>
                        <View style={{ height: hp('7%') }} className="bg-neutral-200 rounded-full px-5 flex-row items-center gap-2">
                            <Feather name="image" size={24} color="gray" />
                            <TextInput
                                onChangeText={(value) => profileRef.current = value}
                                style={{ fontSize: hp('2%') }}
                                className="flex-1 font-semibold text-neutral-700"
                                placeholder='Profile Url'
                                placeholderTextColor={'gray'}
                            />
                        </View>

                            
                            

                        <View>
                            {loading ? (
                                <View className="flex-row justify-center py-2">
                                    <ActivityIndicator size={hp('4%')} color="#6366f1" />
                                </View>
                            ) : (
                                <TouchableOpacity onPress={handleRegister} style={{ height: hp('6.5%') }} className="bg-indigo-500 rounded-xl justify-center items-center">
                                    <Text style={{ fontSize: hp('2.7%') }} className="text-white font-bold tracking-wide">
                                        Sign Up
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </View>

                        <View className="flex-row justify-center">
                            <Text style={{ fontSize: hp('1.8%') }} className="font-semibold text-neutral-500">Already have an account? </Text>
                            <Pressable onPress={() => router.push('SignIn')}>
                                <Text style={{ fontSize: hp('1.8%') }} className="font-bold text-indigo-500">Sign In</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        </CoustomKeyboardView>
    );
}
