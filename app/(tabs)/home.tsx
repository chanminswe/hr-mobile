import { View, Text, StyleSheet, Image, TouchableOpacity, RefreshControl, ScrollView, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { quotes, QuotesType } from '../../constants/quotes';
import axios from 'axios';

const Home = () => {
	const today = new Date();
	const date = today.getDate();
	const [quote, setQuote] = useState<QuotesType | null>(null);
	const [checkInTime, setCheckInTime] = useState<Date | null>();
	const [checkOutTime, setCheckOutTime] = useState<Date | null>();
	const [refreshing, setRefreshing] = React.useState(false);

	async function handleCheckIn() {
		try {
			console.log("Checking in...");
			const response = await axios.post('http://localhost:8080/user/informations/checkIn', {}, {
				headers: {
					'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2Q1OGQ3MWI2MDQ4OGFjYWIwZjM0OTEiLCJlbWFpbCI6ImpvaG5kb2VAZXhhbXBsZS5jb20iLCJpYXQiOjE3NDIyMDE5MDAsImV4cCI6MTc1MDg0MTkwMH0.YZdR4Xkrif1gDi2_xKk5wniid1vUe1lapMZpyf6NMVs`,
				}
			});
			Alert.alert("Check In Sucess");
		} catch (error: any) {
			console.error("Error during check-in:", error.response?.data?.message || error.message);
			Alert.alert("You have already checked in today");
		}
	}

	async function handleCheckOut() {
		try {
			console.log("Checking in...");
			const response = await axios.post('http://localhost:8080/user/informations/checkOut', {}, {
				headers: {
					'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2Q1OGQ3MWI2MDQ4OGFjYWIwZjM0OTEiLCJlbWFpbCI6ImpvaG5kb2VAZXhhbXBsZS5jb20iLCJpYXQiOjE3NDIyMDE5MDAsImV4cCI6MTc1MDg0MTkwMH0.YZdR4Xkrif1gDi2_xKk5wniid1vUe1lapMZpyf6NMVs`,
				}
			});
			console.log("Check-out successful:", response.data);
			Alert.alert("Check Out Sucess");
		} catch (error: any) {
			console.error("Error during check-in:", error.response?.data?.message || error.message);
		}
	}

	async function getUserInformation() {
		try {
			const response = await axios.get('http://localhost:8080/user/informations/attendance', {
				headers: {
					'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2Q1OGQ3MWI2MDQ4OGFjYWIwZjM0OTEiLCJlbWFpbCI6ImpvaG5kb2VAZXhhbXBsZS5jb20iLCJpYXQiOjE3NDIyMDE5MDAsImV4cCI6MTc1MDg0MTkwMH0.YZdR4Xkrif1gDi2_xKk5wniid1vUe1lapMZpyf6NMVs`
				}
			});
			console.log("User information fetched:", response.data);
			setCheckInTime(new Date(response.data?.checkInTime) || null);
			if (response.data?.checkOutTime === null) {
				setCheckOutTime(null);
			}
			else {
				setCheckOutTime(new Date(response.data?.checkOutTime));
			}
			console.log(checkOutTime)
		} catch (error: any) {
			console.error("Error fetching user information:", error.response?.data?.message || error.message);
		}
	}

	const getRandomQuote = () => {
		const randomIndex = Math.floor(Math.random() * quotes.length);
		setQuote(quotes[randomIndex]);
	};

	useEffect(() => {
		getUserInformation();
		getRandomQuote();
	}, []);

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		getUserInformation();
		getRandomQuote();
		setTimeout(() => {
			setRefreshing(false);
		}, 500);
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
			<ScrollView
				contentContainerStyle={styles.scrollView}

				refreshControl={
					<RefreshControl
						tintColor={'blue'}
						refreshing={refreshing} onRefresh={onRefresh} />
				}>
				{/* Date Section */}
				<View style={styles.dateContainer}>
					<Text style={styles.dateText}>{date}</Text>
					<Text style={styles.monthText}>{new Date().toLocaleString('default', { month: 'long' })}</Text>
				</View>

				{/* Check-In / Check-Out Section */}
				<View style={styles.checkContainer}>
					<View style={styles.checkInOut}>
						<Text style={styles.checkLabel}>Check In</Text>
						{checkInTime === null ? <Text style={styles.checkTime}>
							<Text style={styles.checkTime}>

								--:--
							</Text>
						</Text> :
							<Text style={styles.checkTime}>
								{`${checkInTime?.getHours()}` === 'NaN' ? `--:-- ` : `${checkInTime?.getHours()} : ${checkInTime?.getMinutes()}`}
							</Text>}
					</View>
					<View style={styles.checkInOut}>
						<Text style={styles.checkLabel}>Check Out</Text>
						{checkOutTime === null ?
							<Text style={styles.checkTime}>
								<Text style={styles.checkTime}>
									--:--
								</Text>
							</Text> :
							<Text style={styles.checkTime}>
								{`${checkOutTime?.getHours()}` === 'NaN' ? `--:-- ` : `${checkOutTime?.getHours()} : ${checkOutTime?.getMinutes()}`}
							</Text>}
					</View>
				</View>

				{/* Buttons Section */}
				<View style={styles.buttonContainer}>
					<View style={styles.iconContainer}>
						<TouchableOpacity
							onPress={handleCheckIn}
							style={styles.iconCircle}>
							<Ionicons name='pencil' size={24} color={'orange'} />
						</TouchableOpacity>
						<Text style={styles.iconText}>Check In</Text>
					</View>
					<View style={styles.iconContainer}>
						<TouchableOpacity
							onPress={handleCheckOut}
							style={styles.iconCircle}>
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
			</ScrollView>
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
	scrollView: {
		flex: 1
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
	},
	quoteText: {
		fontSize: 18,
		fontStyle: 'italic',
		textAlign: 'center',
		color: '#6c757d',
	},
});
