import { View, Text } from 'react-native'
import React from 'react'
import { useAuth } from '../AuthContext'

const Profile = () => {
    const[user]=useAuth()
  return (
    <View>
      <Text>{JSON.stringify(user)}</Text>
    </View>
  )
}

export default Profile