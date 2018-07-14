/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import FBSDK, {
  GraphRequestManager,
  FBGraphRequestManager,
  GraphRequest,
  ShareDialog,
} from 'react-native-fbsdk';

import SendSMS from 'react-native-sms';

import * as colors from '../styles/colors';

import { Header, Card, Button, Avatar } from 'react-native-elements';

import appStyles from '../styles/appStyles';

type Props = {};

const mapStateToProps = state => ({
  token: state.token,
});

class MakeDayModal extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      keyboardOpen: false,
      dayMade: false,
      text: '',
      currentContact: {},
      skips: 0,
    };
  }

  componentDidMount() {
    this._randomContact();
  }

  _randomContact() {
    var currentContact;
    currentContact = this.props.randomContact();
    this.setState({
      currentContact: currentContact,
    });
  }
  _skipContact() {
    this._randomContact();
    this.setState({
      skips: this.state.skips + 1,
    });
  }

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow.bind(this),
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide.bind(this),
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow() {
    this.setState({
      keyboardOpen: true,
    });
  }

  _keyboardDidHide() {
    this.setState({
      keyboardOpen: false,
    });
  }

  _makeDay() {
    this._post();
  }

  _showFriend() {
    const responseInfoCallback = (error, result) => {
      if (error) {
        console.log(error);
        alert('Error fetching data: ' + error.toString());
      } else {
        console.log(result);
        alert('Success fetching data: ' + result.toString());
      }
    };

    const infoRequest = new GraphRequest(
      '/me/friends',
      {
        accessToken: this.props.token,
        parameters: {
          fields: {
            string: 'email,name,first_name,middle_name,last_name',
          },
        },
      },
      responseInfoCallback,
    );

    // Start the graph request.
    SendSMS.send(
      {
        body: this.state.text,
        recipients: [`${this.state.currentContact.phoneNumbers[0].number}`],
        successTypes: ['all'],
      },
      (completed, cancelled, error) => {
        console.log(
          'SMS Callback: completed: ' + completed + ' cancelled: ' + cancelled + 'error: ' + error,
        );
        this.setState({
          dayMade: true,
        });
      },
    );
  }

  _post() {
    const shareLinkContent = {
      contentType: 'link',
      contentUrl: 'https://www.google.com/',
      commonParameters: {
        peopleIds: ['710228004'],
      },
      quote: this.state.text,
      hashtag: 'hello',
    };

    ShareDialog.canShow(shareLinkContent)
      .then(canShow => {
        if (canShow) {
          return ShareDialog.show(shareLinkContent);
        }
        console.log('Messenger not installed');
      })
      .then(
        result => {
          if (result.isCancelled) {
            console.log('Messenge cancelled');
            // cancelled
          } else {
            console.log('Messenge success');
            // success
            this.setState({
              dayMade: true,
            });
          }
        },
        error => {
          console.log(`Share fail with error: ${error}`, 'error');
        },
      );
  }

  render() {
    return (
      <ImageBackground
        source={{
          uri:
            'https://images.unsplash.com/photo-1520880867055-1e30d1cb001c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=649616c0b471231d6b8e637e7dce500d&auto=format&fit=crop&w=1350&q=80',
        }}
        style={{ width: '100%', height: '100%' }}
      >
        <KeyboardAvoidingView
          behaviour="height"
          keyboardVerticalOffset={0}
          style={{
            backgroundColor: 'rgba(0,0,0,0.5)',
            flex: 1,
            justifyContent: this.state.dayMade ? 'flex-end' : 'center',
          }}
        >
          {!this.state.dayMade && (
            <Card
              title={
                this.state.keyboardOpen ? '' : `Make ${this.state.currentContact.givenName}'s Day`
              }
              containerStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.75)',
                paddingHorizontal: 0,
                marginHorizontal: '10%',
                borderWidth: 0,
              }}
              dividerStyle={{
                opacity: 0,
              }}
              titleStyle={[
                { fontSize: 20, marginBottom: 0, textAlign: 'left', paddingHorizontal: 20 },
              ]}
            >
              {!this.state.keyboardOpen && (
                <Text style={{ marginBottom: 15, paddingHorizontal: 20, fontSize: 15 }}>
                  Good morning! Let's get your day started off right by making someone's morning
                  great with a message.
                </Text>
              )}
              <View style={styles.friendContainer}>
                <Avatar
                  medium
                  rounded
                  onPress={() => console.log('Works!')}
                  activeOpacity={0.7}
                  source={{
                    uri: this.state.currentContact.thumbnailPath,
                  }}
                  defaultSource={{
                    uri:
                      'https://scontent-ort2-1.xx.fbcdn.net/v/t1.0-1/10525865_10103390617202827_7274473316466244806_n.jpg?_nc_cat=0&_nc_eui2=AeGOYAl2s36FtxUvYCAUGBWZPlJaFahboQRQnb5DsGaCGpuXcOvaY2jm8G_Tq2S3-LV4czUC1Vkyv9SLYMDHIV_MVV1pjU__3Itu7ItH9L13Fw&oh=4fd14f5fbd42e616fb5253ba62aed33f&oe=5BBD1015',
                  }}
                />
                <View style={{ flexDirection: 'column', padding: 10 }}>
                  <Text style={appStyles.yellowText}>{this.state.currentContact.givenName}</Text>
                  <Text style={appStyles.yellowText}>Friends since 2019 </Text>
                </View>
              </View>
              <View style={{ padding: 15 }}>
                <Text style={{ fontSize: 12 }}> Make Day </Text>
                <TextInput
                  placeholder="Start Typing"
                  multiline
                  onChangeText={text => this.setState({ text })}
                  style={{ fontSize: 15 }}
                  underlineColorAndroid={colors.primaryRed}
                />
              </View>
              <View style={styles.buttonsContainer}>
                <Button
                  backgroundColor={colors.primaryRed}
                  color={colors.primaryYellow}
                  fontFamily="Lato"
                  buttonStyle={{
                    borderRadius: 0,
                    marginLeft: 0,
                    marginRight: 0,
                    marginBottom: 0,
                    borderWidth: 1,
                    borderColor: colors.primaryRed,
                  }}
                  title="MAKE DAY"
                  raised
                  onPress={this._showFriend.bind(this)}
                />
                <Button
                  backgroundColor="white"
                  color={colors.primaryRed}
                  fontFamily="Lato"
                  disabled={this.state.skips === 3}
                  buttonStyle={{
                    borderRadius: 0,
                    marginLeft: 0,
                    marginRight: 0,
                    marginBottom: 0,
                    borderWidth: 1,
                    borderColor: colors.primaryRed,
                  }}
                  title={`Skip(${this.state.skips}/3)`}
                  onPress={this._skipContact.bind(this)}
                />
              </View>
            </Card>
          )}
          {this.state.dayMade && (
            <Card
              containerStyle={{ marginHorizontal: 0, backgroundColor: 'rgba(255, 255, 255, 0.75)' }}
            >
              <View style={styles.niceContainer}>
                <Text> NICE! </Text>
                <Text>You've just made your</Text>
              </View>
              <View style={styles.dayContainer}>
                <Text> 23 </Text>
                <Text>day in a row.</Text>
              </View>
              <View style={styles.statsContainer}>
                <Text> My Stats </Text>
                <View style={styles.statline}>
                  <Text>Days made to date</Text>
                  <Text>176</Text>
                </View>
                <View style={styles.statline}>
                  <Text>Current Streak</Text>
                  <Text>23</Text>
                </View>
              </View>
              <View style={styles.buttonsContainer}>
                <Button
                  backgroundColor="white"
                  color={colors.primaryRed}
                  fontFamily="Lato"
                  buttonStyle={{
                    borderRadius: 0,
                    marginLeft: 0,
                    marginRight: 0,
                    marginBottom: 0,
                    borderWidth: 1,
                  }}
                  title="MORE STATS"
                />
                <Button
                  onPress={this.props.close}
                  backgroundColor="white"
                  color={colors.primaryRed}
                  fontFamily="Lato"
                  buttonStyle={{
                    borderRadius: 0,
                    marginLeft: 0,
                    marginRight: 0,
                    marginBottom: 0,
                    borderWidth: 1,
                  }}
                  title="CLOSE"
                />
              </View>
            </Card>
          )}
          {!this.state.dayMade && (
            <TouchableOpacity
              onPress={this.props.close}
              style={{ justifyContent: 'center', alignItems: 'center' }}
            >
              <Text style={{ color: colors.primaryYellow, textAlign: 'center' }}>
                {`Not Today.\n I don't feel like making anyone's day`}
              </Text>
            </TouchableOpacity>
          )}
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
    backgroundColor: colors.primaryRed,
    paddingHorizontal: 35,
    paddingVertical: 10,
    marginHorizontal: -10,
    alignItems: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    alignSelf: 'center',
  },
  niceContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: colors.primaryRed,
    paddingHorizontal: 15,
    height: 100,
  },
  dayContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: 15,
    height: 100,
  },
  statsContainer: {
    flexDirection: 'column',
    backgroundColor: 'white',
    paddingHorizontal: 15,
    height: 100,
  },
  statline: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default connect(mapStateToProps)(MakeDayModal);
