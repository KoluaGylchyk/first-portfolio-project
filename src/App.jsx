import React, { useState } from "react";
import { Route, Routes, NavLink } from "react-router-dom";
import { BsPersonFillAdd } from "react-icons/bs";
import { RiContactsBook2Fill } from "react-icons/ri";
import AddNewContact from "./pages/AddNewContact/AddNewContact";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";

const App = () => {
  const [allContacts, setAllContacts] = useState([
    {
      name: "MyPhone",
      phoneNumber: "+380635063723",
      id: `${Math.random()}`.split(".")[1],
      favorite: false,
    },
    {
      name: "Bohdan",
      phoneNumber: "+380631063921",
      id: `${Math.random()}`.split(".")[1],
      favorite: false,
    },
    {
      name: "Maryna",
      phoneNumber: "+380123335544",
      id: `${Math.random()}`.split(".")[1],
      favorite: false,
    },
    {
      name: "Mather",
      phoneNumber: "+380635063721",
      id: `${Math.random()}`.split(".")[1],
      favorite: false,
    },
    {
      name: "Ilon Mask",
      phoneNumber: "+380635078515",
      id: `${Math.random()}`.split(".")[1],
      favorite: true,
    },
    {
      name: "Jeffrey Preston",
      phoneNumber: "+380635004739",
      id: `${Math.random()}`.split(".")[1],
      favorite: true,
    },
    {
      name: "Mark Elliot Zuckerberg",
      phoneNumber: "+380635015005",
      id: `${Math.random()}`.split(".")[1],
      favorite: true,
    },
    { name: "MyPhone", phoneNumber: "+380635063724", id: `${Math.random()}`.split('.')[1] },
    { name: "Bohdan", phoneNumber: "+380635063724", id: `${Math.random()}`.split('.')[1] },
    { name: "Bohdan2", phoneNumber: "+3806350637242", id: `${Math.random()}`.split('.')[1] },

  ]);
  return (
    <div className="flex  text-xl">
      <div className="w-1/4">
        <nav className="flex  gap-2 p-2 item-end h-full">
          <ul className="p-3 flex flex-col gap-3 ">
            <li className=" flex items-center justify-start gap-2 border p-2  transition hover:scale-110">
              <RiContactsBook2Fill />
              <NavLink
                className={({ isActive }) =>
                  "transition-all ease-in-out delay-150 hover:underline" +
                  (!isActive ? "" : " text-red-500")
                }
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li className="flex items-center justify-center gap-2 border p-2 transition hover:scale-110">
              <BsPersonFillAdd />
              <NavLink
                className={({ isActive }) =>
                "transition-all ease-in-out delay-150 hover:underline" +
                (!isActive ? "" : " text-red-500")
              }
                to="/AddNewContact"
              >
                AddNewContact
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <Routes>
        <Route
          index
          element={
            <Home allContacts={allContacts} setAllContacts={setAllContacts} />
          }
        />
        <Route
          path="/AddNewContact"
          element={
            <AddNewContact
              allContacts={allContacts}
              setAllContacts={setAllContacts}
            />
          }
        />
        <Route
          path="/Contact/:id"
          element={
            <Contact
              allContacts={allContacts}
              setAllContacts={setAllContacts}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
