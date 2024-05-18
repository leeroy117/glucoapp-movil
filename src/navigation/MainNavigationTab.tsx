
import { NavigationContainer, TabActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { BloodTestStack } from './BloodTestStack';
import { ProfileScreen } from '../screens/ProfileScreen';
import { useTheme } from 'react-native-paper';
import 'react-native-reanimated'

const Tab = createBottomTabNavigator();

const homeName = 'Home';
const detailsName = 'Details';

const MainNavigationTab = () => {
    const theme  = useTheme();

    console.log('colrotheme', theme.colors.primary);
    

    return (
        <Tab.Navigator
                initialRouteName={homeName}
                screenOptions={({route}) => ({
                    tabBarIcon: ({ focused, color, size }) => {            
                        let iconName: string = '';
                        let rn: string = route.name;

                        if(rn === homeName) iconName = focused ? 'eyedrop' : 'eyedrop-outline';
                        if(rn === detailsName) iconName = focused ? 'person-circle': 'person-circle-outline';
                        // if(rn === settingsName) iconName = focused ? 'settings': 'settings-outline';
                        
                        return <Ionicons name={iconName} size={size} color={color} />
                    },
                    tabBarActiveTintColor: '#874CCC',
                    tabBarInactiveTintColor: 'black',
                    tabBarLabelStyle: {
                        fontSize: 12,
                        alignContent: 'flex-start',
                        justifyContent: 'flex-start',
                        paddingBottom: 10,
                        // backgroundColor: '#272727'
                    },
                    tabBarStyle: {
                        padding: 10,
                        height: 100,
                        backgroundColor: '#D6D6D6',
                        // backgroundColor: theme.colors.primary,
                    },
                    // headerBackgroundContainerStyle: '#272727'
                    tabBarActiveBackgroundColor: '#D6D6D6',
                    // tabBarActiveBackgroundColor: theme.colors.primary,
                    tabBarInactiveBackgroundColor: '#D6D6D6',
                    // tabBarInactiveBackgroundColor: theme.colors.primary,
                    
                    
                })}
        >
                            {/* <Tab.Screen name={homeName} component={HomeScreen} /> */}
            <Tab.Screen 
                name={homeName} 
                component={BloodTestStack} 
                
                options={{
                        headerShown: false,
                    }}

            />
            <Tab.Screen 
                name={detailsName} 
                component={ProfileScreen} 
                options={{tabBarLabel: 'Profile'}}
            />
        </Tab.Navigator>  
    );
}

export { MainNavigationTab };