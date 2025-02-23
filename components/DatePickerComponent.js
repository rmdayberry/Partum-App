// components/DatePickerComponent.js
import React from "react";
import { Platform, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerComponent = ({ date, setDate }) => {
  return (
    <View>
      {Platform.OS === "web" ? (
        <DatePicker
          selected={date}
          onChange={(newDate) => setDate(newDate)}
          dateFormat="yyyy/MM/dd HH:mm"
          showTimeSelect
        />
      ) : (
        <DateTimePicker
          value={date}
          mode="datetime"
          display="default"
          onChange={(event, selectedDate) => {
            if (selectedDate) setDate(selectedDate);
          }}
        />
      )}
    </View>
  );
};

export default DatePickerComponent;
