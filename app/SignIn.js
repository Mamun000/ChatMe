import { View, Text, Image, TextInput, StatusBar, TouchableOpacity, Pressable, Alert, ActivityIndicator } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Octicons from '@expo/vector-icons/Octicons';
import { useRouter } from 'expo-router';
import { useState, useRef } from 'react';
import {useAuth} from "../context/authContext";
export default function SignIn() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const {login}=useAuth();

    const emailRef = useRef('');
    const passwordRef = useRef('');
   

    const handleLogin = async () => {
        if (!emailRef.current || !passwordRef.current) {
            Alert.alert('Sign In', "Please fill all the fields!");
            return;
        }

        setLoading(true);

        const response=await login(emailRef.current,passwordRef.current);
        setLoading(false);
        console.log('Sign in response',response);
        if(!response.success){
            Alert.alert('Sign In',response.msg);
        }

        
    };

    return (
        <View className="flex-1 bg-white">
            <StatusBar style="dark" />
            <View style={{ paddingTop: hp('8%'), paddingHorizontal: wp('5%') }} className="flex-1 gap-12">
                <View className="items-center">
                    <Image source={require('../assets/images/login.png')} style={{ width: wp('30%'), height: hp('10%') }} />
                </View>

                <View className="gap-10">
                    <View className='gap-4'>
                        <Text style={{ fontSize: wp('6%'), fontWeight: 'bold', color: '#000' }} className="text-center tracking-wide text-neutral-800">
                            Sign in
                        </Text>

                        <View style={{ height: hp('7%') }} className="bg-neutral-200 rounded-full px-5 flex-row items-center gap-2">
                            <Octicons name="mail" size={24} color="gray" />
                            <TextInput
                                onChangeText={(value) => emailRef.current = value}
                                style={{ fontSize: hp('2%') }}
                                className="flex-1 font-semibold text-neutral-700"
                                placeholder='Email Address'
                                placeholderTextColor={'gray'}
                                keyboardType='email-address'
                            />
                        </View>

                        <View className="gap-4">
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
                            <Text style={{ fontSize: hp('1.8%') }} className="font-semibold text-right text-neutral-500">
                                Forgot Password?
                            </Text>
                        </View>

                        <View>
                            {loading ? (
                                <View className="flex-row justify-center py-2">
                                    <ActivityIndicator size={hp('4%')} color="#6366f1" />
                                </View>
                            ) : (
                                <TouchableOpacity onPress={handleLogin} style={{ height: hp('6.5%') }} className="bg-indigo-500 rounded-xl justify-center items-center">
                                    <Text style={{ fontSize: hp('2.7%') }} className="text-white font-bold tracking-wide">
                                        Sign in
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </View>

                        <View className="flex-row justify-center">
                            <Text style={{ fontSize: hp('1.8%') }} className="font-semibold text-neutral-500">Don't have an account? </Text>
                            <Pressable onPress={() => router.push('SignUp')}>
                                <Text style={{ fontSize: hp('1.8%') }} className="font-bold text-indigo-500">Sign Up</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}
