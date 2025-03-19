import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

export default function TabsLayout() {
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: "#007bff", // Active tab color
				tabBarInactiveTintColor: "gray", // Inactive tab color
				tabBarStyle: {
					backgroundColor: "#fff", // Tab bar background
					paddingBottom: 5, // Adjust spacing
					height: 60, // Increase height
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
					tabBarIcon: ({ color, size }) => <Ionicons name='people' size={size} color={color} />
				}}
			/>
			<Tabs.Screen name='calander'
				options={{
					title: 'Calander',
					tabBarIcon: ({ color, size }) => <Ionicons name='calendar' size={size} color={color} />
				}}
			/>
		</Tabs>
	)
}

