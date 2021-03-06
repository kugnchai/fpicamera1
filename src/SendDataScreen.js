import React, { Component } from 'react';
import {
    AppRegistry, StyleSheet, Text, TouchableOpacity,
    View, Image, Alert, AsyncStorage, Modal, ScrollView, WebView, Button, NetInfo
} from 'react-native';
import { Savedatafull, Notification } from './component/potoSave';
import {
    Container, Header, Left, Body, Right, Icon, Title,
    CardItem, Card, Content, Input, Item, Radio, Thumbnail, Spinner
} from 'native-base';

export default class SendDataScreen extends React.Component {
    static navigationOptions = {
        title: 'หน้าบันทึกข้อมูล',
    };

    constructor(props) {
        super(props)
        this.state = {
            datanow: null,
            loading: true
        }
    }

    componentDidMount() {
        console.disableYellowBox = true;
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        var sec = new Date().getSeconds(); //Current Seconds

        var datanowdate = date + '-' + month + '-' + year + ':' + hours + ':' + min;
        this.setState({
            datanow: datanowdate,
            loading: false
        })

    }
    senddataTo() {
        const data_params = this.props.navigation.state.params;
        console.log(data_params.Leftsides[0]);

        NetInfo.getConnectionInfo().then((connectionInfo) => {
            if (connectionInfo.type == 'none') {

                Alert.alert('ไม่ได้เชื่อม INTERNET');
                return;
            }
            else if (connectionInfo.type == "cellular") {
                return Alert.alert('PRESS CONNECT WIFI ');
            }
            else {

                new Promise(function (resolve, reject) {
                    setTimeout(function () {
                        Savedatafull(data_params.frontends[0])

                    }, 500)
                })
                // new Promise(function (resolve, reject) {
                //     setTimeout(function () {
                //         Savedatafull(data_params.backends[0])
                //     }, 500)
                // })

                Alert.alert(
                    'บันทึก',
                    'ทำการบันทึกแล้ว',
                    [
                        { text: 'OK', onPress: () => this.callbackhome(data_params.frontends[0]) },
                    ]
                )

            }
        });

    }

    callbackhome(data_id) {

        console.log(data_id);

        new Promise(function (resolve, reject) {
            setTimeout(function () {
                AsyncStorage.multiRemove(['Container', 'seal', 'booking', 'InOut'], (err) => {
                    console.log('Local storage user info removed!');
                });
            }, 500)
        })
        if (data_id.Id_InOut == "In") {
            var dataOntification = Notification(data_id.id_contai)
            console.log('api ontification' + dataOntification);
            const { navigate } = this.props.navigation;
            navigate('Edit')
        }
        else {
            console.log('car cotainer out for compapany');
        }

    }

    render() {
        const data_params = this.props.navigation.state.params;

        if (this.state.loading == true) {
            return (
                <Container>

                    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                        <Spinner color='green' />
                    </View>

                </Container>
            )
        }
        else {
            return (
                <View style={{ flex: 1 }}>
                    <View style={{ margin: 5, backgroundColor: '#00897b', borderBottomRightRadius: 15, borderTopLeftRadius: 10 }}>
                        <Text style={{ fontSize: 16, color: '#e0f2f1', padding: 10 }}>แสดงข้อมูล เข้า/ ออก </Text>
                    </View>

                    <View style={{ flex: 0, flexDirection: 'row', margin: 1 }}>
                        <View style={{ flex: 1, backgroundColor: '#f48fb1', margin: 1 }}>
                            <Image source={{ uri: data_params.frontends[0].uri_Image }} style={{ resizeMode: 'stretch', height: 150, width: null, margin: 1 }} />
                        </View>
                        {/* <View style={{ flex: 1, backgroundColor: '#1e88e5', margin: 1 }}>
                            <Image source={{ uri: data_params.backends[0].uri_Image }} style={{ resizeMode: 'stretch', height: 150, width: null, margin: 1 }} />
                        </View> */}
                    </View>
                    <View style={{ flex: 1, marginTop: 5 }}>

                        <View style={{ flex: 1, margin: 1, backgroundColor: '#e8eaf6', borderRadius: 10, padding: 2 }}>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ marginRight: 10, fontSize: 15, color: '#455a64' }}> Container </Text>
                                <Text style={{ marginRight: 15, color: '#1985c1' }}>{data_params.frontends[0].id_contai}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ marginRight: 10, fontSize: 15, color: '#455a64' }}> Seal </Text>
                                <Text style={{ marginRight: 15, color: '#1985c1' }}>{data_params.frontends[0].id_seal}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ marginRight: 10, fontSize: 15, color: '#455a64' }}> Booking </Text>
                                <Text style={{ marginRight: 15, color: '#1985c1' }}>{data_params.frontends[0].id_booking}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ marginRight: 10, fontSize: 15, color: '#455a64' }}> Status </Text>
                                <Text style={{ marginRight: 15, color: '#1985c1' }}>{data_params.frontends[0].Id_InOut}</Text>

                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ marginRight: 10, fontSize: 15, color: '#455a64' }}> Date/time </Text>
                                <Text style={{ marginRight: 15, color: '#1985c1' }}>{this.state.datanow}</Text>
                            </View>

                        </View>

                        <TouchableOpacity onPress={() => this.senddataTo()} style={{
                            flex: 0, backgroundColor: '#4db6ac', padding: 5, margin: 5,
                            borderRadius: 10, alignItems: 'center', justifyContent: 'center'
                        }}>
                            <Text style={{ color: '#ffffff', fontSize: 16, margin: 5, padding: 5 }}>
                                บันทึก
                            </Text>
                        </TouchableOpacity>

                    </View>
                </View>
            )
        }
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        //    backgroundColor: 'black',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    },
    boxcamera1: {
        flex: 1,
        backgroundColor: '#e8eaf6',
        margin: 1,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,

    }

});