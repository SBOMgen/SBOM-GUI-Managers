import { useNavigate } from "react-router-dom";
const Card = ({
  user,
  name,
  language,
  oi,
  owner,
  up,
  url,
  cre,
  desc,
  visibility,
  pri,
}) => {
  const navigate = useNavigate();
  return (
    // <>
    //         <div className="w-full min-h-[450px] pb-0 my-0 text-xs">
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
    //                             <h2 className="flex pr-4 text-xl font-light text-gray-900 sm:text-3xl">{/* name of repo */}{name}</h2>
    //                             <div className="flex justify-end w-full">
    //                                <a href={url} className="hover: text-blue-600">{url}</a> {/* LINK TO OWNERS REPO */}
    //                                 <button classNameName="p-1 ml-2 text-gray-700 border-transparent rounded-full cursor-pointer hover:text-blue-600 focus:outline-none focus:text-gray-600 "

    //                                     aria-label="Notifications" onClick={()=>{navigate(`/workflow/`+`${user}`+`/`+`${name}`)}} >
    //                                     {/* <svg className="w-4 h-4 sm:w-8 sm:h-8" fill="none" strokeLinecap="round" strokeLinejoin="round"
    //                                         strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24">
    //                                         <path
    //                                             d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    //                                         <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    //                                     </svg> */}
    //                                     Button
    //                                 </button>
    //                             </div>
    //                         </div>
    //                         <div classNameName="flex items-center justify-between mt-3 space-x-2">
    //                             <div classNameName="flex"><span classNameName="mr-1 font-semibold"> Number of open issues</span> {oi}</div>
    //                             <div classNameName="flex"><span classNameName="mr-1 font-semibold"> created</span> {cre}</div>
    //                             <div classNameName="flex"><span classNameName="mr-1 font-semibold">updated</span> {up}</div>
    //                         </div>
    //                     </div>
    //                 </div>
    //                 <div classNameName="w-full pt-5 ml-40">
    //                     <h1 classNameName="text-lg font-semibold text-gray-800 sm:text-xl">{visibility}</h1>
    //                     <p classNameName="text-sm text-gray-500 md:text-base">{language}</p>
    //                 </div>
    //             </div>
    //         </div>
    // </>
    <div className="flex flex-col py-6">
      <div className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-white">
        <div className="w-full md:w-1/3 bg-white grid place-items-center">
          <img
            src={owner}
            alt="profile"
            className="rounded-full object-cover p-8"
          />
        </div>
        <div className="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3">
          <div className="flex justify-between item-center">
            <p className="text-gray-500 font-medium hidden md:block">
              {user}
            </p>
            <div className="bg-gray-200 px-3 py-1 rounded-full text-xs font-medium text-gray-800 hidden md:block">
              {pri == true?"Private":"Public"}
            </div>
          </div>
          <h3 className="font-black text-gray-800 md:text-3xl text-xl">
            {name}
          </h3>
          <p className="text-xl text-gray-800">
            {desc}
          </p>
          <p className="md:text-lg text-gray-500 text-base">
             <a href={url} className="hover: text-blue-600">{url}</a>
          </p>
          <button className="bg-gray-300 hover:bg-blue-300 text-white font-bold mt-2 py-2 px-4 rounded-full max-w-fit"
              aria-label="Notifications" onClick={()=>{navigate(`/workflow/`+`${user}`+`/`+`${name}`)}}> View Workflow</button>
        </div>
      </div>
    </div>
  );
};
export default Card;
