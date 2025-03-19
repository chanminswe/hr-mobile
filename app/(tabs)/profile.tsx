import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const Profile = () => {
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerText}>Profile</Text>
				<Ionicons name="settings-outline" size={24} color="black" />
			</View>

			{/* Profile Picture */}
			<View style={styles.profileContainer}>
				<Image
					source={require('../../assets/images/react-logo.png')}
					style={styles.profileImage}
				/>
				<Text style={styles.name}>Chan</Text>
				<Text style={styles.email}>chanminswe@gmail.com</Text>
			</View>

			{/* Options */}
			<View style={styles.optionContainer}>
				<TouchableOpacity style={styles.option}>
					<Ionicons name="person-outline" size={24} color="black" />
					<Text style={styles.optionText}>Edit Profile</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.option}>
					<Ionicons name="lock-closed-outline" size={24} color="black" />
					<Text style={styles.optionText}>Change Password</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.option}>
					<Ionicons name="help-circle-outline" size={24} color="black" />
					<Text style={styles.optionText}>Help & Support</Text>
				</TouchableOpacity>
			</View>

			{/* Logout Button */}
			<TouchableOpacity style={styles.logoutButton}>
				<Text style={styles.logoutText}>Logout</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
};

export default Profile;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f8f8f8',
		paddingHorizontal: 20,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: 20,
	},
	headerText: {
		fontSize: 22,
		fontWeight: 'bold',
	},
	profileContainer: {
		alignItems: 'center',
		marginVertical: 30,
	},
	profileImage: {
		width: 100,
		height: 100,
		borderRadius: 50,
		marginBottom: 10,
	},
	name: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#333',
	},
	email: {
		fontSize: 16,
		color: 'gray',
		marginTop: 5,
	},
	optionContainer: {
		marginTop: 20,
	},
	option: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 15,
		borderBottomWidth: 1,
		borderBottomColor: '#ddd',
	},
	optionText: {
		marginLeft: 10,
		fontSize: 16,
		color: '#333',
	},
	logoutButton: {
		backgroundColor: 'red',
		padding: 15,
		borderRadius: 10,
		alignItems: 'center',
		marginTop: 40,
	},
	logoutText: {
		color: 'white',
		fontSize: 16,
		fontWeight: 'bold',
	},
});
