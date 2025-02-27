import { useState } from "react";
import { Link } from "react-router-dom";
const GenericTable = ({ data, columns, pageSize, onFilter, detailPrefix }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterValues, setFilterValues] = useState({});

  // Handle pagination
  const totalPages = Math.ceil(data.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = data.slice(startIndex, startIndex + pageSize);

  // Handle filtering
  const handleFilterChange = (key, value) => {
    const newFilters = { ...filterValues, [key]: value };
    setFilterValues(newFilters);
    onFilter(newFilters);
  };

  return (
    <div className="p-4">
      {/* Filter inputs */}
      <div className="flex flex-wrap gap-2 mb-4">
        {columns.map((col) => (
          <input
            key={col.key}
            type="text"
            placeholder={`Filter by ${col.header}`}
            onChange={(e) => handleFilterChange(col.key, e.target.value)}
            className="input input-bordered input-sm flex-grow"
          />
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="bg-base-200">
                  {col.header}
                </th>
              ))}
              <th className="bg-base-200">
                  Details
              </th>
              
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-base-200">
                {columns.map((col) => (
                  <td key={col.key}>
                  {col.key === 'company' || col.key ==='department' ? row[col.key][`${col.key}_name`] : 
              row[col.key]}
                  
                  </td>
                ))}
                <td><Link to={`/${detailPrefix}/${row['id']}`}>Details</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          className="btn btn-sm"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="btn btn-sm"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default GenericTable;
