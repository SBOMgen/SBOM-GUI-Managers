import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleAuthentication, setTrue, setFalse } from "../function/authSlice";
import Card from "../components/Card"
const Repos = () => {
    let workflows ={};
    const [list,setlist]=useState([])
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
      
    return (
        <>
          {list.map((item,k)=>{
                 return(
                    <Card key={k} visibility={item.visibility}name={item.name} user={item.owner.login} language={item.language} oi={item.open_issues} owner={item.owner.avatar_url} up={item.updated_at} url={item.url} cre={item.created_at}/>
                 )
})}
        </>
    )
};

export default Repos;
