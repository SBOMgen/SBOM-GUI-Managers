const Card_workflow = ({head,head_sha,event,run,url,triggering,owner})=>{
    return (
        <>
        <div className="w-full min-h-[450px] pb-0 my-0 text-xs">
                    <div className="max-w-[900px] px-10 py-6 mx-4 mt-20 bg-white rounded-lg shadow md:mx-auto border-1 overflow-scroll no-scrollbar">
                        <div className="flex flex-col items-center justify-center w-full m-auto sm:flex-row">
                            <div className="flex mx-auto sm:mr-10 sm:m-0">
                                <div className="items-center justify-center w-20 h-20 m-auto mr-4 sm:w-32 sm:h-32">
                                    <img alt="profil"
                                        src={owner}
                                        className="object-cover w-20 h-20 mx-auto rounded-full sm:w-32 sm:h-32" />
                                </div>
                            </div>
                            <div className="flex flex-col pt-4 mx-auto my-auto sm:pt-0 sm:mx-0">
                                <div className="flex flex-col mx-auto sm:flex-row sm:mx-0 ">
                                    <h2 className="flex pr-4 text-xl font-light text-gray-900 sm:text-3xl">{/* name of repo */}{triggering}</h2>
                                    <div className="flex justify-end w-full">
                                       <a href={url} className="hover: text-blue-600">{url}</a> {/* LINK TO OWNERS REPO */}
                                        <button className="p-1 ml-2 text-gray-700 border-transparent rounded-full cursor-pointer hover:text-blue-600 focus:outline-none focus:text-gray-600 "

                                            aria-label="Notifications" >
                                            
                                        </button>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between mt-3 space-x-2">
                                    <div className="flex"><span className="mr-1 font-semibold"> Event</span> {event}</div>
                                    <div className="flex"><span className="mr-1 font-semibold"> Head branch</span> {head}</div>
                                    <div className="flex"><span className="mr-1 font-semibold"> Head sha</span> {head_sha}</div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full pt-5 ml-40">
                            <h1 className="text-lg font-semibold text-gray-800 sm:text-xl">{run}</h1>
                           
                        </div>
                    </div>
                </div>
        </>
    )
}
export default Card_workflow