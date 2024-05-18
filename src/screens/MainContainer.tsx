import * as React from 'react';
import { NavigationContainer, TabActions } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DefaultTheme, PaperProvider, useTheme } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MainNavigationTab } from '../navigation/MainNavigationTab';
import { AuthStack } from '../navigation/AuthStack';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../utils/store';
import { signIn } from '../utils/counter/authSlice';

const getValueFor = async (key: string) => {
    let result = await SecureStore.getItemAsync(key);
    console.log("🚀 ~ getValueFor ~ result 1:", result)
    return result;
  }

const MainContainer =  () => {
    const theme  = useTheme();
    const dispatch = useDispatch();
    
    const access_token = useSelector((state: RootState) => state.auth.access_token);
    // const access_token = null;
    // getValueFor('access_token');

    React.useEffect(() => {
        if(access_token === null || access_token == ''){
        
            getValueFor('access_token')
                .then((x)=> {
                    console.log('x', x);
                    
                    dispatch(signIn(x))
                })
                .catch((e)=> console.error(e))
        }
    }, [access_token]);

    console.log("🚀 ~ MainContainer ~ access_token:", access_token)
    
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider>
                {/* <PaperProvider theme={theme}> */}
                    <NavigationContainer>
                        {
                            access_token === null || access_token === '' ? <AuthStack /> : <MainNavigationTab />     
                        }  
                    </NavigationContainer>
                {/* </PaperProvider> */}
            </SafeAreaProvider>
        </GestureHandlerRootView>
    );
}

export { MainContainer }