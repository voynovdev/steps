import React, { useState } from 'react';
import InputForm from './InputForm';
import Table from './Table';
import './Tracking.css';

interface DataItem {
  date: string;
  distance: number;
}

const Tracking: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [editingItem, setEditingItem] = useState<DataItem | null>(null);

  const handleSubmit = (date: string, distance: number) => {
    if (editingItem) {
      const updatedData = data.map((item) =>
        item.date === editingItem.date ? { ...item, date, distance } : item
      );
      setData(updatedData);
      setEditingItem(null);
    } else {
      const existingItem = data.find((item) => item.date === date);

      if (existingItem) {
        const newData = data.map((item) =>
          item.date === date ? { ...item, distance: item.distance + distance } : item
        );
        setData(newData);
      } else {
        setData([...data, { date, distance }]);
      }
    }

  };

  const handleDelete = (date: string) => {
    const newData = data.filter((item) => item.date !== date);
    setData(newData);
  };

  const handleEdit = (date: string) => {
    const itemToEdit = data.find((item) => item.date === date);
    if (itemToEdit) {
      setEditingItem(itemToEdit);
    }
  };

  return (
    <div className="container">
      <h1>Учёт тренировок</h1>
      <InputForm data={editingItem} onSubmit={handleSubmit} />
      <Table data={data} onDelete={handleDelete} onEdit={handleEdit}/>
    </div>
  );
};

export default Tracking;