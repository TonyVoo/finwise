import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '@components/Header'

const Stats = () => {
  return (
    <View style={styles.container}>
      <Header/>
      <View style={styles.subcontainer}>
      
      </View>
    </View>
  )
}

export default Stats

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#00D09E',
    flex: 1,
    paddingTop: 90,
  },
  title: {
    fontSize: 20,
    marginBottom: 16,
  },
  subcontainer: {
    width: 401,
    backgroundColor: '#F1FFF3',
    flex: 1,
    borderRadius: 40,
  }
});