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
  ownerUrl,
  repoUrl
}) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col py-6">
      <div className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-2xl shadow-slate-200 p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-white">
        <div className="w-full md:w-1/3 bg-white grid place-items-center">
        <a href={ownerUrl} target="_blank">
          <img
            src={owner}
            alt="profile"
            className="rounded-full object-cover p-8"
          />
        </a>
        </div>
        <div className="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3">
          <div className="flex justify-between item-center">
            <p className="text-gray-500 font-medium hidden md:block">
              {user}
            </p>
            <div className="bg-gray-200 px-3 py-1 rounded-full text-xs font-medium text-gray-800 hidden md:block">
              {visibility}
            </div>
          </div>
          <a className="font-black text-gray-800 md:text-3xl text-3xl"
            href={ownerUrl}
            target="_blank"
          >
            {name}
          </a>
          <p className="text-xl text-gray-800">
            {desc}
          </p>
          <p className="md:text-lg text-gray-500 text-base">
              <a href={url} className="text-blue-600 hover:text-primary">{url}</a>
          </p>
          <button className=" inset-0 text-white bg-primary border-2 border-primary transition duration-300 hover:scale-105 active:duration-75 active:scale-95 hover:text-primary  hover:bg-white font-bold mt-2 py-2 px-4 rounded-full max-w-fit"
              aria-label="Notifications" onClick={()=>{navigate(`/workflow/`+`${user}`+`/`+`${name}`)}}> View Workflow</button>
        </div>
      </div>
    </div>
  );
};
export default Card;
