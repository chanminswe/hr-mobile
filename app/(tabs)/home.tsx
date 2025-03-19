import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { quotes, QuotesType } from '../../constants/quotes';

const Home = () => {
	const today = new Date();
	const date = today.getDate();
	const month = today.getMonth() + 1;
	const [quote, setQuote] = useState<QuotesType | null>(null);

	useEffect(() => {
		const getRandomQuote = () => {
			const randomIndex = Math.floor(Math.random() * quotes.length);
			setQuote(quotes[randomIndex]);
		};

		getRandomQuote();
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			{/* Header */}
			<View style={styles.homeHeader}>
				<View>
					<Text style={styles.headerText}>Hello,</Text>
					<Text style={styles.subHeaderText}>Username</Text>
				</View>
				<Image
					style={styles.profileImage}
					source={require('../../assets/images/react-logo.png')}
				/>
			</View>

			{/* Date Section */}
			<View style={styles.dateContainer}>
				<Text style={styles.dateText}>{date}</Text>
				<Text style={styles.monthText}>{new Date().toLocaleString('default', { month: 'long' })}</Text>
			</View>

			{/* Check-In / Check-Out Section */}
			<View style={styles.checkContainer}>
				<View style={styles.checkInOut}>
					<Text style={styles.checkLabel}>Check In</Text>
					<Text style={styles.checkTime}>8:30 AM</Text>
				</View>
				<View style={styles.checkInOut}>
					<Text style={styles.checkLabel}>Check Out</Text>
					<Text style={styles.checkTime}>--:--</Text>
				</View>
			</View>

			{/* Buttons Section */}
			<View style={styles.buttonContainer}>
				<View style={styles.iconContainer}>
					<TouchableOpacity style={styles.iconCircle}>
						<Ionicons name='pencil' size={24} color={'orange'} />
					</TouchableOpacity>
					<Text style={styles.iconText}>Check In</Text>
				</View>
				<View style={styles.iconContainer}>
					<TouchableOpacity style={styles.iconCircle}>
						<Ionicons name='hand-left' size={24} color={'purple'} />
					</TouchableOpacity>
					<Text style={styles.iconText}>Check Out</Text>
				</View>
				<View style={styles.iconContainer}>
					<TouchableOpacity style={styles.iconCircle}>
						<Ionicons name='location' size={24} color={'blue'} />
					</TouchableOpacity>
					<Text style={styles.iconText}>Remote In</Text>
				</View>
				<View style={styles.iconContainer}>
					<TouchableOpacity style={styles.iconCircle}>
						<Ionicons name='airplane' size={24} color={'gray'} />
					</TouchableOpacity>
					<Text style={styles.iconText}>Remote Out</Text>
				</View>
			</View>
			{/* Quote Section */}
			<View style={styles.quotesContainer}>
				<Text style={styles.quoteText}>
					{quote ? `"${quote.quote}" - ${quote.author}` : 'No quote available at the moment'}
				</Text>
			</View>
		</SafeAreaView>
	);
};

export default Home;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f8f9fa',
	},
	homeHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 20,
		backgroundColor: '#fff',
		borderBottomWidth: 1,
		borderBottomColor: '#e9ecef',
	},
	headerText: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#343a40',
	},
	subHeaderText: {
		fontSize: 18,
		color: '#6c757d',
	},
	profileImage: {
		width: 50,
		height: 50,
		borderRadius: 25,
		borderWidth: 2,
		borderColor: '#dee2e6',
	},
	dateContainer: {
		alignItems: 'center',
		marginVertical: 20,
	},
	dateText: {
		fontSize: 40,
		fontWeight: 'bold',
		color: '#343a40',
	},
	monthText: {
		fontSize: 20,
		color: '#6c757d',
		textTransform: 'uppercase',
	},
	checkContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginVertical: 20,
		padding: 20,
		backgroundColor: '#fff',
		borderRadius: 20,
		marginHorizontal: 20,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 6,
		elevation: 3,
	},
	checkInOut: {
		alignItems: 'center',
	},
	checkLabel: {
		fontSize: 16,
		color: '#6c757d',
	},
	checkTime: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#343a40',
	},
	buttonContainer: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		marginVertical: 20,
		padding: 20,
		backgroundColor: '#fff',
		borderRadius: 20,
		marginHorizontal: 20,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 6,
		elevation: 3,
	},
	iconContainer: {
		alignItems: 'center',
	},
	iconCircle: {
		width: 60,
		height: 60,
		borderRadius: 25,
		backgroundColor: '#e9ecef',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 10,
	},
	iconText: {
		fontSize: 10,
		color: '#343a40',
	},
	quotesContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10,
		marginHorizontal: 20,
		// backgroundColor: '#fff',
		// borderRadius: 20,
		// shadowColor: '#000',
		// shadowOffset: { width: 0, height: 2 },
		// shadowOpacity: 0.1,
		// shadowRadius: 6,
		// elevation: 3,
	},
	quoteText: {
		fontSize: 18,
		fontStyle: 'italic',
		textAlign: 'center',
		color: '#6c757d',
	},
});
