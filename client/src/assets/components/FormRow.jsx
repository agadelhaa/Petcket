import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import ptBR from "date-fns/locale/pt-BR";

const FormRow = ({ type, name, labelText, defaultValue, onChange }) => {
  const placeholder = "DD/MM/YYYY";
  const [selectedDate, setSelectedDate] = useState(
    defaultValue ? new Date(defaultValue) : null
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (onChange) {
     const formattedDate = formatDateForSubmission(date);
     console.log(
       `Selected Date: ${date}, Formatted Date for Submission: ${formattedDate}`
     );
     onChange({ target: { name, value: formattedDate } });
    }
  };

  const formatDateForSubmission = (date) => {
    if (!date) return "";
    const offsetDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    );
    return offsetDate.toISOString().slice(0, 10);
  };

  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      {type === "date" ? (
        <>
          <DatePicker
            id={name}
            name={name}
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            className="form-input"
            placeholderText={placeholder}
            required
            locale={ptBR}
          />
          <input
            type="hidden"
            name={name}
            value={formatDateForSubmission(selectedDate)}
          />
        </>
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          className="form-input"
          defaultValue={defaultValue || ""}
          onChange={onChange}
          required
          step={type === "number" ? "0.01" : null}
        />
      )}
    </div>
  );
};

export default FormRow;
