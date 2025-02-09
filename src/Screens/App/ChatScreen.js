import React, { useEffect, useState, useCallback, useContext } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import io from 'socket.io-client';
import { AuthContext } from '../../context/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
// import { RECEIVE_MESSAGES, SendMessage } from '../../redux/actions/ride.action';
import { RECEIVE_MESSAGES, SendMessage } from '../../redux/actions/driver.action';
import { Image, TouchableOpacity, View } from 'react-native';
import { Platform,Keyboard } from 'react-native';



const ChatScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([]);

  const { socket } = useContext(AuthContext)
  const RideDEtail = useSelector((state) => state?.auth?.ride?.ride)
  const dispatch = useDispatch()

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true); // or some other action
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false); // or some other action
            }
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

  socket.on('LISTEN_ROOM_MESSAGE', (data) => {
    console.log('LISTEN_ROOM_MESSAGE', data);
    receiving()
  });
  useEffect(() => {
    receiving()

  }, [])
  const Sending = (msggggg) => {
    const msg = {
      message: msggggg,
    }
    dispatch(SendMessage(RideDEtail?.id, msg))
    receiving()
  }
  const receiving = async () => {
    console.log("BARA HOGTA BGDJGAG")
    const data = await dispatch(RECEIVE_MESSAGES(RideDEtail?.id))
    console.log("MYMESSAGES SHOWWWWWWW", data.data.data.sendMsg)
    const jjjj = data.data.data.sendMsg.map((msg) => {
      return {
        _id: msg.id,
        text: msg?.message,
        createdAt: msg?.createdAt,
        user: {
          _id: msg?.sender?.id,
          name: msg?.sender?.first_name + " " + msg?.sender?.last_name

        },
      }
    })
    setMessages(jjjj)
    // setMM(data)
  }

  // socket.on('LISTEN_ROOM_MESSAGE', (data) => {
  //   console.log('LISTEN_ROOM_MESSAGE', data);
  //   // receiving()
  // });

  const onSend = useCallback((messages = []) => {
    console.log("kojaa hai tou", messages)
    // Send the message to the server
    const eventData = {
      id: RideDEtail?.id,
      userId: RideDEtail?.driverId,
      message: messages[0]?.text
    };
    const eventName = 'SEND_MESSAGE_ROOM';
    // Emit the event to the server
    socket.emit(eventName, JSON.stringify(eventData));
    Sending(messages[0]?.text)

  }, [])

  return (
    <>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <TouchableOpacity
        style={{ margin: 5, marginTop: Platform.OS == "ios" ? 25 : null }}
        onPress={() => { navigation.goBack() }}
      >
        <Image
          source={require("../../assets/images/leftArrow.png")}
        />
      </TouchableOpacity>
      {
                    isKeyboardVisible && (
                        <TouchableOpacity
                            style={{ margin: 5, marginTop: Platform.OS == "ios" ? 25 : null }}
                            onPress={() => { Keyboard.dismiss() }}
                        >
                            <Image

                                style={{ width: 25, height: 25, marginTop: Platform.OS == "ios" ? 25 : null, margin: 5 }}
                                source={require("../../assets/images/keyboard.png")}
                            />
                        </TouchableOpacity>
                    )
                }
      </View>
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{
          _id: RideDEtail?.driverId, // Replace with the user ID
          name: RideDEtail?.user?.first_name, // Replace with the user name
        }}
      />
    </>

  );
};

export default ChatScreen;
