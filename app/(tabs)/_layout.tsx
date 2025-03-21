import { StatusBar } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';


export default function TabsLayout() {
	return (
		<>
			<StatusBar barStyle="dark-content" backgroundColor="black" />
			<Tabs
				screenOptions={{
					headerShown: false,
					tabBarActiveTintColor: "#007bff",
					tabBarInactiveTintColor: "gray",
					tabBarStyle: {
						backgroundColor: "#fff",
						paddingBottom: 5,
						height: 60,
					},
				}}
			>
				<Tabs.Screen name='home'
					options={{
						title: 'Home',
						tabBarIcon: ({ color, size }) => <Ionicons name='home' size={size} color={color} />
					}}
				/>
				<Tabs.Screen name='leave'
					options={{
						title: "Leave",
						tabBarIcon: ({ color, size }) => <Ionicons name='calendar' size={size} color={color} />
					}}
				/>
				<Tabs.Screen name='profile'
					options={{
						title: 'Profile',
						tabBarIcon: ({ color, size }) => <Ionicons name='person-circle' size={size} color={color} />
					}}
				/>
			</Tabs>

		</>

	)
}

