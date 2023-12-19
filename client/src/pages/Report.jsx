import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useState, useEffect } from "react";
import Markdown from 'react-markdown'

const Report = ({repo,owner,run_id}) => {
  const [files, setfiles] = useState([])
  const [sbom, setsbom] = useState("")
  const [ver, setver] = useState("")
  // const [xml,setxml]=useState("")
  const color_picker = (score) => {
    if (score < 4) return "text-green-400"
    else if (score >= 4 && score <= 6) return "text-yellow-500"
    else if (score > 6) return "text-red-600"
  }
  const exportData = () => {
    {
      if (sbom != "") {
        const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
          JSON.stringify(sbom)
        )}`;
        const link = document.createElement("a");
        link.href = jsonString;
        link.download = `data` + `.json`;

        link.click();
      }

    }

  };
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
      /* repo: 'Drawn2Shoe',
      owner: 'Akashsah2003',
      run_id: '7247368969' */
      repo:`${repo}`,
      owner:`${owner}`,
      run_id:`${run_id}`
    },
    withCredentials: true
  };

  axios(options)
    .then(response => {
      const artifacts = response.data;

      setfiles(artifacts.data);
      setsbom(files[0])
      // setver(files[1])
      /*if( xml!= undefined)setxml(files[2]) */
      // console.log(sbom, ver, xml)
      // console.log(ver)


    })
    .catch(error => {
      console.error('Error fetching reports:', error.response ? error.response.data : error.message);
    });
  const temp = { ...files[1] }.vulnerabilities
  console.log(temp)
  const temp1 = { ...files }
  /* setver(temp) */



  return (

    <>
      <div>
        <h1 className="text-6xl font-bold  ">SBOM.JSON </h1>
        <button type="button" onClick={exportData} className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 m-4 border-blue-700 hover:border-blue-500 rounded">
          Export Data
        </button>
        <div className="border-2 max-h-[500px] p-2 m-10 overflow-scroll no-scrollbar">
          <pre>{JSON.stringify(sbom, null, 2)}</pre>
        </div>
      </div>
      <div>
        <h1 className="text-6xl font-bold">VER</h1>
        <div className="max-h-[1200px] overflow-scroll no-scrollbar border-4 m-9">
        {temp != undefined && temp.map((item, k) => {
          return (
            <div key={k} className="m-10 p-16 text-center gap-10 font-bold">
              <div className="flex justify-between">
                <div className={color_picker(item.ratings[0].score)}>Status:{item.ratings[0].severity}</div>

                <div>{item["bom-ref"]}</div>
              </div>


              <div className="my-7 border-2 p-10  no-scrollbar m-1 max-h-[150px] overflow-scroll"><Markdown>{item.description}</Markdown></div>
              <div>{item.recommendation}</div>
              <div>{item.source.name}</div>
              <div><a href={item.source.url}></a></div>

            </div>
          )
        })}
        </div>
        
      </div>
      <div>
        
      </div>

    </>
  );
}

export default Report;