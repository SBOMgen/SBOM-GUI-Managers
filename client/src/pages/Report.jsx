import { Navigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import axios from "axios";
import { useState, useEffect } from "react";
import DataTable from "./Table";
import DependencyTable from "./DependencyTable";
import jsPDF from "jspdf";

const Report = ({ repo, owner, run_id }) => {
  const [glist, setglist] = useState([]);
  const [files, setfiles] = useState([]);
  const [sbom, setsbom] = useState("");
  const [severityCounts, setSeverityCounts] = useState({
    low: 0,
    medium: 0,
    high: 0,
    critical: 0,
  });
  const [ver, setver] = useState("");
  const [low, setLow] = useState(0);

  const color_picker = (score) => {
    if (score < 4) return "text-green-400";
    else if (score >= 4 && score <= 6) return "text-yellow-500";
    else if (score > 6) return "text-red-600";
  };

  const exportData = () => {
    if (sbom !== "") {
      const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(JSON.stringify(sbom))}`;
      const link = document.createElement("a");
      link.href = jsonString;
      link.download = `data` + `.json`;
      link.click();
    }
  };

  const exportDataPdf = () => {
    if (sbom !== "") {
      const jsonString = JSON.stringify(sbom, null, 2);
      const fontSize = 12;
      const lineHeight = 1.2;
      const pdf = new jsPDF();
      let yPosition = 10;
      const lines = pdf.splitTextToSize(jsonString, pdf.internal.pageSize.width - 20);
      lines.forEach((line) => {
        pdf.text(10, yPosition, line);
        yPosition += fontSize * lineHeight;
        if (yPosition > pdf.internal.pageSize.height - 10) {
          pdf.addPage();
          yPosition = 10;
        }
      });
      pdf.save("data.pdf");
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
      repo: `${repo}`,
      owner: `${owner}`,
      run_id: `${run_id}`,
    },
    withCredentials: true,
  };

  useEffect(() => {
    if (files.length === 0) {
      axios(options)
        .then((response) => {
          const artifacts = response.data;
          setfiles(artifacts.data);
        })
        .catch((error) => {
          console.error('Error fetching reports:', error.response ? error.response.data : error.message);
        });
    }
    setsbom(files[0]);
  }, [files]);

  const temp = { ...files[1] }.vulnerabilities;
  const dependencies = { ...files[0] }.components;

  useEffect(() => {
    if (temp && temp.length > 0) {
      const counts = { low: 0, medium: 0, high: 0, critical: 0 };
      temp.forEach((item) => {
        if (item.ratings && item.ratings.length > 0) {
          const severity = item.ratings[0].severity;
          switch (severity) {
            case 'low':
              counts.low += 1;
              break;
            case 'medium':
              counts.medium += 1;
              break;
            case 'high':
              counts.high += 1;
              break;
            case 'critical':
              counts.critical += 1;
              break;
            default:
              break;
          }
        }
      });
      setSeverityCounts(counts);
      setLow(counts.low);
    }
  }, [temp]);

  const totalVulnerabilities = temp ? temp.length : 0;

  const data = [
    { name: 'Low', value: severityCounts.low },
    { name: 'Medium', value: severityCounts.medium },
    { name: 'High', value: severityCounts.high },
    { name: 'Critical', value: severityCounts.critical },
  ];

  const COLORS = ['#39FF14', '#CDC50A', '#FF0000', '#8884d8'];

  return (
    <>
      {files[0] && files[1] ? (
        <>
          <div>
            <h1 className="mt-20 text-6xl font-medium m-2 text-center ">Vulnerability Table</h1>
            <div className="flex flex-col">
              <div className="flex items-center py-0 pl-[200px] mt-10 justify-center">
                <PieChart width={800} height={450}>
                  <Pie data={data} cx={230} cy={250} innerRadius={90} outerRadius={160} fill="#8884d8" dataKey="value">
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend layout="vertical" align="right" verticalAlign="top" width={100} margin={{ right: 0 }} />
                  <Tooltip />
                  <text x={240} y={250} textAnchor="middle" dominantBaseline="middle" fontSize={20} fill="#000">
                    Total: {totalVulnerabilities}
                  </text>
                </PieChart>
              </div>
              <DataTable advisories={temp} />
              <h1 className="text-6xl font-medium m-2 text-center mt-10">Dependencies </h1>
              <DependencyTable dependencies={dependencies} />
            </div>
            <h1 className="text-6xl font-medium m-2 text-center mt-10">Sbom.json </h1>
            <div className="border-2 max-h-[500px] p-2 m-10 overflow-scroll no-scrollbar">
              <pre>{JSON.stringify(sbom, null, 2)}</pre>
            </div>
            <button
              type="button"
              onClick={exportData}
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 m-4 border-blue-700 hover:border-blue-500 rounded"
            >
              Export Data
            </button>
            <button
              type="button"
              onClick={exportDataPdf}
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 m-4 border-blue-700 hover:border-blue-500 rounded"
            >
              Export Data as PDF
            </button>
          </div>
          <div></div>
        </>
      ) : files.length >= 1 && files[0] == undefined ? (
        <h1 className="absolute text-center mt-[40%] text-4xl font-mono w-full"> NOT FOUND !!!, TRY ANOTHER ONE</h1>
      ) : (
        <span class="loader"></span>
      )}
    </>
  );
};

export default Report;
