import { Navigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useState, useEffect } from "react";
import Markdown from 'react-markdown'
import DataTable from "./Table";
import jsPDF from "jspdf";
const Report = ({ repo, owner, run_id }) => {
  const[glist,setglist]=useState([])
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
  const exportDataPdf = () => {
    if (sbom !== "") {
      // Convert sbom object to a formatted JSON string with indentation
      const jsonString = JSON.stringify(sbom, null, 2);
  
      // Set the font size and style
      const fontSize = 12;
      const lineHeight = 1.2;
      
      // Create a jsPDF instance
      const pdf = new jsPDF();
  
      // Set the initial position
      let yPosition = 10;
  
      // Split the formatted JSON string into lines
      const lines = pdf.splitTextToSize(jsonString, pdf.internal.pageSize.width - 20);
  
      // Add each line to the PDF
      lines.forEach((line) => {
        pdf.text(10, yPosition, line);
        yPosition += fontSize * lineHeight;
        
        // Check if the next line will go beyond the bottom margin
        if (yPosition > pdf.internal.pageSize.height - 10) {
          pdf.addPage(); // Move to the next page
          yPosition = 10; // Reset the yPosition for the new page
        }
      });
  
      // Save the PDF using FileSaver.js
      pdf.save("data.pdf");
    }
  };
  // Call your function when the document is ready or after jsPDF is loaded
  document.addEventListener("DOMContentLoaded", function () {
    // Call your function here
    // exportDataToPDF();
  });
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
      repo: `${repo}`,
      owner: `${owner}`,
      run_id: `${run_id}`
    },
    withCredentials: true
  };
  useEffect(() => {
    if (files.length == 0) {
      axios(options)
        .then(response => {
          const artifacts = response.data;

          setfiles(artifacts.data);
          // if (artifacts.data.length == 0){
          //    setfiles([0,0,0])}
          // setver(files[1])
          /*if( xml!= undefined)setxml(files[2]) */
          // console.log(sbom, ver, xml)
          // console.log(ver)


        })
        .catch(error => {
          console.error('Error fetching reports:', error.response ? error.response.data : error.message);
        });
    }
    setsbom(files[0])
  }, [files])
  const temp = { ...files[1] }.vulnerabilities
  console.log(temp)
  const temp1 = { ...files }
  /* setver(temp) */



  return (

    <>
      {files[0] && files[1] ? <><div>
        <h1 className="text-6xl font-medium  m-2 text-center mt-10">Vulnerability Table</h1>
        <DataTable advisories={temp}/>
        <h1 className="text-6xl font-medium  m-2 text-center mt-10">Sbom.json </h1>
        
        <div className="border-2 max-h-[500px] p-2 m-10 overflow-scroll no-scrollbar">
          <pre>{JSON.stringify(sbom, null, 2)}</pre>
          
        </div>
        <div className="flex justify-center">
        <button type="button" onClick={exportData} className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 m-4 border-blue-700 hover:border-blue-500 rounded">
          Export Data
        </button>
        <button type="button" onClick={exportDataPdf} className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 m-4 border-blue-700 hover:border-blue-500 rounded">
          Export Data as PDF
        </button>
        </div>
      </div>
      
        {/* <h1 className="text-6xl font-bold">VER</h1>
        <div className="max-h-[1000px] overflow-scroll no-scrollbar border-4 m-9"> }
        {temp != undefined && temp.map((item, k) => {
          let val=[]
         val.push(item["bom-ref"],item.recommendation,item.source.name,item.source.url)
         setglist({val}) 

         return (

           <Link key={k} to={`${item.source.url}`}>
           <div  className="mx-auto max-w-[600px] border-2 rounded-xl m-10 p-16 text-center gap-10 font-bold" >
              <div className="flex justify-between">
                <div >Status:{item.ratings[0].severity}</div>
className={color_picker(item.ratings[0].score)}
                <div>{item["bom-ref"]}</div>
              </div>

              <div className="flex mt-2  justify-between">
              <div>{item.recommendation}</div>
              <div>{item.source.name}</div>
              
              </div>
              <div><a href={item.source.url}  className="text-blue-600">{item.source.url}</a></div>

              
            </div>
           </Link> 
          )
        })}
      </div> */}
        
      
      <div>
        
      </div>
      
      </> :  (files.length>=1 && files[0]==undefined )? <h1 className="absolute text-center mt-[40%] text-4xl font-mono w-full"> NOT FOUND !!!, TRY ANOTHER ONE</h1> :<span class="loader"></span> }



    </>
  );
}

export default Report;