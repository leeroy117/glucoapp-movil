
import { useNavigation } from '@react-navigation/native';
import react, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import { TextInput } from 'react-native';

import { AuthStackParamList } from '../../navigation/AuthStack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

import { BASE_URL_V1 } from '../../utils/environment';
import { useDispatch } from 'react-redux';
import { signIn } from '../../utils/counter/authSlice';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';

type authScreenProp = NativeStackNavigationProp<AuthStackParamList, 'SignInScreen'>;

async function save(key: string, value: string) {
    console.log('token', value);
    
    // SecureStore.ALWAYS;
    await SecureStore.setItemAsync(key, value, {
        keychainAccessible: SecureStore.ALWAYS_THIS_DEVICE_ONLY
    });
  }
  
async function getValueFor(key: string) {
    let result = await SecureStore.getItemAsync(key);
    console.log("🚀 ~ getValueFor ~ result:", result);
    if (result) {
        alert("🔐 Here's your value 🔐 \n" + result);
    } else {
        alert('No values stored under that key.');
    }
}
  

const SignInScreen = () => {
    const theme = useTheme();
    const navigation = useNavigation<authScreenProp>();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [key, onChangeKey] = useState('access_token');
    const [value, onChangeValue] = useState('');

    const dispatch = useDispatch();

    // useEffect(( )=> {
    //     save(key, value);
    // },[value,key]);

    const handleOnPress = () => {
        navigation.navigate('SignUpScreen');
    }

    const login = () => {
        const endpoint = `${BASE_URL_V1}/auth/login`;
        axios.post(endpoint, {
            username: username,
            password: password
        })
        .then((result) => {

            if(result.status === 200){
                save(key, result.data.access_token);
                onChangeKey('access_token');
                onChangeValue(result.data.access_token);
    
                const access_token: string = result.data.access_token;
    
                dispatch(signIn(access_token));
            }
        })
        .catch((e) => {
             console.error(e);
         });
    }

    return (
        <View style={{
            flex: 1,
            flexDirection: 'column-reverse',
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: '#efefef',
            // position: 'relative',
            // paddingTop: 100
        }}>
            {/* <Text style={{
                    color: 'white',
                    fontSize: 30,
                    fontWeight: 'bold'
                }}>
                    Sign In
                </Text> */}
            {/* 
           background: rgb(16,67,159);
background: radial-gradient(circle, rgba(16,67,159,1) 0%, rgba(135,76,204,1) 100%);
            */}


            <LinearGradient
                  colors={['rgba(16,67,159,1)', 'rgba(135,76,204,1)']}
                  style={styles.gradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
            >

                <View style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    height: '80%',
                    width: '100%',
                    // borderTopLeftRadius: 30,
                    // borderTopRightRadius: 30,
                    padding: 40,
                    gap: 20,
                    // paddingTop: 100
                }}>

                    <TextInput 
                        style={{
                            width: '100%',
                            backgroundColor: '#874ccc',
                            borderRadius: 10,
                            padding: 10,
                            height: 50,
                            fontSize: 16,
                            borderColor: '#E4F1F4',
                            color: '#15F5BA'
                        }}
                        placeholder='John117'
                        placeholderTextColor='#15F5BA'
                        value={username}
                        onChangeText={(text) => setUsername(text) }
                    />

                    <TextInput 
                        style={{
                            width: '100%',
                            backgroundColor: '#874ccc',
                            color: '#15F5BA',
                            borderRadius: 10,
                            padding: 10,
                            height: 50,
                            fontSize: 16,
                        }}
                        placeholder='*********'
                        placeholderTextColor='#15F5BA'
                        value={password}
                        onChangeText={(text) => setPassword(text) }
                    />

                    <Button  
                        mode="elevated"
                        labelStyle={{
                            fontSize: 16,
                            color: '#15F5BA',
                        }}
                        onPress={() => login()}
                        style={{
                            width: '100%',
                            backgroundColor: '#10439F',
                            // backgroundColor: '#0A5F7B',
                        }}
                    >
                        Login
                    </Button>

                    {/* <Button  
                        mode="elevated"
                        onPress={() =>{
                            getValueFor('access_token')
                        }}
                        style={{
                            width: '100%',
                            // backgroundColor: '#0A5F7B',
                        }}
                    >
                        Get token
                    </Button> */}

                    <Text
                        variant='titleSmall'
                        onPress={() => handleOnPress()}
                        style={{
                            color: '#15F5BA'
                        }}
                    >Aren't user? Create an account</Text>
                </View>

            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
        opacity: 0.8, // Ajusta la opacidad según sea necesario
        display: 'flex',
        // flexDirection: 'column',
        // justifyContent: 'center',
        // alignItems: 'center',
        paddingTop: 200,
        paddingBottom: 100,
      },
    linearGradient: {
      flex: 1,
    },
  });
export { SignInScreen };