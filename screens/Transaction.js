import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import *as Permissions from "expo-permissions";
import {BarCodeScanner} from "expo-barcode-scanner";

export default class TransactionScreen extends Component {
  constructor(props){
    super(props);
    this.state={
      domState: "normal",
      hasCameraPermissions: null,
      scanned: false,
      scannedData:"",
    }
  }

  getCameraPermissions = async domState =>{
    const {status}= await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermissions: status === "granted",
      domState: domState,
      scanned: false,
    })
  }

  handleBarCodeScanned=async(type,data)=>{
    this.setState({
      scannedData: data,
      domState: "normal",
      scanned: true,
    })
  }
    render() {
      const {domState,hasCameraPermissions,scannedData,scanned}=this.state;
      if(domState==="scanner"){
      return(
        <BarCodeScanner 
        onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}/> 
      )
      }

      return (
        <View style={styles.container}>
          <Text style={styles.text}>
          {hasCameraPermissions ? scannedData : "Solicitar permiso de la Cámara"}
          </Text>
          <TouchableOpacity style={styles.button}
          onPress={()=>this.getCameraPermissions("scanner")}>
          <Text style={styles.text}>Escanear código QR</Text>
          </TouchableOpacity>
          <Text style={styles.text}>Pantalla de transacción</Text>
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "blue"
    },
    text: {
      color: "black",
      fontSize: 30
    },
    button:{
      width: "43%",
      height: 55,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor:"grey",
      borderRadius:15,
    }
  });