import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AddBloodTestScreen } from '../screens/AddBloodTestScreen';
import { BloodTestScreen } from '../screens/BloodTestScreen';
import { BloodTestDetailScreen } from '../screens/BloodTestDetailScreen';
import { IBloodTest } from '../interfaces/BloodTest.interface';
import { useTheme } from 'react-native-paper';

export type RootStackParamList = {
    BloodTestScreen: undefined,
    AddBloodTestScreen: undefined,
    BloodTestDetailsScreen: IBloodTest;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const BloodTestStack = () => {

    const theme = useTheme();

    console.log('colorin stack', theme.colors.primary);
    
    return (
        <Stack.Navigator initialRouteName='BloodTestScreen'>
            <Stack.Screen 
                name='BloodTestScreen'
                component={BloodTestScreen}
                options={({route, navigation}) => ({
                    // headerShown: false,
                    title: 'Blood tests',
                    headerStyle: {
                        // backgroundColor: '#37B5B6'
                        // backgroundColor: theme.colors.primary
                        backgroundColor: '#E0E0E0',

                    },
                    headerTintColor: 'black',
                    headerTitleStyle: {
                        fontWeight: 'bold'
                    },
                    headerTitleAlign: 'center'
                })}
            />
            
            <Stack.Screen 
                name='AddBloodTestScreen' 
                component={AddBloodTestScreen}
                options={({route, navigation}) => ({
                    title: 'Add a blood test'
                })}
            />

           <Stack.Screen
                name='BloodTestDetailsScreen'
                component={BloodTestDetailScreen}
                options={({route, navigation}) => ({
                    title: 'Blood test details'
                })}
           />
        </Stack.Navigator>
    );
};

export { BloodTestStack };