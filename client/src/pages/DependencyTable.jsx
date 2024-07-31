import React, { useState, useEffect } from 'react';

const DependencyTable = ({ dependencies }) => {
  const [filteredDependencies, setFilteredDependencies] = useState(dependencies);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    filterTable();
  }, [searchTerm, dependencies]);

  const filterTable = () => {
    const filtered = dependencies.filter(dep => {
      const searchString = `${dep.group} ${dep.name} ${dep.version} ${dep.purl}`.toLowerCase();
      return searchString.includes(searchTerm.toLowerCase());
    });
    setFilteredDependencies(filtered);
    setCurrentPage(1); // Reset to the first page on new search
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Calculate the displayed dependencies for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDependencies = filteredDependencies.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredDependencies.length / itemsPerPage);

  return (
    <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
      <div className="align-middle rounded-tl-lg rounded-tr-lg inline-block w-full py-4 overflow-hidden bg-white shadow-lg px-12">
        <div className="flex justify-between">
          <div className="inline-flex border rounded w-7/12 px-2 lg:px-6 h-12">
            <div className="flex flex-wrap items-stretch w-full h-full mb-6 relative">
              <div className="flex">
                <span className="flex items-center leading-normal rounded rounded-r-none border border-r-0 border-none lg:px-3 py-2 whitespace-no-wrap text-grey-dark text-sm">
                  <svg width="18" height="18" className="w-4 lg:w-auto" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.11086 15.2217C12.0381 15.2217 15.2217 12.0381 15.2217 8.11086C15.2217 4.18364 12.0381 1 8.11086 1C4.18364 1 1 4.18364 1 8.11086C1 12.0381 4.18364 15.2217 8.11086 15.2217Z" stroke="#455A64" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M16.9993 16.9993L13.1328 13.1328" stroke="#455A64" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
              <input
                type="text"
                className="flex-shrink flex-grow flex-auto leading-normal tracking-wide w-px flex-1 border border-none text-black border-l-0 rounded rounded-l-none px-3 relative focus:outline-none text-xxs lg:text-xs lg:text-base font-bold"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg font-bold">
        <table className="min-w-full max-h-[300px] overflow-scroll">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Group</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Name</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Version</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">PURL</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {currentDependencies.map((dep, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  <div className="text-sm leading-5 text-gray-800">{dep.group}</div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  <div className="text-sm leading-5 text-blue-900">{dep.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">{dep.version}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                  <a href={dep.purl} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">{dep.purl}</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white"
          >
            Previous
          </button>
          <div className="flex items-center">
            Page {currentPage} of {totalPages}
          </div>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DependencyTable;
