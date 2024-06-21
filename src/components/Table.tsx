import React from 'react';

interface TableProps {
  data: { 
    date: string; 
    distance: number 
  }[];
  onDelete: (date: string) => void;
  onEdit: (date: string) => void;
}

const formatDate = (date: string): string => {
  return date.split('-').reverse().join('.');
};

const sortByDate = (data: { date: string; distance: number }[]) => {
  return data.slice().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

const Table: React.FC<TableProps> = ({ data, onDelete, onEdit }) => {
  const sortedData = sortByDate(data);

  return (
    <table>
      <thead>
        <tr>
          <th>Дата (ДД.ММ.ГГ)</th>
          <th>Пройдено км</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row) => (
          <tr key={row.date}>
            <td>{formatDate(row.date)}</td>
            <td>{row.distance}</td>
            <td>
              <button onClick={() => onDelete(row.date)}>✘</button>
              <button onClick={() => onEdit(row.date)}>✎</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;