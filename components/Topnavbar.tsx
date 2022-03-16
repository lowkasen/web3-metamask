import { LegacyRef, useRef } from "react";

export const Topnavbar = () => {
  const toggleSidebar = () => {
    const sidebar = document.getElementById("sidenavbar");
    const topbarbtn = document.getElementById("topnavbarbtn");

    let handler = (e: MouseEvent) => {
      if (
        // if mousedown is not on sidebar or topnavbarbtn
        !(
          sidebar?.contains(e.target as HTMLElement) ||
          topbarbtn?.contains(e.target as HTMLElement)
        )
      ) {
        // hide side bar and remove event listener
        sidebar?.classList.add("-translate-x-full");
        document.removeEventListener("mousedown", handler);
      } else if (
        // case if click is on topnavbarbtn
        topbarbtn?.contains(e.target as HTMLElement)
      ) {
        // no need to hide sidebar because already hidden with the function below
        // only need to remove event listener
        document.removeEventListener("mousedown", handler);
      }
    };

    if (sidebar?.classList.value.includes("-translate-x-full")) {
      // if sidebar is not opened
      // add eventlistener
      sidebar?.classList.remove("-translate-x-full");
      document.addEventListener("mousedown", handler);
    } else {
      // if sidebar is opened
      sidebar?.classList.add("-translate-x-full");
    }
  };

  return (
    <div
      id="topnavbar"
      className="fixed flex md:hidden min-w-full z-10 justify-between items-center bg-zinc-900 text-slate-50 py-4 px-8 drop-shadow"
    >
      <span className="text-2xl font-bold">AddrInfo</span>
      <button id="topnavbarbtn" onClick={toggleSidebar}>
        <svg
          className="h-9 w-9 p-1 border rounded-md border-slate-50 stroke-slate-50"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </div>
  );
};
