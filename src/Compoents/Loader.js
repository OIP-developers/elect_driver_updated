import { StyleSheet, Text, View ,ActivityIndicator} from 'react-native'
import React from 'react'
import { responsiveFontSize } from 'react-native-responsive-dimensions'

export default function Loader({color,size}) {
  return (
    <View style={styles.con}>
      <ActivityIndicator size={responsiveFontSize(size?size:4)} color={color ? color :"rgb(7, 13, 46)"}/>
    </View>
  )
}

const styles = StyleSheet.create({
    con:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        // backgroundColor:'white',
    }
})