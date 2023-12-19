import Workflows from '../pages/Workflows'
import { useParams } from 'react-router-dom'
const WorkflowsPage =()=>{
    const {name,repo}=useParams()

    
    return (
        <>
        
        <Workflows repo={repo} owner={name}/>
        
        </>
    )
}
export default WorkflowsPage