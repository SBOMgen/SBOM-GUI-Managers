import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleAuthentication, setTrue, setFalse } from "../function/authSlice";
import Card from "../components/Card"
const Repos = () => {
   

    let workflows ={};
    const [list,setlist]=useState([])
    const [filteredAdvisories, setFilteredAdvisories] = useState(list);
    const [searchTerm, setSearchTerm] = useState('');
    const auth = async () => {
        return await useSelector((state) => state.isAuthenticated);
    };
    if (!auth) {
        return <Navigate to="/" />;
    }
    //   const [user, setUser] = useState(null);

    // useEffect(() => {
    //   const getUser = async () => {
    //     await fetch("http://localhost:5000/auth/login/success", {
    //       method: "GET",
    //       credentials: "include",
    //       headers: {
    //         Accept: "application/json",
    //         "Content-Type": "application/json",
    //         "Access-Control-Allow-Credentials": true,
    //       },
    //     })
    //       .then((response) => {
    //         if (response.status === 200) return response.json();
    //         throw new Error("authentication has been failed!");
    //       })
    //       .then((resObject) => {
    //         setUser(resObject.user);
    //         console.log("YES")
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //       });
    //   };
    //   getUser();
    //   // console.log(user);
    // }, []);

    // if (user == null) {
    //   return <Navigate to="/" />
    // }

    // const options = {
    //     method: 'GET',
    //     url: 'https://api.github.com/user/repos',
    //     headers: {
    //       'Authorization': `Bearer ${user.accessToken}`,
    //       'User-Agent': 'SBOM-UI'
    //     },
    //   };3

    //   axios(options)
    //     .then(response => {
    //       const repos = response.data.map(repo => ({ name: repo.name, private: repo.private, url: repo.html_url }));
    //       console.log(repos);
    //     })
    //     .catch(error => {
    //       console.error('Error fetching repositories:', error.response ? error.response.data : error.message);
    //     });
    // console.log(user);
    
    const options = {
        method: 'GET',
        url: 'http://localhost:5000/github/repos',
        /* params: {
            repo: 'Drawn2Shoe',
            owner: 'Akashsah2003'
        }, */
        withCredentials: true
      };
      useEffect(()=>{
      if (list.length == 0)
      {
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
      },[list])

 
  
  useEffect(() => {
    filterTable();
  }, [searchTerm, list]);

  const getNestedValue = (obj, path) => {
    const keys = path.split('.');
    return keys.reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
  };
 
  const filterTable = () => {
    const filtered = list.filter(item => {
      const valuesToSearch = ['name','language' ,'private'];
      let searchString = valuesToSearch.map(key => {
        const value = getNestedValue(item, key);
        return value ? String(value) : '';
      }).join(' ').toLowerCase();
      
      console.log(searchString);
      return searchString.includes(searchTerm.toLowerCase());
    });
    setFilteredAdvisories(filtered);
    console.log("THis",filtered);
  };
      
    return (
        <>
        <div className="flex justify-around mt-5">
        <h1 className="font-bold text-3xl">Your Repositories</h1>
        <input name="search"type="text"  className ="block h-[25px] px-12 ml-[50px] text-sm text-gray-700" placeholder="Search something" value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
          {filteredAdvisories.map((item,k)=>{
                 return(
                    <Card key={k} visibility={item.visibility}name={item.name} user={item.owner.login} language={item.language} oi={item.open_issues} owner={item.owner.avatar_url} up={item.updated_at} url={item.url} cre={item.created_at} pri={item.private} desc={item.description}/>
                 )
          })}
        </>
    )
};

export default Repos;
