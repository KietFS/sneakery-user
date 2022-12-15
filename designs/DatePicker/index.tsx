import * as React from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { makeStyles } from "@mui/material";
import { useField, useFormikContext } from "formik";
import { useEffect } from "react";

interface IDatePickerProps {
  defaultValue?: string;
  label: string;
  name: string;
}

const DatePicker: React.FC<IDatePickerProps> = (props) => {
  const { label, name } = props;
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(props.name);

  const [value, setValue] = React.useState<Dayjs | null>(
    dayjs("2022-12-31T21:11:54")
  );

  useEffect(() => {
    value &&
      setFieldValue(
        name,
        value?.format("YYYY-MM-DD hh:mm:ss").toString().replace(" ", "T")
      );
  }, [value]);

  const handleChange = (newValue: Dayjs | null) => {
    setFieldValue(
      name,
      newValue?.format("YYYY-MM-DD hh:mm:ss").toString().replace(" ", "T")
    );
    console.log(
      "DAY VALUE",
      newValue?.format("YYYY-MM-DD hh:mm:ss").toString()
    );
    setValue(newValue);
  };

  return (
    <div className="mt-1">
      <p className="text-sm font-bold text-gray-600 mb-2 mr-1">{label}</p>
      <div className=" z-50">
        <DateTimePicker
          value={value}
          InputProps={{ style: { height: 40, backgroundColor: "#f7f8f8" } }}
          onChange={handleChange}
          renderInput={(params) => (
            <TextField
              {...params}
              className="w-full z-1"
              style={{
                height: 40,
                zIndex: 1,
                borderRadius: 7,
              }}
            />
          )}
        />
      </div>
    </div>
  );
};

export default DatePicker;
