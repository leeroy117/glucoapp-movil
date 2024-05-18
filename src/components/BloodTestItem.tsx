import React from 'react';
import { Button, Card, Dialog, IconButton, Menu, Portal, Text, useTheme } from 'react-native-paper';
import { IBloodTest } from '../interfaces/BloodTest.interface';
import moment, { Moment, locale } from 'moment';
import 'moment/locale/es';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { GestureResponderEvent, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/BloodTestStack';
import { getLocaleData } from '../utils/datesLocale';
import axios from 'axios';
import { BASE_URL_V1 } from '../utils/environment';
import { useDispatch } from 'react-redux';
import { deleteBloodTest } from '../utils/counter/bloodTestSlice';

interface IProps {
    bloodTest: IBloodTest
}

type bloodTestScreenProp = NativeStackNavigationProp<RootStackParamList, 'BloodTestScreen'>;

const BloodTestItem = ({ bloodTest }: IProps,) => {

    const theme = useTheme();

    const navigation = useNavigation<bloodTestScreenProp>();
    const [visible, setVisible] = React.useState(false);
    const [visibleDialog, setVisibleDialog] = React.useState(false);

  const showDialog = () => setVisibleDialog(true);

  const hideDialog = () => setVisibleDialog(false);
    

    const dispatch = useDispatch();
    
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    // const OnDetailsPress = () => {
    //     // console.log("🚀 ~ BloodTestItem ~ navigation:", navigation)
    //     navigation.navigate('BloodTestDetailsScreen', bloodTest);
    // }

    const handleOnPress = (buttonId: string) => {
        if(buttonId === 'btnDetails') {
            navigation.navigate('BloodTestDetailsScreen', bloodTest);
            setVisible(false);
        }
        if(buttonId === 'btnDelete') {
            showDialog();
            setVisible(false);
        }
    };

    const delBloodTest = () => {
        const endpoint = `${BASE_URL_V1}/blood-tests/${bloodTest.id}`;
        axios.delete(endpoint)
            .then((result) => {
                console.log(result.data);
                dispatch(deleteBloodTest(bloodTest.id || 0));
            })
            .catch((e) => {
                console.log(e);
            });
    }

    /**
     * Glucose color according with Pamdy
     * * */
    let color: string = '#D6D6D6';
    let leftColor: string = ''; 
    //high level
    if(bloodTest.result > 120){
        leftColor= '#FF801F';
    }

    //low level
    if(bloodTest.result < 80){
        leftColor = '#EEF651';
    }

    //good level
    if(bloodTest.result > 79 && bloodTest.result < 121){
        leftColor = '#FF33A3';
    }

    return (
        <View style={{width: '100%', paddingLeft: 10, paddingTop: 10, paddingRight: 10}}>
            <Card
                key={bloodTest.id}
                style={{
                    width: `100%`, 
                    display: 'flex', 
                    backgroundColor: color,
                    borderLeftColor: leftColor,
                    borderLeftWidth: 7,
                    borderBottomColor: leftColor,
                    borderBottomWidth: 2,
                }}
                mode='elevated'
                onPress={() => handleOnPress('btnDetails')}
                // key={x.id}
                // title={`${x.result} mg/dl`}
                // subtitle={moment(x.createdAt,'YYYY-MM-DD HH:mm:ss.SSSSSS').format('YYYY-MM-DD HH:mm:ss')}
                //   left={(props) => <Ionicons name={'eyedrop-outline'} size={30} /> }
                // right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => {}} />}
            >
                <Card.Title
                    style={{position: 'absolute'}} 
                    leftStyle={{position: 'relative', width: 30}}
                    titleStyle={{ fontSize: 18}}
                    title={`${bloodTest.result} mg/dl`} 
                    subtitle={getLocaleData(bloodTest.date)}                                                                                                                         
                    // subtitle={moment(bloodTest.date,'YYYY-MM-DD HH:mm:ss.SSSSSS').format('YYYY-MM-DD HH:mm:ss')}
                    left={(props) => <Ionicons name={'eyedrop-outline'} size={30} /> }
                    // right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => {}} />}
                    // style={{width: '100%'}}
                />
                
                <Card.Actions
                    // style={{}}
                >
                    <Menu
                        visible={visible}
                        onDismiss={closeMenu}
                        anchor={<IconButton icon="dots-vertical" onPress={openMenu} />}
                    >
                        <Menu.Item 
                            onPress={(e) => handleOnPress('btnDetails')} 
                            title="Details" 
                        />
                        {/* <Menu.Item onPress={OnDetailsPress} title="Details" /> */}
                        {/* <Menu.Item onPress={() => {}} title="Edit" /> */}
                        <Menu.Item 
                            onPress={(e) => handleOnPress('btnDelete')} 
                            title="Delete" 
                        />
                    </Menu>
                </Card.Actions>
            </Card>

            <Portal>
                <Dialog visible={visibleDialog} onDismiss={hideDialog}>
                    <Dialog.Title>Remove blood test</Dialog.Title>
                    <Dialog.Content>
                    <Text variant="bodyMedium">Would you like to remove this blood test?</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button labelStyle={{color: 'red'}} onPress={hideDialog}>Cancel</Button>
                        <Button onPress={delBloodTest}>Yes</Button>

                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    );
};

export { BloodTestItem };