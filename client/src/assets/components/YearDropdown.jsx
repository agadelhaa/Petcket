import { useState, useEffect } from "react";
import customFetch from "../../utils/customFetch";

const YearDropdown = ({ onMonthlySumsChange }) => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [monthlySums, setMonthlySums] = useState([]);

  useEffect(() => {
    const fetchMonthlySums = async () => {
      try {
        const response = await customFetch(`/purchases/prices/${selectedYear}`);
        const data = response.data;
        setMonthlySums(data);
        onMonthlySumsChange(data)
      } catch (error) {
        console.error('Error fetching monthly sums:', error);
      }
    };
    fetchMonthlySums();
  }, [selectedYear, onMonthlySumsChange]);

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  return (
    <div>
      <select value={selectedYear} onChange={handleYearChange}>
        {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i).map(
          (year) => (
            <option key={year} value={year}>
              {year}
            </option>
          )
        )}
      </select>
    </div>
  );
};

export default YearDropdown;
