import axios from 'axios';
import { useSelector } from 'react-redux';
import {useState } from 'react'
import Card_workflow from '../components/Card_workflow'
const Workflows = ({repo,owner}) => {
    const [list,setlist]=useState([])
    const auth = async () => {
        return await useSelector((state) => state.isAuthenticated);
    };
    if (!auth) {
        return <Navigate to="/" />;
    }
    const options = {
        method: 'GET',
        url: 'http://localhost:5000/github/workflows',
        params: {
            repo: `${repo}`,
            owner:`${owner}`
        },
        withCredentials: true
      };
      
      axios(options)
        .then(response => {
          const workflows = response.data;
         console.log(workflows.data);
          setlist(workflows.data);
        })
        .catch(error => {
          console.error('Error fetching repositories:', error.response ? error.response.data : error.message);
        });
    return (
        <>
        {
        list.map((item,k)=>{
          console.log(item)
          return(
            
            <div key={k}>
               <Card_workflow head={item.head_branch} head_sha={item.head_sha} event={item.event} run={item.run_started_at} url={item.workflow_url} owner={item.actor.avatar_url} triggering={item.triggering_actor.login}/>
         
            </div>
             )
           
        })}
        </>
    )
}


export default Workflows;