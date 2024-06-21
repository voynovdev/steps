import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';

interface DataItem {
  date: string;
  distance: number;
}

interface InputFormProps {
  data: DataItem | null;
  onSubmit: (date: string, distance: number) => void;
}

const InputForm: React.FC<InputFormProps> = ({ data, onSubmit }) => {
  const [date, setDate] = useState('');
  const [distance, setDistance] = useState('');

  useEffect(() => {
    // Обновляем состояние при изменении внешних данных
    if (data) {
      setDate(data.date);
      setDistance(data.distance.toString());
    }
  }, [data]);
  
  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const handleDistanceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (Number(value) >= 0) {
      setDistance(value);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (date && distance) {
      onSubmit(date, parseFloat(distance));
      setDate('');
      setDistance('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Дата (ДД.ММ.ГГ):
        <input type="date" value={date} onChange={handleDateChange} />
      </label>
      <label>
        Пройдено км:
        <input type="number" value={distance} onChange={handleDistanceChange} />
      </label>
      <button type="submit">Ок</button>
    </form>
  );
};

export default InputForm;