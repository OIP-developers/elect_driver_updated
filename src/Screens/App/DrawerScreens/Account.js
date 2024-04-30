import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Dimensions, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { PrimaryButton } from '../../../Compoents/Buttons/BTN'
import Colors from '../../../assets/Colors/Colors'
import { useDispatch, useSelector } from 'react-redux'
import { FundDonation, SavedCards } from '../../../redux/actions/driver.action'
import { responsiveHeight } from 'react-native-responsive-dimensions'
import DropDownPicker from 'react-native-dropdown-picker';
import Loader from '../../../Compoents/Loader'
const { height, width } = Dimensions.get("window")
const Account = ({ navigation }) => {
    const [tip, settip] = useState(0)
    const [des, setDes] = useState("")
    const [done, setdone] = useState(false)
    const Country = useSelector((state) => state?.auth?.Country?.toUpperCase())

    const [loading, setLoading] = useState(true)

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);


    const dispatch = useDispatch()
    const ProceedFundPAyment = () => {
        const data = {
            amount: tip * 100,
            description: des,
            cardId: value
        }
        if (tip > 0 && value && des) {
            setLoading(true)
            dispatch(FundDonation(data, navigation, setdone, setLoading))
        }
    }

    useEffect(() => {
        dispatch(SavedCards()).then(data => {
            setItems(data?.data?.data?.paymentMethod?.map((it) => {
                return { label: "**** **** **** **** " + it?.card?.last4, value: it?.id }
            }))
            setLoading(false)
        })
    }, [])


    useEffect(() => {
        if (done == true) {
            setTimeout(function () {
                navigation.navigate("Home")
                setdone(false)
            }, 2000);

        }
    }, [done])

    if (loading) {
        return <Loader />
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
                    {Country == "UKRAINE" ? "Пожертвування" : " Donation"}
                </Text>

            </View>
            {
                done == false ?
                    <>
                        <Image
                            style={{
                                resizeMode: "contain",
                                alignSelf: "center",

                            }}
                            source={require("../../../assets/images/DrawerIcon/donate.png")}
                        />
                        <Text
                            style={{
                                fontSize: width * 0.035,
                                alignSelf: "center",
                                fontFamily: "Poppins-Bold",
                                color: Country == "UKRAINE" ? Colors.Yellow : Colors.Orange,
                                marginTop: -height * 0.012
                            }}
                        >
                            HOPP-E
                        </Text>
                        <Text
                            style={{
                                fontSize: width * 0.04,
                                alignSelf: "center",
                                fontFamily: "Poppins-Bold",
                                color: Country == "UKRAINE" ? Colors.Bluetheme : Colors.theme,
                                marginTop: -height * 0.012,
                                marginTop: height * 0.035
                            }}
                        >
                            {Country == "UKRAINE" ? "Скільки ви хочете пожертвувати?" : "How much you want to donate?"}
                        </Text>
                        <View
                            style={{
                                borderWidth: 1,
                                width: width * 0.7,
                                alignSelf: "center",
                                borderRadius: width * 0.025,
                                borderColor: Colors.placeholder,
                                marginTop: responsiveHeight(2),
                                paddingLeft: width * 0.0145,
                                backgroundColor: 'white'
                            }}
                        >
                            <TextInput
                                style={{ width: width * 0.65, color: "#000000", height: height * 0.05 }}
                                placeholder={Country == "UKRAINE" ? "₴ Введіть суму" : '$ Enter Amount'}
                                placeholderTextColor={"grey"}
                                keyboardType='number-pad'
                                onChangeText={settip}
                                value={tip}
                            />
                        </View>
                        <View
                            style={{
                                borderWidth: 1,
                                width: width * 0.7,
                                alignSelf: "center",
                                borderRadius: width * 0.025,
                                borderColor: Colors.placeholder,
                                marginTop: responsiveHeight(2),
                                paddingLeft: width * 0.0145,
                                backgroundColor: 'white'
                            }}
                        >
                            <TextInput
                                style={{ width: width * 0.65, color: "#000000", textAlignVertical: 'top' }}
                                placeholder={Country == "UKRAINE" ? "опис" : 'Description'}
                                placeholderTextColor={"grey"}
                                keyboardType='number-pad'
                                multiline={true}
                                numberOfLines={4}
                                onChangeText={setDes}
                                value={des}
                            />
                        </View>
                        <View
                            style={{
                                width: width * 0.7,
                                alignSelf: "center",
                                borderColor: Colors.placeholder,
                                marginTop: responsiveHeight(2),
                                backgroundColor: 'white',
                                zIndex: 1
                            }}
                        >
                            <DropDownPicker
                                open={open}
                                value={value}
                                items={items}
                                setOpen={setOpen}
                                style={{ borderColor: Colors.placeholder, borderWidth: 1 }}
                                placeholderStyle={{ color: 'gray' }}
                                placeholder='Select card'
                                dropDownContainerStyle={{ borderColor: Colors.placeholder, borderWidth: 1 }}
                                setValue={setValue}
                                setItems={setItems}
                            />
                        </View>
                        <PrimaryButton
                            onPress={() => { ProceedFundPAyment() }}
                            title={Country == "UKRAINE" ? "Пожертвуйте" : "Donate"}
                        /></> : <>
                        <Image
                            source={Country == "UKRAINE" ? require("../../../assets/images/paymentdoneukr.png") : require("../../../assets/images/psymentdone.png")}
                        />
                        <Text
                            style={{
                                fontSize: width * 0.04,
                                fontFamily: "Poppins-Bold",
                                alignSelf: "center",
                                color: Country == "UKRAINE" ? Colors.Bluetheme : Colors.theme,
                            }}
                        >
                            {Country == "UKRAINE" ? "Дякуємо, що пожертвували нам" : "Thank You For Donating us"}
                        </Text>
                    </>
            }
        </SafeAreaView>
    )
}

export default Account

const styles = StyleSheet.create({})