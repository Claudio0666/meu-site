import React, { useState, useEffect } from 'react';
import { useTable } from 'react-table';
import { format } from 'date-fns';
import './css/CheckInHistory.css';

const CheckInHistory = () => {
  const [checkIns, setCheckIns] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCheckIns = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/checkin', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Erro ao buscar check-ins');
        }

        const data = await response.json();
        setCheckIns(data);
      } catch (err) {
        console.error('Erro ao buscar check-ins:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCheckIns();
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Data',
        accessor: 'date',
        Cell: ({ value }) => format(new Date(value), 'dd/MM/yyyy'),
      },
      {
        Header: 'Emoção',
        accessor: 'emotion',
      },
      {
        Header: 'Comentário',
        accessor: 'comment',
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: checkIns,
  });

  return (
    <div className="check-in-history">
      <h1>Histórico de Check-in</h1>
      {loading && <p>Carregando check-ins...</p>}
      {error && <p className="error">{error}</p>}
      {checkIns.length === 0 && !loading ? (
        <p>Nenhum check-in registrado.</p>
      ) : (
        <table {...getTableProps()} className="check-in-table">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th key={column.id} {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr key={row.id} {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td key={cell.column.id} {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CheckInHistory;
