/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component, PureComponent } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  Modal,
  FlatList,
  TouchableOpacity,
  PermissionsAndroid,
  ImageBackground,
  Image,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import { Header, Card, Button, Divider, Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import MakeDayModal from './MakeDayModal';
import TabBar from '../components/TabBar';

import * as colors from '../styles/colors';
import appStyles from '../styles/appStyles';

import { updateContacts } from '../actions/rootActions';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});

var Contacts = require('react-native-contacts');

type Props = {};

const mapStateToProps = state => ({
  token: state.token,
  contacts: state.contacts,
});

class MyListItem extends PureComponent {
  render() {
    const textColor = this.props.selected ? 'red' : 'black';
    return (
      <View>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 100,
            paddingHorizontal: 15,
          }}
        >
          <View>
            <Text style={{ color: 'gray' }}>{this.props.recency}</Text>
            <Text style={{ color: colors.primaryRed }}>{this.props.name}</Text>
            <Text style={{ color: 'gray', fontFamily: 'Lato' }}>{this.props.message}</Text>
          </View>
          <Avatar
            medium
            rounded
            onPress={() => console.log('Works!')}
            activeOpacity={0.7}
            source={{
              uri:
                'https://scontent-ort2-1.xx.fbcdn.net/v/t1.0-1/10525865_10103390617202827_7274473316466244806_n.jpg?_nc_cat=0&_nc_eui2=AeGOYAl2s36FtxUvYCAUGBWZPlJaFahboQRQnb5DsGaCGpuXcOvaY2jm8G_Tq2S3-LV4czUC1Vkyv9SLYMDHIV_MVV1pjU__3Itu7ItH9L13Fw&oh=4fd14f5fbd42e616fb5253ba62aed33f&oe=5BBD1015',
            }}
          />
        </TouchableOpacity>
        <Divider style={{ backgroundColor: 'lightgray' }} />
      </View>
    );
  }
}

class HomeScreen extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      leftSelected: true,
      contacts: {},
      selectedContact: 0,
    };
    (this: any)._selectTab = this._selectTab.bind(this);
    (this: any).pressLocal = this._pressLocal.bind(this);
    (this: any).pressGlobal = this._pressGlobal.bind(this);
    (this: any)._randomContact = this._randomContact.bind(this);
  }

  componentDidMount() {
    this.requestCameraPermission();
    Contacts.getAll((err, contacts) => {
      if (err) throw err;

      //console.log(contacts);
      this.props.dispatch(updateContacts(contacts));
    });
  }

  async requestCameraPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' + 'so you can take awesome pictures.',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED || granted === true) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      //console.warn(err);
    }
  }

  openModal() {
    this.setState({ modalVisible: true });
    this.requestCameraPermission();
  }

  closeModal() {
    this.setState({ modalVisible: false });
  }

  _selectTab(isLeft) {
    if (isLeft === true) {
      this.setState({
        leftSelected: true,
      });
    } else {
      this.setState({
        leftSelected: false,
      });
    }
  }

  _pressLocal() {
    this.setState({
      leftSelected: true,
    });
  }

  _pressGlobal() {
    this.setState({
      leftSelected: false,
    });
  }

  _randomContact() {
    const num = Math.floor(Math.random() * this.props.contacts.length);
    return this.props.contacts[num];
  }

  _keyExtractor = (item, index) => item.id;

  _renderItem = ({ item }) => (
    <MyListItem id={item.id} name={item.name} recency={item.recency} message={item.message} />
  );

  render() {
    return (
      <View>
        <Modal
          style={{ alignSelf: 'center', backgroundColor: 'rgba(255,255,255,0.5', color: 'red' }}
          visible={this.state.modalVisible}
          animationType={'slide'}
          onRequestClose={() => this.closeModal()}
          transparent={true}
        >
          <MakeDayModal
            close={() => this.closeModal()}
            randomContact={() => this._randomContact()}
          />
        </Modal>
        <TabBar
          leftSelected={this.state.leftSelected}
          selectLocal={this._pressLocal.bind(this)}
          selectGlobal={this._pressGlobal.bind(this)}
        />
        <ImageBackground
          source={{
            uri:
              'https://images.unsplash.com/photo-1511988617509-a57c8a288659?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f34d31b7b293d187d4b134d6afcabba9&auto=format&fit=crop&w=1351&q=80',
          }}
          style={{
            width: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
          }}
        >
          <View style={styles.statsContainer}>
            <View style={styles.statline}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  style={{ width: 40, height: 40, marginHorizontal: 10 }}
                  source={require('../images/DayMKR-icon-on-red-circle.png')}
                />
                <Text style={[appStyles.yellowText, styles.statText]}>Days made to date</Text>
              </View>
              <Text style={[appStyles.yellowText, styles.statText]}>176</Text>
            </View>
            <Divider style={{ backgroundColor: colors.primaryYellow, opacity: 0.5 }} />
            <View style={styles.statline}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  style={{ width: 40, height: 40, marginHorizontal: 10 }}
                  source={require('../images/DayMKR-icon-on-red-circle.png')}
                />
                <Text style={[appStyles.yellowText, styles.statText]}>Current Streak</Text>
              </View>
              <Text style={[appStyles.yellowText, styles.statText]}>23</Text>
            </View>
          </View>
        </ImageBackground>
        <Divider style={{ backgroundColor: 'lightgrey' }} />
        <Text
          style={[
            appStyles.yellowText,
            {
              paddingVertical: 5,
              backgroundColor: 'rgb(100, 100, 100)',
              paddingHorizontal: 15,
              fontSize: 15,
              fontWeight: 'bold',
            },
          ]}
        >
          Recent Days I've Made
        </Text>
        <Divider style={{ backgroundColor: '#414E58' }} />
        <TouchableOpacity style={styles.fabContainer}>
          <Text style={{ color: '#ffffff' }}> + </Text>
        </TouchableOpacity>
        <FlatList
          data={[
            {
              key: 'a',
              id: '0',
              recency: '3 min ago',
              name: 'Justin Kraft',
              message: 'Hey man, long time no see!',
            },
            {
              key: 'a',
              id: '1',
              recency: 'Yesterday',
              name: 'Stan huang',
              message: `You're the best app developer I know!`,
            },
            {
              key: 'a',
              id: '2',
              recency: '3 min ago',
              name: 'Justin Kraft',
              message: 'Hey man, long time no see!',
            },
            {
              key: 'a',
              id: '3',
              recency: '3 min ago',
              name: 'Justin Kraft',
              message: 'Hey man, long time no see!',
            },
            {
              key: 'a',
              id: '4',
              recency: '3 min ago',
              name: 'Justin Kraft',
              message: 'Hey man, long time no see!',
            },
            {
              key: 'a',
              id: '5',
              recency: '3',
              name: 'Justin Kraft',
              message: 'Hey man, long time no see!',
            },
            {
              key: 'a',
              id: '6',
              recency: '3',
              name: 'Justin Kraft',
              message: 'Hey man, long time no see!',
            },
            {
              key: 'a',
              id: '7',
              recency: '3',
              name: 'Justin Kraft',
              message: 'Hey man, long time no see!',
            },
          ]}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
        <TouchableOpacity style={styles.fabContainer} onPress={() => this.openModal()}>
          <Text style={{ color: 'white', fontSize: 25 }}>+</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  friendContainer: {
    flexDirection: 'row',
    backgroundColor: '#2f8e7f',
    paddingHorizontal: 15,
    height: 100,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  statsContainer: {
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: 'black',
    height: 150,
    paddingHorizontal: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  statline: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    alignItems: 'center',
  },
  statText: {
    fontSize: 16,
  },
  fabContainer: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    top: '55%',
    backgroundColor: '#cb5141',
    borderRadius: 100,
    zIndex: 5,
  },
});

export default connect(mapStateToProps)(HomeScreen);
