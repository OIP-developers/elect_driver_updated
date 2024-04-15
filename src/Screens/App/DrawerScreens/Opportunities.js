import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Dimensions, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '../../../assets/Colors/Colors'
import { InfoInput } from '../../../Compoents/Inputs/Inputs'
import { PrimaryButton } from '../../../Compoents/Buttons/BTN'
import { useDispatch, useSelector } from 'react-redux'
import { ResetPassword } from '../../../redux/actions/user.action'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { responsiveHeight } from 'react-native-responsive-dimensions'
import ValidatePassword from '../../../utils/validatePassword'
const { height, width } = Dimensions.get("window")
const Opportunities = ({ navigation }) => {
    const [edit, setedit] = useState(false)
    const [oldPass, setoldPass] = useState()
    const [newPass, setnewPass] = useState()
    const [cNewPass, setcNewPass] = useState()
    const [message, setmessage] = useState(null)
    const [show, setshow] = useState(true)
    const [Loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const Country = useSelector((state) => state?.auth?.Country?.toUpperCase())
    const [passwordError, setPasswordError] = useState('')

    const ChangePassword = () => {
        const data = {
          oldPassword: oldPass,
          password: newPass,
        }
        if (!ValidatePassword(oldPass) && !ValidatePassword(newPass) && !ValidatePassword(cNewPass) && cNewPass==newPass) {
          setLoading(true)
          dispatch(ResetPassword(data, Toast, navigation, setLoading))
        }
      }



    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: Colors.bg }}
        >

            <View
                style={{ flexDirection: "row", alignItems: "center", padding: width * 0.0325 }}
            >
                <TouchableOpacity
                    onPress={() => { navigation.goBack() }}
                >
                    <Image
                        style={{ resizeMode: "contain" }}
                        source={require("../../../assets/images/back.png")}
                    />
                </TouchableOpacity>
                <Text
                    style={{ fontFamily: "Poppins-Bold", color: Country == "UKRAINE" ? Colors.Bluetheme : Colors.theme, fontSize: width * 0.045, marginLeft: width * 0.025, width: width * 0.7 }}
                >
                    {Country == "UKRAINE" ? "Конфіденційність і безпека" : "Privacy & Security"}
                </Text>
                <TouchableOpacity
                    disabled={edit == false ? false : true}
                    onPress={() => { setedit(true) }}
                >
                    <Image
                        style={{ resizeMode: "contain", tintColor: edit == true ? Colors.placeholder : null }}
                        source={Country == "UKRAINE" ? require("../../../assets/images/DrawerIcon/editukr.png") : require("../../../assets/images/DrawerIcon/edit.png")}
                    />
                </TouchableOpacity>
            </View>
            <Toast ref={(ref) => { Toast.setref(ref) }} />
            <ScrollView>
                <View
                    style={{ marginTop: responsiveHeight(2) }}
                >
          <View style={{ width: '85%', alignSelf: 'center' }}>
            <Text style={{ color: 'gray', textAlign: 'justify' }}>Choose a password that is at least 8 characters long and nclude at least one uppercase letter and number</Text>
          </View>
                    <InfoInput
                    error={oldPass && ValidatePassword(oldPass)}
                        value={oldPass}
                        // source={require("../../../assets/images/profile.png")}
                        editable={edit}
                        onChangeText={setoldPass}
                        placeholder={Country == "UKRAINE" ? "Старий пароль" : "Old Password"}
                        secureTextEntry={show}
                    />
                    <InfoInput
                        value={newPass}
                        // source={require("../../../assets/images/profile.png")}
                        editable={edit}
                        error={newPass && ValidatePassword(newPass)}
                        onChangeText={setnewPass}
                        secureTextEntry={show}
                        placeholder={Country == "UKRAINE" ? "Новий пароль" : "New Password"}
                    />
                    <InfoInput
                        value={cNewPass}
                        // source={require("../../../assets/images/profile.png")}
                        editable={edit}
                        error={cNewPass && ValidatePassword(cNewPass)}
                        placeholder={Country == "UKRAINE" ? "Підтвердити новий пароль" : "Confirm New Password"}
                        secureTextEntry={show}
                        onChangeText={setcNewPass}
                    />
                    <TouchableOpacity
                        onPress={() => { setshow(!show) }}
                    >
                                  {
            (newPass !== cNewPass && !ValidatePassword(cNewPass) && !ValidatePassword(newPass)) && (
              <View style={{ width: '85%', alignSelf: 'center' }}>
                <Text style={{ color: 'red', textAlign: 'justify' }}>Ensure your password matches the confirmation entry to proceed.</Text>
              </View>
            )
          }

                        <Text
                            style={{
                                color: Colors.text,
                                borderBottomColor: Colors.text,
                                borderBottomWidth: 1,
                                width: Country == "UKRAINE" ? width * 0.32 : width * 0.29,
                                marginLeft: width * 0.088,
                                marginTop: height * 0.0125,
                                fontFamily: "Poppins-Medium"
                            }}
                        >{show === true ? Country == "UKRAINE" ? "Показати пароль" : "Show Password" : Country == "UKRAINE" ? "Приховати пароль" : "Hide Password"}</Text>
                    </TouchableOpacity>
                    {/* <InfoInput
    value={"fkljsdgfkjgsa"}
    source={require("../../../assets/images/profile.png")}
    editable={edit}
/> */}
                    {
                        edit == true ? <PrimaryButton
                            onPress={() => { ChangePassword() }}
                            title={Loading == true ? <ActivityIndicator size={'small'} color={"#ffffff"} /> : Country == "UKRAINE" ? "зберегти" : "Save"} /> : null
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Opportunities

const styles = StyleSheet.create({})