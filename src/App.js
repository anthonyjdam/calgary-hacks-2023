import React from "react";
import Sidebar from "./components/Sidebar";


function App() {


  return (
    <>
      <div className="flex flex-row bg-black text-white min-h-screen">

        <Sidebar />

        <div className="p-10 flex-1 flex flex-row justify-between border-solid border-white border-2 ">
          <h1 className="font-semibold text-3xl">Lam study tracker</h1>
          <ul className="flex flex-row gap-10">
            <li><a href="https://www.google.com/">link1</a></li>
            <li><a href="https://www.google.com/">link2</a></li>
            <li><a href="https://www.google.com/">link3</a></li>
          </ul>
        </div>

      </div>
    </>
  );
}



export default App;
