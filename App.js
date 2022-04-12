import { registerRootComponent } from 'expo';
import { BarCodeScanner } from 'expo-barcode-scanner';
import React, { useEffect, useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { getData } from './helpers/getData';
import { updateData } from './helpers/updateData';
import { confs } from './configurations';
import axios from 'axios';

export default function App() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [text, setText] = useState('Not yet scanned');
    const [participantData, setParticipantData] = useState(null);

    const askForCameraPermission = () => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    };

    // Request Camera Permission
    useEffect(() => {
        askForCameraPermission();
    }, []);

    // useEffect(() => {
    //   async function fetchDataParticipant() {
    //     setParticipantData(null);
    //     setScanned(true);
    //     const res = await getData(text);
    //     setParticipantData(res.data[0]);
    //   };
    //   fetchDataParticipant();
    // }, [text]);

    // What happens when we scan the bar code
    const handleBarCodeScanned = ({ type, data }) => {
        setText(data);
        // console.log('Data: ' + data);
        async function fetchDataParticipant() {
            const base_url = confs['base_url'];
            axios
                .get(`${base_url}/participant/participant/${data}`)
                .then((res) => {
                    console.log(res.data.data[0]);
                    setParticipantData(res.data.data[0]);
                })
                .catch((err) => {
                    console.log(err.message);
                });
        }
        fetchDataParticipant();
        setScanned(true);
    };

    // Check permissions and return the screens
    if (hasPermission === null) {
        return (
            <View style={styles.container}>
                <Text>Requesting for camera permission</Text>
            </View>
        );
    }
    if (hasPermission === false) {
        return (
            <View style={styles.container}>
                <Text style={{ margin: 10 }}>No access to camera</Text>
                <Button
                    title={'Allow Camera'}
                    onPress={() => askForCameraPermission()}
                />
            </View>
        );
    }

    const scanAgainHandler = () => {
        setScanned(false);
        setParticipantData(null);
    };

    const toggleHandler = (val) => {
        participantData[val] = !participantData[val];
        console.log(val, participantData[val]);
        setParticipantData({ ...participantData });
    };

    const updateHandler = async () => {
        const base_url = confs['base_url'];
        try {
            axios
                .put(
                    `${base_url}/participant/participant/${participantData._id}`,
                    {
                        _id: participantData._id,
                        name: participantData.name,
                        registered: participantData.registered,
                        breakfast: participantData.breakfast,
                        lunch: participantData.lunch,
                        snacks: participantData.snacks,
                        dinner: participantData.dinner,
                        review1: participantData.review1,
                        review2: participantData.review2,
                        review3: participantData.review3,
                        review4: participantData.review4,
                    }
                )
                .then((res) => {
                    // console.log(res.data);
                    // setParticipantData();
                })
                .catch((err) => {
                    console.log(err.message);
                });
        } catch (e) {
            console.log(e);
        }
    };

    const RenderParticipant = () => {
        if (participantData === null) {
            return (
                <Text style={styles.maintext}>
                    Scan to see Participant Data
                </Text>
            );
        }
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.participantText} key='name'>
                        Name: {participantData.name}
                    </Text>
                    <Text style={styles.participantText} key='team'>
                        Team: {participantData.team}
                    </Text>
                    <Text
                        style={
                            participantData.registered
                                ? styles.good
                                : styles.bad
                        }
                        key='registered'
                        onPress={() => toggleHandler('registered')}>
                        Registered:{' '}
                        {participantData.registered
                            ? 'Completed'
                            : 'Not Completed'}
                    </Text>
                    <Text
                        style={
                            participantData.breakfast ? styles.good : styles.bad
                        }
                        key='breakfast'
                        onPress={() => toggleHandler('breakfast')}>
                        Breakfast:{' '}
                        {participantData.breakfast
                            ? 'Completed'
                            : 'Not Completed'}
                    </Text>
                    <Text
                        style={participantData.lunch ? styles.good : styles.bad}
                        key='lunch'
                        onPress={() => toggleHandler('lunch')}>
                        Lunch:{' '}
                        {participantData.lunch ? 'Completed' : 'Not Completed'}
                    </Text>
                    <Text
                        style={
                            participantData.snacks ? styles.good : styles.bad
                        }
                        key='snacks'
                        onPress={() => toggleHandler('snacks')}>
                        Snacks:{' '}
                        {participantData.snacks ? 'Completed' : 'Not Completed'}
                    </Text>
                    <Text
                        style={
                            participantData.dinner ? styles.good : styles.bad
                        }
                        key='dinner'
                        onPress={() => toggleHandler('dinner')}>
                        Dinner:{' '}
                        {participantData.dinner ? 'Completed' : 'Not Completed'}
                    </Text>
                    <Text
                        style={
                            participantData.review1 ? styles.good : styles.bad
                        }
                        key='review1'
                        onPress={() => toggleHandler('review1')}>
                        Review 1:{' '}
                        {participantData.review1
                            ? 'Completed'
                            : 'Not Completed'}
                    </Text>
                    <Text
                        style={
                            participantData.review2 ? styles.good : styles.bad
                        }
                        key='review2'
                        onPress={() => toggleHandler('review2')}>
                        Review 2:{' '}
                        {participantData.review2
                            ? 'Completed'
                            : 'Not Completed'}
                    </Text>
                    <Text
                        style={
                            participantData.review3 ? styles.good : styles.bad
                        }
                        key='review3'
                        onPress={() => toggleHandler('review3')}>
                        Review 3:{' '}
                        {participantData.review3
                            ? 'Completed'
                            : 'Not Completed'}
                    </Text>
                    <Text
                        style={
                            participantData.review3 ? styles.good : styles.bad
                        }
                        key='review4'
                        onPress={() => toggleHandler('review4')}>
                        Review 4:{' '}
                        {participantData.review3
                            ? 'Completed'
                            : 'Not Completed'}
                    </Text>
                    <Button
                        title={' Update '}
                        key='update'
                        onPress={() => updateHandler()}
                        color='tomato'
                    />
                </View>
            </ScrollView>
        );
    };

    // Return the View
    return (
        <View style={styles.container}>
            <View style={styles.barcodebox}>
                <BarCodeScanner
                    onBarCodeScanned={
                        scanned ? undefined : handleBarCodeScanned
                    }
                    style={{ height: 400, width: 400 }}
                />
            </View>
            {scanned && (
                <Button
                    title={'Scan again?'}
                    onPress={() => scanAgainHandler()}
                    color='tomato'
                />
            )}
            <RenderParticipant />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    maintext: {
        fontSize: 16,
        margin: 20,
        color: 'white',
    },
    participantText: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 20,
        margin: 10,
        paddingLeft: 30,
        paddingRight: 30,
        width: '100%',
        color: 'white',
        fontWeight: 'bold',
    },
    barcodebox: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 300,
        width: 300,
        overflow: 'hidden',
        borderRadius: 30,
        backgroundColor: 'tomato',
    },
    good: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        fontSize: 15,
        margin: 10,
        paddingLeft: 30,
        paddingRight: 30,
        borderWidth: 1,
        borderColor: 'thistle',
        borderRadius: 50,
        color: 'white',
        backgroundColor: 'green',
    },
    bad: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        fontSize: 15,
        margin: 10,
        paddingLeft: 30,
        paddingRight: 30,
        borderWidth: 1,
        borderColor: 'thistle',
        borderRadius: 50,
        color: 'white',
        backgroundColor: 'tomato',
    },
});

registerRootComponent(App);
