import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Calendar, CalendarList } from 'react-native-calendars';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Day {
	dateString: string;
	date: number;
	month: number;
	year: number;
	timeStamp: number;
}

const Leave = () => {
	const [selected, setSelected] = useState<string[]>();

	if (selected === [] || selected?.length > 0) {
		const markedDates = selected.reduce((acc, date) => {
			acc[date] = { selected: true, selectedColor: '#00adf5' };
			return acc;
		}, {} as { [key: string]: { selected: boolean; selectedColor: string } });
	}

	useEffect(() => {
		console.log(selected);
	}, [selected])

	return (
		<SafeAreaView
			style={styles.container}
		>
			<View style={styles.calendarContaienr}>
				<Calendar
					style={styles.calendarStyle}
					theme={{
						backgroundColor: '#ffffff',
						calendarBackground: '#ffffff',
						textSectionTitleColor: '#b6c1cd',
						selectedDayBackgroundColor: '#00adf5',
						selectedDayTextColor: '#ffffff',
						todayTextColor: '#00adf5',
						dayTextColor: '#2d4150',
						textDisabledColor: '#dd99ee'
					}}
					onDayPress={(day: Day) => {
						setSelected(prevDate => [...(prevDate || []), day.dateString])
					}}
					markDates={(day: Day) => {
						if (selected?.includes(day.dateString)) {

						}
					}}
				/>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center"
	},
	calendarContaienr: {
		width: '100%',
		padding: 20
	},
	calendarStyle: {
		borderWidth: 1,
		borderColor: 'gray',
		borderRadius: 10
	}
})


export default Leave
