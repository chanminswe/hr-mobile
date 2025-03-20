import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Calendar } from 'react-native-calendars';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

interface Day {
	dateString: string;
	date: number;
	month: number;
	year: number;
	timeStamp: number;
}

type MarkedDates = {
	[key: string]: { selected: boolean; selectedColor: string };
};

const Leave = () => {
	const [selected, setSelected] = useState<string[]>([]);
	const [leaveType, setLeaveType] = useState<string>();

	useEffect(() => {
		console.log(selected);
	}, [selected]);

	const markedDates: MarkedDates = selected.reduce((acc, date) => {
		acc[date] = { selected: true, selectedColor: 'green' };
		return acc;
	}, {} as MarkedDates);

	const onDayPress = (day: Day) => {
		setSelected((prevSelected) =>
			prevSelected.includes(day.dateString)
				? prevSelected.filter((date) => date !== day.dateString)
				: [...prevSelected, day.dateString]
		);
	};

	const requestLeave = async () => {
		try {
			console.log(selected, leaveType);
			if (leaveType === undefined) {
				setLeaveType('annual');
			}
			if (selected.length <= 0) {
				Alert.alert(
					'Please Enter Leave Dates!',
					'Select the date you want to request leave for!'
				);
				throw new Error("Please Select a Date before Requesting");
			}
			const response = await axios.post('http://localhost:8080/user/informations/requestLeave', { selected, leaveType }, {
				headers: {
					'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2Q1OGQ3MWI2MDQ4OGFjYWIwZjM0OTEiLCJlbWFpbCI6ImpvaG5kb2VAZXhhbXBsZS5jb20iLCJpYXQiOjE3NDIyMDE5MDAsImV4cCI6MTc1MDg0MTkwMH0.YZdR4Xkrif1gDi2_xKk5wniid1vUe1lapMZpyf6NMVs`
				},
			});
			console.log(response.data);
		}
		catch (error: any) {
			console.log("Error Occured while requesting leave", error.message);
		}
	}

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.calendarContainer}>
				<Calendar
					markedDates={markedDates}
					style={styles.calendarStyle}
					theme={{
						backgroundColor: '#ffffff',
						calendarBackground: '#ffffff',
						textSectionTitleColor: '#b6c1cd',
						selectedDayBackgroundColor: '#00adf5',
						selectedDayTextColor: '#ffffff',
						todayTextColor: '#00adf5',
						dayTextColor: '#2d4150',
						textDisabledColor: '#dd99ee',
					}}
					onDayPress={onDayPress}
				/>
			</View>
			<View style={styles.pickerContainer} >
				<Picker
					style={styles.picker}
					selectedValue={leaveType}
					onValueChange={(itemValue) => setLeaveType(itemValue)}
				>
					<Picker.Item
						color='black'
						label="Annual Leave" value="annual" />
					<Picker.Item label="Casual Leave" value="casual" color='black' />
					<Picker.Item label="Unpaid Leave" value="unpaid" color='black' />
					<Picker.Item label="Medical Leave" value="medical" color='black' />
				</Picker>
				<TouchableOpacity
					onPress={requestLeave}
					style={styles.buttonContainer}
				>
					<Text style={{
						color: 'white',
						fontWeight: 'bold',
					}}>Request Leave</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: '#f5f5f5',
	},
	calendarContainer: {
		width: '100%',
		padding: 20,
	},
	calendarStyle: {
		borderWidth: 1,
		borderColor: 'gray',
		borderRadius: 10,
	},
	pickerContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
		paddingHorizontal: 10,
		alignItems: 'center',
		height: 'auto',
		gap: 15,
		color: 'black',
	},
	picker: {
		width: '50%',
		borderRadius: 15,
	},
	buttonContainer: {
		backgroundColor: 'teal',
		height: 40,
		padding: 10,
		borderRadius: 10,
		width: '50%',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default Leave;
