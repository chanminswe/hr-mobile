import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.homeHeader}>
				<Text style={styles.headerText}> Hello,{"\n"} Username </Text>
				<Image
					style={styles.profileImage}
					source={require('../../assets/images/react-logo.png')} />
			</View>

		</SafeAreaView>
	)
}

export default Home


const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
	},
	homeHeader: {
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingLeft: 10,
		paddingRight: 10
	},
	headerText: {
		fontSize: 22,
		color: 'blue'
	},
	profileImage: {
		width: 50,
		height: 50
	}
})
