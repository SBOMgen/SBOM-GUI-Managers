import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
const DataTable = ({ advisories }) => {
  const [filteredAdvisories, setFilteredAdvisories] = useState(advisories);
  const [searchTerm, setSearchTerm] = useState('');
  const color_picker = (score) => {
    if (score < 4) return "text-green-400"
    else if (score >= 4 && score <= 6) return "text-yellow-500"
    else if (score > 6) return "text-red-600"
  }
  useEffect(() => {
    filterTable();
  }, [searchTerm, advisories]);

  const getNestedValue = (obj, path) => {
    const keys = path.split('.');
    return keys.reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
  };

  const filterTable = () => {
    const filtered = advisories.filter(item => {
      const valuesToSearch = ['id', 'bom-ref', 'recommendation', 'source.name','ratings[0].severity'];
      let searchString = valuesToSearch.map(key => {
        const value = getNestedValue(item, key);
        return value ? String(value) : '';
      }).join(' ').toLowerCase();
      searchString=searchString+(item.ratings[0].severity);
      console.log(searchString);
      return searchString.includes(searchTerm.toLowerCase());
    });
    setFilteredAdvisories(filtered);
    console.log(filtered);
  };

  return (
    // <>
    // <label htmlFor="searchInput" classNameName='text-3xl mx-3'>Search:</label>
    //   <input
    //     type="text"
    //     id="searchInput"
    //     value={searchTerm}
    //     onChange={(e) => setSearchTerm(e.target.value)}
    //     classNameName="text-3xl border-4 mb-3 rounded-xl"
    //   />
    // <div classNameName='max-h-[500px] overflow-scroll no-scrollbar text-sm m-2 p-10'>
      

    //   <table classNameName="text-center mx-auto m-3 ">
    //     <thead>
    //       <tr classNameName="truncate gap-8">
    //         <th>ID</th>
    //         <th>Bom-ref</th>
    //         <th>Recommendation</th>
    //         <th>Source</th>
    //         <th>Severity</th>
    //         <th></th>
    //       </tr>
    //     </thead>
    //     <tbody classNameName="m-2">
           
    //       {filteredAdvisories.map((item, index) => (
    //         <tr key={index}>
    //           <td>{item.id}</td>
    //           <td>{item["bom-ref"]}</td>
    //           <td>{item.recommendation}</td>
    //           <td>{item.source.name}</td>
    //           <td classNameName={`${color_picker(item.ratings[0].score)}`}>{item.ratings[0].severity}</td>
              

    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>
    // </>
    // <>
    <>
    <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
    <div className="align-middle rounded-tl-lg rounded-tr-lg inline-block w-full py-4 overflow-hidden bg-white shadow-lg px-12">
        <div className="flex justify-between">
            <div className="inline-flex border rounded w-7/12 px-2 lg:px-6 h-12">
                <div className="flex flex-wrap items-stretch w-full h-full mb-6 relative">
                    <div className="flex">
                        <span className="flex items-center leading-normal rounded rounded-r-none border border-r-0 border-none lg:px-3 py-2 whitespace-no-wrap text-grey-dark text-sm">
                            <svg width="18" height="18" className="w-4 lg:w-auto" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.11086 15.2217C12.0381 15.2217 15.2217 12.0381 15.2217 8.11086C15.2217 4.18364 12.0381 1 8.11086 1C4.18364 1 1 4.18364 1 8.11086C1 12.0381 4.18364 15.2217 8.11086 15.2217Z" stroke="#455A64" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M16.9993 16.9993L13.1328 13.1328" stroke="#455A64" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </span>
                    </div>
                    <input type="text" className="flex-shrink flex-grow flex-auto leading-normal tracking-wide w-px flex-1 border border-none text-black border-l-0 rounded rounded-l-none px-3 relative focus:outline-none text-xxs lg:text-xs lg:text-base font-bold" placeholder="Search" value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
            </div>
        </div>
    </div>
    <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
        <table className="min-w-full max-h-[300px] overflow-scroll">
            <thead>
                <tr>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">ID</th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Bom-ref</th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Recommendation</th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Source</th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Security</th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Created At</th>
                </tr>
            </thead>
            <tbody className="bg-white">
                 {filteredAdvisories.map((item, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                                        <div className="flex items-center">
                                            <div>
                                                <div className="text-sm leading-5 text-gray-800">{item.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                                        <div className="text-sm leading-5 text-blue-900">{item["bom-ref"]}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">{item.recommendation}</td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">{item.source.name}</td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                                        <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                        
                                        <span className={color_picker(item.ratings[0].score)} >{item.ratings[0].severity}</span>
                                    </span>
                                    </td>
                                    <td className="px-2 py-2 whitespace-no-wrap text-center border-b border-gray-500 text-sm leading-5">
                                        <button className="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none"><a href={item.source.url}>View</a></button>
                                    </td>
                          </tr>
                 ))}
            </tbody>
        </table> 
    </div>
    </div>
    </>
  );
};



export default DataTable;
