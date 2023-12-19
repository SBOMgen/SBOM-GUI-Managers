import axios from 'axios';
import { useSelector } from 'react-redux';

const Workflows = () => {
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
            repo: 'Drawn2Shoe',
            owner: 'Akashsah2003'
        },
        withCredentials: true
      };
      
      axios(options)
        .then(response => {
          const workflows = response.data;
          console.log(workflows);
        })
        .catch(error => {
          console.error('Error fetching repositories:', error.response ? error.response.data : error.message);
        });
    return (
        <>
        <h1>Workflows</h1>
        </>
    )
}


export default Workflows;