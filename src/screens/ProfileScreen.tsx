import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { Button } from 'react-native-paper';
import { TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import * as SecureStore from 'expo-secure-store';

import { RootState } from '../utils/store';
import { signOut } from '../utils/counter/authSlice';
import { UploadImage } from '../components/UploadImage';



const ProfileScreen = () => {
    const access_token = useSelector((state: RootState) => state.auth.access_token);
    
    const dispatch = useDispatch();
    
    const handleSignOut = async () => {
        
        dispatch(signOut());
        await SecureStore.deleteItemAsync('access_token');
    }
    
    const getValueFor = async (key: string) => {
        let result = await SecureStore.getItemAsync('access_token');
        console.log("🚀 ~ getValueFor ~ result:", result)
        if (result) {
          alert("🔐 Here's your value 🔐 \n" + result);
        } else {
          alert('No values stored under that key.');
        }
      }
    
    const test = async () => {
        
        await getValueFor('access_token');
    }
    
    return (
        <View 
            style={styles.conatainer}
        >
            {/* <Text>Profile Screen</Text> */}
            {/* <Button
                mode='elevated'
                onPress={() => {
                    console.log('presaccess', access_token);
                }}
            >
                access token
            </Button>

            <Button
                mode='elevated'
                onPress={() => test()}
            >
                test
            </Button> */}

            <UploadImage />

            <Button
                mode='elevated'
                onPress={() => handleSignOut()}
                style={styles.btnSignOut}
            >
                Sign Out
            </Button>

        </View>
    );
};

const styles = StyleSheet.create({
    conatainer: {
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        // alignItems:'stretch',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 15
    },
    btnSignOut: {
        // width: '100%'
    },
    footer: {
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        // alignItems:'stretch',
        justifyContent: 'flex-start',
        gap: 15
    }
})

export { ProfileScreen };