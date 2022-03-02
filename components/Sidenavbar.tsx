import {
  MenuIcon,
  HomeIcon,
  SupportIcon,
  UserIcon,
} from "@heroicons/react/solid";

export default function Sidenavbar() {
  return (
    <div className="flex flex-col w-96 py-10 px-6 bg-zinc-900 text-gray-200">
      <div className="flex">
        <MenuIcon className="flex-none w-6" />
        <div className="flex-auto flex justify-center items-center">
          <p className="text-2xl font-bold">Logo</p>
        </div>
      </div>
      <div className="flex-auto flex flex-col py-20">
        <div className="flex my-4">
          <HomeIcon className="flex-none w-6" />
          <p className="flex-auto ml-4 font-medium">Home</p>
        </div>
        <div className="flex my-4">
          <UserIcon className="flex-none w-6" />
          <p className="flex-auto ml-4 font-medium">About</p>
        </div>
        <div className="flex my-4">
          <SupportIcon className="flex-none w-6" />
          <p className="flex-auto ml-4 font-medium">Contact</p>
        </div>
      </div>
      <div className="flex justify-center">
        <button className="flex-auto border rounded-md border-slate-50 p-3 hover:bg-zinc-800">
          Connect
        </button>
      </div>
    </div>
  );
}
