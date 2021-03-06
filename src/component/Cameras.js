
import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View, Image, Alert } from 'react-native';
import { RNCamera } from 'react-native-camera';

export default class Cameras extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(prop) {
        super(prop)
        this.state = {
            Imagedata: ''
        }
    }

      UpfilePicture(PicturePath) {
        const datadate='testdatalinst.png';
        var Url = 'http://192.168.10.110:8080/readfile';
        let body = new FormData();
        body.append('file', { uri: PicturePath, name:datadate, 
        filename: 'imageName.png', type: 'image/png'}
        );
        body.append('Content-Type', 'image/png');
        fetch(Url, {
          method: 'POST', headers: {
            "Content-Type": "multipart/form-data",
            "otherHeader": "foo",
          }, body: body
        })
          .then((response) =>{
            console.log(response);
          } )
          .catch((e) => {
            console.log(e)
          })
      }
  

    render() {
        return (
            <View style={styles.container}>
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={styles.preview}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.on}
                    mirrorImage={false}
                    cropToPreview={false}
                    androidCameraPermissionOptions={{
                        title: 'Permission to use camera',
                        message: 'We need your permission to use your camera',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                    androidRecordAudioPermissionOptions={{
                        title: 'Permission to use audio recording',
                        message: 'We need your permission to use your audio',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                    onGoogleVisionBarcodesDetected={({ barcodes }) => {
                        console.log(barcodes);
                    }}
                />
                <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
                        <Text style={{ fontSize: 14 }}> ถ่าย </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    takePicture = async function () {
        const { navigate } = this.props.navigation;
        const data_params = this.props.navigation.state.params;
        if (this.camera) {
            const options = {
                quality: 0.5,
                base64: true,
                fixOrientation: true
            };
            
            const data = await this.camera.takePictureAsync(options);
            console.log(data);
          if(data.height > 4000 || data.width >3000){
            alert(data.height+''+data.width);
          }
          else{
              alert("ok");
          }

        }

    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
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
});
