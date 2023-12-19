import { useParams } from "react-router-dom"
import Report from "../pages/Report"
const ReportPage =()=>{
    const {repo,name,run_id,report}=useParams()
    console.log(repo,name,run_id,report)
    return(
        <>
        <Report repo={repo} owner={name} run_id={run_id}/>
        </>
    )
}
export default ReportPage