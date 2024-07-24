import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleAuthentication, setTrue, setFalse } from "../function/authSlice";
import Card from "../components/Card"
const Repos = () => {


  let workflows = {};
  const [list, setlist] = useState([])
  const [filteredAdvisories, setFilteredAdvisories] = useState(list);
  const [searchTerm, setSearchTerm] = useState('');
  const [visibility, setVisibility] = useState('all');
  const auth = async () => {
    return await useSelector((state) => state.isAuthenticated);
  };
  if (!auth) {
    return <Navigate to="/" />;
  }

  const options = {
    method: 'GET',
    url: 'http://localhost:5000/github/repos',
    withCredentials: true
  };
  useEffect(() => {
    if (list.length == 0) {
      axios(options)
        .then(response => {
          workflows = response.data;
          setlist(workflows.data);
          console.log(list)

        })
        .catch(error => {
          console.error('Error fetching repositories:', error.response ? error.response.data : error.message);
        });
    }
  }, [])



  useEffect(() => {
    filterTable();
  }, [searchTerm, list, visibility]);

  const getNestedValue = (obj, path) => {
    const keys = path.split('.');
    return keys.reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
  };

  const filterTable = () => {
    const filtered = list.filter(item => {
      const valuesToSearch = ['name', 'language', 'visibility'];
      let searchString = valuesToSearch.map(key => {
        const value = getNestedValue(item, key);
        return value ? String(value) : '';
      }).join(' ').toLowerCase();

      console.log(searchString);
      const matchesSearchTerm = searchString.includes(searchTerm.toLowerCase());
      const matchesVisibility = visibility === 'all' || item.visibility === visibility;

      return matchesSearchTerm && matchesVisibility;
    });
    setFilteredAdvisories(filtered);
    // console.log("THis", filtered);
  };

  return (
    <div className="relative">
      <div className=" flex-col justify-center mt-10">
        <h1 className="flex justify-center font-bold py-10 text-7xl text-center">Your Repositories</h1>
        <div className="flex justify-center  mt-10 text-sm text-gray-700">
          <input name="search" className="md:w-96 h-10 text-center border border-gray-100 rounded-md focus:border-" type="text" placeholder="Search something" value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <div className="flex justify-center space-x-4 gap-2 md:gap-7 mt-4 mb-8">
          <button
            className={`px-6 py-2 inset-0 rounded-md transition duration-300 hover:scale-105 active:duration-75 active:scale-95 ${visibility === 'all' ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setVisibility('all')}
          >
            All
          </button>
          <button
            className={`px-6 py-2 inset-0 rounded-md transition duration-300 hover:scale-105 active:duration-75 active:scale-95 ${visibility === 'public' ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setVisibility('public')}
          >
            Public
          </button>
          <button
            className={`px-6 py-2 inset-0 rounded-md transition duration-300 hover:scale-105 active:duration-75 active:scale-95  ${visibility === 'private' ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setVisibility('private')}
          >
            Private
          </button>
        </div>
      </div>
      {filteredAdvisories.map((item, k) => {
        return (
          <Card key={k} visibility={item.visibility} name={item.name} user={item.owner.login} language={item.language} oi={item.open_issues} owner={item.owner.avatar_url} ownerUrl={item.owner.html_url} repoUrl={item.html_url} up={item.updated_at} url={item.url} cre={item.created_at} pri={item.private} desc={item.description} />
        )
      })}
    </div>
  )
};

export default Repos;
