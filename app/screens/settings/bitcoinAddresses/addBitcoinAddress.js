import React, { Component } from 'react'
import { View, Alert, StyleSheet } from 'react-native'
import AddBitcoinAddressComponent from './bitcoinAddressComponent'
import SettingsService from './../../../services/settingsService'
import ResetNavigation from './../../../util/resetNavigation'
import Header from './../../../components/header'

export default class AddBankAccount extends Component {
  static navigationOptions = {
    title: 'Add new address',
  }

  constructor() {
    super()
    this.state = {
      address: '',
    }
  }

  updateAddress = (address) => {
    this.setState({ address })
  }

  reload = () => {
    const params = this.props.navigation.state.params
    ResetNavigation.dispatchUnderDrawer(this.props.navigation, params.parentRoute, params.nextRoute)
  }

  add = async () => {
    let responseJson = await SettingsService.addBitcoinAddresses(this.state)

    if (responseJson.status === "success") {
      this.reload()
    }
    else {
      Alert.alert('Error',
        responseJson.message,
        [{ text: 'OK' }])
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          navigation={this.props.navigation}
          back
          title="Add new address"
        />
        <AddBitcoinAddressComponent
          updateAddress={this.updateAddress}
          values={this.state}
          onPress={this.add}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
})
