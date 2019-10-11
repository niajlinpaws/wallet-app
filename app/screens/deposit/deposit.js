import React, { Component } from 'react'
import { View, Text, StyleSheet, AsyncStorage, Alert } from 'react-native'
import UserInfoService from './../../services/userInfoService'
import Colors from './../../config/colors'
import Header from './../../components/header'

export default class Deposit extends Component {
  static navigationOptions = {
    title: 'Deposit',
  }

  constructor() {
    super()

    this.state = {
      bank: {},
      bankAccount: {},
      currencyCode: '',
    }
  }

  componentDidMount() {
    this.getBankInfo()
    this.getCurrencyCode()
  }

  getBankInfo = async () => {
    let responseJson = await UserInfoService.getDepositInfo()
    if (responseJson.status === "success") {
      if (responseJson.data[0]) {
        this.setState({
          bank: responseJson.data[0],
          bankAccount: responseJson.data[0].bank_account,
        })
      }
    }
    else {
      Alert.alert('Error',
        responseJson.message,
        [{ text: 'OK' }])
    }
  }

  getCurrencyCode = async () => {
    const currencyStr = await AsyncStorage.getItem('currency')
    const currency = JSON.parse(currencyStr)
    this.setState({
      currencyCode: currency.code,
    })
  }

  render() {
    if (!this.state.bank.reference) {
      return (
        <View style={styles.container}>
          <Header
            navigation={this.props.navigation}
            drawer
            title="Deposit"
          />
          <View style={styles.comment}>
            <Text style={styles.commentText}>
              No deposit instructions have been provided.
            </Text>
          </View>
          <View style={[styles.bankInfo, { flex: 6 }]} />
        </View>
      )
    }
    else {
      return (
        <View style={styles.container}>
          <Header
            navigation={this.props.navigation}
            drawer
            title="Deposit"
          />
          <View style={{ flex: 1 }}>
            <View style={styles.comment}>
              <Text style={styles.commentText}>
                Fund your account by transferring {this.state.currencyCode} to the unique reference number below.
              </Text>
            </View>
            <View style={styles.reference}>
              <Text style={styles.referenceText}>
                {this.state.bank.reference}
              </Text>
            </View>
          </View>
          <View style={styles.bankInfo}>
            <View style={styles.infoColumn}>
              <Text style={styles.infoTitle}>
                Bank
              </Text>
              <Text style={styles.infoText}>
                {this.state.bankAccount.bank_name}
              </Text>
            </View>
            <View style={styles.infoColumn}>
              <Text style={styles.infoTitle}>
                Account Holder
              </Text>
              <Text style={styles.infoText}>
                {this.state.bankAccount.name}
              </Text>
            </View>
            <View style={styles.infoColumn}>
              <Text style={styles.infoTitle}>
                Account Number
              </Text>
              <Text style={styles.infoText}>
                {this.state.bankAccount.number}
              </Text>
            </View>
            <View style={styles.infoColumn}>
              <Text style={styles.infoTitle}>
                Account Type
              </Text>
              <Text style={styles.infoText}>
                {this.state.bankAccount.type}
              </Text>
            </View>
            <View style={styles.infoColumn}>
              <Text style={styles.infoTitle}>
                Bank Code
              </Text>
              <Text style={styles.infoText}>
                {this.state.bankAccount.bank_code}
              </Text>
            </View>
          </View>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  comment: {
    flex: 2,
    backgroundColor: Colors.lightgray,
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 30,
    paddingLeft: 30,
  },
  commentText: {
    fontSize: 16,
    textAlign: 'center',
    color: Colors.black,
  },
  reference: {
    flex: 1,
    backgroundColor: Colors.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  referenceText: {
    fontSize: 28,
    textAlign: 'center',
    color: 'white',
  },
  bankInfo: {
    flex: 2,
    flexDirection: 'column',
    padding: 20,
  },
  infoColumn: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoTitle: {
    flex: 1,
    fontSize: 17,
    textAlign: 'left',
    fontWeight: 'bold',
    color: Colors.black,
  },
  infoText: {
    flex: 1,
    fontSize: 17,
    textAlign: 'right',
    color: Colors.black,
  },
})
