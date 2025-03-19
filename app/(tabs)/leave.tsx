import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Calendar } from 'react-native-calendars';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';

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
			<Picker
				style={styles.picker}
				selectedValue={leaveType}
				onValueChange={(itemValue) => setLeaveType(itemValue)}
			>
				<Picker.Item label="Annual Leave" value="annual" />
				<Picker.Item label="Casual Leave" value="casual" />
				<Picker.Item label="Unpaid Leave" value="unpaid" />
				<Picker.Item label="Medical Leave" value="medical" />
			</Picker>
			<TouchableOpacity
				style={styles.buttonContainer}
			>
				<Text style={{
					color: 'white',
					fontWeight: 'bold',
				}}>Request Leave</Text>
			</TouchableOpacity>
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
	picker: {
		backgroundColor: '#363434',
		height: 150,
		width: '80%',
		borderRadius: 25,
		borderWidth: 1,
		paddingHorizontal: 10,
	},
	buttonContainer: {
		backgroundColor: 'teal',
		padding: 15,
		borderRadius: 15,
		width: '80%',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 45
	},

});

export default Leave;
