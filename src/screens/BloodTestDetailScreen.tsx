import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { GestureResponderEvent, NativeEventEmitter, StyleSheet, View } from 'react-native';
import { Button, TextInput, useTheme } from 'react-native-paper';
import { RootStackParamList } from '../navigation/BloodTestStack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DatePickerInput, TimePickerModal } from 'react-native-paper-dates';
import moment from 'moment';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../utils/store';
import { decrement, increment } from '../utils/counter/counterSlice';
import { updateBloodTest } from '../utils/counter/bloodTestSlice';

type bloodTestScreenProp = NativeStackNavigationProp<RootStackParamList, 'BloodTestScreen'>;

const BloodTestDetailScreen = () => {
    const navigation = useNavigation<bloodTestScreenProp>();
    const route = useRoute<RouteProp<RootStackParamList>>();

    const [result, setResult] = useState(route.params?.result.toString());
    const [observations, setObservations] = useState(route.params?.observations);
    
    const [visible, setVisible] = useState(false)

    const [inputDate, setInputDate] = useState<Date | undefined>(moment(route.params?.date).toDate())
    const [datetime, setDatetime] = useState<string>(moment(route.params?.date).format('YYYY-MM-DDTHH:mm:ss'));
    const [time, setTime] = useState<string>(moment(route.params?.date).format('HH:mm:ss'));

    const count = useSelector((state: RootState) => state.counter.value)
    const dispatch = useDispatch()

    const onDismiss = React.useCallback(() => {
      setVisible(false)
    }, [setVisible]);

    useEffect(() => {    
        const newData = `${moment(inputDate).format('YYYY-MM-DD')}T${time}`;
        console.log("🚀 ~ useEffect ~ newData:", newData)
        setDatetime(newData);
    }, [inputDate, visible, time]);

    const handleOnPress = (event: GestureResponderEvent, buttonId: string) => {
        if(buttonId === 'btnCancel') {
            navigation.goBack();
        }
        if(buttonId === 'btnSave') {
            sendData();
        }
    }

    const onConfirm = React.useCallback(
        ({ hours, minutes }: any) => {
            setVisible(false);

            const date = new Date();
            date.setHours(hours);
            date.setMinutes(minutes);
            setTime(moment(date).format('HH:mm:ss'));
            
        },
        [setVisible]
    );

    const sendData = () => {
        const date = moment(datetime).format('YYYY-MM-DDTHH:mm:ss');

        if(route.params?.id){
            dispatch(updateBloodTest({
                id: route.params.id,
                updatedBloodTest: {
                    id: route.params.id,
                    result: parseInt(result || '0'),
                    observations: observations || '',
                    date: date,
                    patientId: route.params?.patientId,
                    createdAt: route.params?.createdAt,
                    updatedAt: route.params?.updatedAt,
                }
            }));
        }
        
        axios.put('http://192.168.0.131:8080/api/v1/blood-tests/6', {
            result: result,
            observations: observations,
            date
        })
        .then((result) => { 
            navigation.goBack();
        })
        .catch(e => console.log('eeee',e))
    }

    return (
        <View style={styles.detailsScreen}>
            <TextInput
                style={styles.result}
                label="Result"
                value={result}
                onChangeText={result => setResult(result)}
            />

            <View
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 15,
                    marginTop: 30
                }}
            >
                
                <DatePickerInput
                    locale="en-GB"
                    label="Birthdate"
                    value={inputDate}
                    onChange={(d) => {
                        setInputDate(d);
                    }}
                    inputMode="start"
                />
                
                {/* time picker */}
                <Button 
                    onPress={() => setVisible(true)} 
                    uppercase={false} 
                    mode="elevated"
                    style={{marginTop: 25}}
                    
                >
                    Pick time
                </Button>
                
                <TimePickerModal
                    visible={visible}
                    onDismiss={onDismiss}
                    onConfirm={onConfirm}
                    hours={12}
                    minutes={14}
                />

                <TextInput
                    id='inputDatetime'
                    style={{width: '100%'}}
                    label="Time"
                    value={datetime}
                    // onFocus={() => setVisible(true)}
                    readOnly={true}
                />
                {/* ****************************************************** */}
            </View>
        
            
            <TextInput
                style={styles.observations}
                label="Observations"
                value={observations}
                onChangeText={observations => setObservations(observations)}
                multiline={true}
                numberOfLines={6}
            />

            <View style={styles.footer}>
                <Button 
                    id='btnCancel'
                    icon="cancel" 
                    mode="elevated" 
                    onPress={(event) => handleOnPress(event, 'btnCancel')}
                    style={styles.cancelButton}
                    textColor='white'
                >
                    Cancel
                </Button>
                <Button 
                    id='btnSave'
                    style={styles.saveButton}
                    icon="content-save-check-outline"
                    mode="elevated" 
                    onPress={(event) => handleOnPress(event, 'btnSave')}
                    textColor='white'
                >
                    Save
                </Button>

                
            </View>
            
        </View>
    );
};

const styles = StyleSheet.create({
    detailsScreen: {
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        // alignItems: 'stretch',
        justifyContent: 'flex-start',
        gap: 15
    },
    result: {
        width: '50%'
    },
    observations: {
        width: '100%',
        height: 100,
        textAlignVertical: 'top'
    },
    footer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
        gap: 15,
        width: '100%'
    },
    cancelButton: {
        width: '50%',
        backgroundColor: '#DD4625',
    },
    saveButton: {
        width: '50%',
        backgroundColor: 'green',
    }
});

export { BloodTestDetailScreen };