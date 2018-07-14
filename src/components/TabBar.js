import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

type Props = {};

export default class TabBar extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          onPress={this.props.selectLocal}
          style={[
            styles.tab,
            { borderBottomColor: this.props.leftSelected ? '#cb5141' : '#f8fdc0' },
          ]}
        >
          <Text style={styles.tabText}> My Stats </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.props.selectGlobal}
          style={[
            styles.tab,
            { borderBottomColor: this.props.leftSelected ? '#f8fdc0' : '#cb5141' },
          ]}
        >
          <Text style={styles.tabText}> Global Stats </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  tab: {
    width: '50%',
    padding: 12,
    backgroundColor: '#f8fdc0',
    borderBottomWidth: 2,
    borderColor: '#f8fdc0',
  },
  tabText: {
    textAlign: 'center',
    color: '#cb5141',
    fontSize: 17,
    fontWeight: '400',
  },
});
