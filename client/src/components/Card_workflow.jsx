import tick from "../img/yes.png"
import cross from "../img/delete.png"

const Card_workflow = ({head,head_sha,event,run,url,triggering,owner,title,conc,com_id})=>{

    return (
        // <>
        // <div className="w-full pb-0 my-0 text-xs">
        //             <div className="max-w-[900px] px-10 py-6 mx-4 mt-20 bg-white rounded-lg shadow md:mx-auto border-1 overflow-scroll no-scrollbar">
        //                 <div className="flex flex-col items-center justify-center w-full m-auto sm:flex-row">
        //                     <div className="flex mx-auto sm:mr-10 sm:m-0">
        //                         <div className="items-center justify-center w-20 h-20 m-auto mr-4 sm:w-32 sm:h-32">
        //                             <img alt="profile"
        //                                 src={owner}
        //                                 className="object-cover w-20 h-20 mx-auto rounded-full sm:w-32 sm:h-32" />
        //                         </div>
        //                     </div>
        //                     <div className="flex flex-col pt-4 mx-auto my-auto sm:pt-0 sm:mx-0">
        //                         <div className="flex flex-col mx-auto sm:flex-row sm:mx-0 ">
        //                             <h2 className="flex pr-4 text-xl font-light text-gray-900 sm:text-3xl">{/* name of repo */}{triggering}</h2>
        //                             <div className="flex justify-end w-full">
        //                                <a href={url} className="hover: text-blue-600">{url}</a> {/* LINK TO OWNERS REPO */}
        //                                 <button className="p-1 ml-2 text-gray-700 border-transparent rounded-full cursor-pointer hover:text-blue-600 focus:outline-none focus:text-gray-600 "

        //                                     aria-label="Notifications" >
                                            
        //                                 </button>
        //                             </div>
        //                         </div>
        //                         <div className="flex items-center justify-between mt-3 space-x-2">
        //                             <div className="flex"><span className="mr-1 font-semibold"> Event</span> {event}</div>
        //                             <div className="flex"><span className="mr-1 font-semibold"> Head branch</span> {head}</div>
        //                             <div className="flex"><span className="mr-1 font-semibold"> Head sha</span> {head_sha}</div>
        //                         </div>
        //                     </div>
        //                 </div>
        //                 <div className="w-full pt-5 ml-40">
        //                     <h1 className="text-lg font-semibold text-gray-800 sm:text-xl">{run}</h1> 
        //                 </div>
        //             </div>
        //         </div>
        // </>
        <div className="flex flex-col py-6">
      <div className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-white">
        <div className="w-full md:w-1/3 bg-white p-14">
          <img
            src={conc==="success"?tick:cross}
            alt="success"
            className="rounded-full object-cover p-8"
          />
        </div>
        <div className="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3">
          <div className="flex justify-between item-center">
          <p className="text-xl text-gray-800 font-bold">
            {title}
          </p>
            <div className="bg-green-200 px-3 py-1 rounded-full text-xs font-medium text-gray-800 hidden md:block">
              {head}
            </div>
          </div>
          <h5 className=" text-gray-800 md:text-sm text-xs md:p-8 ">
            <strong>Commit-id: </strong>
            <i>{com_id}</i> by <strong>{triggering}</strong>
          </h5>
          <p className="text-gray-500 font-medium md:block ml-44">
            Started on {new Date(run).getDate() + '/' + (new Date(run).getMonth() + 1) + '/' + new Date(run).getFullYear()}
          </p>
        </div>
      </div>
    </div>
    )
}
export default Card_workflow;