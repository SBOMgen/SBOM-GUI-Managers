import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";


const Report = () => {
    const auth = async () => {
        return await useSelector((state) => state.isAuthenticated);
    };
    if (!auth) {
        return <Navigate to="/" />;
    }
    const options = {
        method: 'GET',
        url: 'http://localhost:5000/github/artifacts',
        params: {
            repo: 'Drawn2Shoe',
            owner: 'Akashsah2003',
            run_id: '7247368969'
        },
        withCredentials: true
      };
      
      axios(options)
        .then(response => {
          const artifacts = response.data;
          console.log(artifacts);
        })
        .catch(error => {
          console.error('Error fetching reports:', error.response ? error.response.data : error.message);
        });
    return <>Report</>;
}

export default Report;