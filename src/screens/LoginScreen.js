/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TouchableOpacity, alert } from 'react-native';
import FBSDK, { LoginButton, LoginManager, ShareDialog } from 'react-native-fbsdk';
import myFace from '../images/myface.jpg';

const shareLinkContent = {
  to: 100000064472630,
  contentType: 'link',
  contentUrl:
    'https://cdn.shopify.com/s/files/1/1482/3564/products/hello_1024x1024.jpg?v=1480478786',
  commonParameters: {
    peopleIds: ['710228004'],
  },
  quote: 'Check out this link!',
};

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this._fbAuth = this._fbAuth.bind(this);
  }

  _fbAuth() {
    LoginManager.logInWithReadPermissions(['public_profile']).then(
      (result) => {
        if (result.isCancelled) {
          alert('Login was cancelled');
        } else {
          alert(`Login was successful with permissions: ${result.grantedPermissions.toString()}`);
        }
      },
      (error) => {
        alert(`Login failed with error: ${error}`);
      },
    );
  }

  _sendDialog() {
    ShareDialog.canShow(shareLinkContent)
      .then((canShow) => {
        if (canShow) {
          return ShareDialog.show(shareLinkContent);
        }
        console.log('Messenger not installed');
      })
      .then(
        (result) => {
          if (result.isCancelled) {
            console.log('Messenge cancelled');
            // cancelled
          } else {
            console.log('Messenge success');
            // success
          }
        },
        (error) => {
          console.log(`Share fail with error: ${error}`, 'error');
        },
      );
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this._fbAuth} style={{ padding: 10 }}>
          <Text>Login with Facebook</Text>
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
});

AppRegistry.registerComponent('LoginScreen', () => LoginScreen);
