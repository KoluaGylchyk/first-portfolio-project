import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { BiEdit } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import MyButton from "../../components/MyButton/MyButton";
import Modal from "../../components/Modal/Modal";
import ConfirmModal from "../../components/Modal/ConfirmModal";

const Contact = ({ allContacts, setAllContacts }) => {
  const navigate = useNavigate()
  const params = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [newContact, setNewContact] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [errors, setErrors] = useState({
    nameError: "",
    phoneError: "",
  });

  const [inputValues, setInputValues] = useState({
    inputNameValue: "",
    inputPhoneValue: "",
  });

  useEffect(() => {
    console.log("+");
    const NewContactItem = allContacts.find((item) => item.id == params.id);
    if(NewContactItem == undefined){
      navigate('/');
      return
    }
    setNewContact(NewContactItem);
    setInputValues({
      inputNameValue:NewContactItem.name,
      inputPhoneValue:NewContactItem.phoneNumber,
    })
  }, []);

  const handleOpenModal = () => {
    setIsOpen(true);
    
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setInputValues({
      inputNameValue:newContact.name,
      inputPhoneValue:newContact.phoneNumber,
    })
    
  };

  const handleOnChange = (e) => {
    setInputValues((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleConfirmDeleteContact = () => {
    setAllContacts((prev) => {
      const filterdContact = [...prev].filter((item)=>item.id !== newContact?.id);
      return filterdContact
      
    });
    setIsConfirmModalOpen(false)
    navigate('/')
  };
  const handleDiscardDeleteContact = () => {
    setIsConfirmModalOpen(false);
  };
  const handleOpenConfirmModal = () => {
    setIsConfirmModalOpen(true);
  };

  const handleSaveContact = (e) => {
    e.preventDefault();
    if (inputValues.inputNameValue.length == 0) {
      setErrors((prev) => {
        return { ...prev, nameError: "min lenght 1 simvol" };
      });
      return;
    } else {
      if (errors.nameError.length > 0) {
        setErrors((prev) => {
          return { ...prev, nameError: "" };
        });
      }
    }

    if (inputValues.inputPhoneValue.length == 0) {
      setErrors((prev) => {
        return { ...prev, phoneError: "min lenght 1 simvol" };
      });
      return;
    } else {
      if (errors.phoneError.length > 0) {
        setErrors((prev) => {
          return { ...prev, phoneError: "" };
        });
      }
    }

    setAllContacts((prev) => {
      const newContacts = [...prev].map((con) => {
        if (con.id == newContact?.id) {
          con.name = inputValues.inputNameValue;
          con.phoneNumber = inputValues.inputPhoneValue;
        }
        return con;
      });
      return newContacts;
    });
    handleCloseModal();
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-3 border m-3 mt-5 py-3 px-2">
      <div className="flex flex-col p-3">
       <span className="p-1 flex gap-2"><FaUserCircle/> {newContact?.name}</span>
        <span>{newContact?.phoneNumber}</span>
      </div>
      <div className="flex flex-end justify-end gap-3 w-full">
        <BiEdit className="transition hover:scale-110 text-2xl" onClick={handleOpenModal} title="Edit" />
        <MdDeleteForever className="transition hover:scale-110 text-2xl" onClick={handleOpenConfirmModal} title="Delete" />
      </div>
      {isOpen ? (
        <Modal isOpen={isOpen} setIsOpen={handleOpenModal}>
          <button
              className="border-2 py-1 px-3 m-2 max-w-2xl transition hover:scale-110 hover:underline"
              onClick={handleCloseModal}
            >
              Close
            </button>
          <div className="flex flex-col items-center justify-center border w-full px-3 py-3 mt-5">
            
            <h3 className="text-3xl">Edit Contact</h3>
            <form className="flex flex-col gap-2 " onSubmit={handleSaveContact}>
              <div className="p-2">
                <label className="inline-block pr-2 min-w-[57px]" htmlFor="editInputName">Name:</label>
                <input
                 className="border px-1" 
                  type="text"
                  id="editInputName"
                  name="inputNameValue"
                  value={inputValues.inputNameValue}
                  onChange={handleOnChange}
                />
                <div className="flex items-center justify-center">{errors.nameError}</div>
              </div>
              <div className=" p-2">
                <label className="pr-2" htmlFor="editInputNumber">Number:</label>
                <input
                className="border px-1"
                  type="text"
                  id="editInputNumber"
                  name="inputPhoneValue"
                  value={inputValues.inputPhoneValue}
                  onChange={handleOnChange}
                />
                <div>{errors.phoneError}</div>
              </div>
              <button className=" text-xl mb-2 transition hover:scale-110"> Save</button>
            </form>
          </div>
        </Modal>
      ) : (
        ""
      )}
      {isConfirmModalOpen ? (
        <ConfirmModal
          isOpen={isConfirmModalOpen}
          title={"Впевнений, що хочеш удалити контакт?"}
        >
          <div className="flex gap-4">
          <button  className="transition hover:scale-110 hover:text-green-500" onClick={handleConfirmDeleteContact}>Так</button>
          <button className="transition hover:scale-110 hover:text-red-500" onClick={handleDiscardDeleteContact}>Ні</button>
          </div>
         
        </ConfirmModal>
      ) : (
        ""
      )}
    </div>
  );
};

export default Contact;
