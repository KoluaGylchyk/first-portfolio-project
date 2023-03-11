import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "../../components/MyButton/MyButton";

const AddNewContact = ({ allContacts, setAllContacts }) => {
  const navigate = useNavigate()
  const [inputValue, setInputValue] = useState({
    name: "",
    phoneNumber: "",
    id: "",
  });

  const [errors,setErrors]= useState({
    nameError:"",
    phoneNumberError:"",
  })

  const handleOnChange =(e)=>{
    setInputValue((prev)=>{
      return {...prev,[e.target.name]: e.target.value}
    })
  }

  const handleSavePhone = (e)=>{
    e.preventDefault();
    if(inputValue.name.length <=0){
      setErrors((prev)=>{
        return {...prev, nameError:"Min length 1 letters"};
      });
      return;
    }else{
      if(errors.nameError.length > 0){
        setErrors((prev)=>{
          return{...prev, nameError:""};
        })
      }
    }

    if(inputValue.phoneNumber.length <=0){
      setErrors((prev)=>{
        return{...prev, phoneNumberError:"Min length 1 letters"};
      });
      return;
    }else{
      if(errors.phoneNumberError.length > 0){
        setErrors((prev)=>{
          return{...prev,phoneNumberError:""}
        })
      }
    }
    setAllContacts((prev)=>{
      console.log('ok')
      return [
        ...prev,{
          name:inputValue.name,
          phoneNumber:inputValue.phoneNumber,
          id:`${Math.random()}`.split('.')[1],
          favorite: false,
        }
      ]
    })
    navigate('/');
  }
  
  return (
    <div className="flex flex-col items-center justify-center border w-full px-3 py-3 mt-5">
      <h3>ADD NEW CONTACT</h3>
      <form className="flex flex-col gap-2 " onSubmit={handleSavePhone}>
        <div className="p-2">
          <label className="pr-2" htmlFor="InputNameNewContact">Name:</label>
          <input className="border" type="text" id="InputNameNewContact" name="name" value={inputValue.name} onChange={handleOnChange} />
        </div>
        <div className="flex items-center justify-center text-red-600 text-sm">{errors.nameError}</div>
        <div className=" p-2">
          <label className="pr-2" htmlFor="InputPhomeNumberNewContact">Number:</label>
          <input className="border" type="text" id="InputPhomeNumberNewContact" name="phoneNumber" value={inputValue.phoneNumber} onChange={handleOnChange} />
        </div>
        <div  className="flex items-center justify-center  text-red-600 text-sm">{errors.phoneNumberError}</div>
        <button className=" text-xl mb-2 transition hover:scale-110">Save</button>
      </form>
    </div>
  );
};

export default AddNewContact;
