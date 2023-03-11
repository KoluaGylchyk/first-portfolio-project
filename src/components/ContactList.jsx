import React from "react";
import { useState, useMemo } from "react";
import ContactItem from "./ContactItem";

const ContactList = ({ allContacts, setAllContacts }) => {
  const [searchValues, setSearchValues] = useState({
    searchInputValue: "",
  });

  const [selectValue, setSelectValue] = useState("");

  const filterdContacts = useMemo(() => {
    if (searchValues.searchInputValue.trim().length > 0) {
      const newFilterdContacts = [...allContacts].filter(
        (item) =>
          item.name
            .toLowerCase()
            .includes(searchValues.searchInputValue.trim().toLowerCase()) ||
          item.phoneNumber
            .toLowerCase()
            .includes(searchValues.searchInputValue.trim().toLowerCase())
      );
      return newFilterdContacts;
    } else {
      return allContacts;
    }
  }, [searchValues.searchInputValue, allContacts]);

  const sortedAndFilterContacts = useMemo(() => {
    if (selectValue.length > 0) {
      return [...filterdContacts].sort((a, b) =>
        selectValue == "A-YA" ? a.name.localeCompare(b.name) : -a.name.localeCompare(b.name)
      );
    }
    return filterdContacts;
  }, [selectValue, filterdContacts]);

  const finishSortedByFavoriteContacts = useMemo(()=>{
    return [...sortedAndFilterContacts].sort(x => x.favorite ? -1 : 1)
  },[sortedAndFilterContacts])
  

  const handleOnChangeSearchInput = (e) => {
    setSearchValues((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleToggleFavorite = (contactId) => {
    setAllContacts((prev) => {
      return [...prev].map((item) => {
        if (item.id == contactId) {
          item.favorite = !item.favorite;
        }
        return item;
      });
    });
  };

  const handleOnChangeSelectSort = (e) => {
    setSelectValue(e.target.value);
  };

  return (
    <div className=" w-full text-xl">
      <div className="flex items-center justify-end">
        <form className="border gap-3 px-3 mr-3 text-sm">
          <label>
            Search:
            <input
            className="m-2 border p-1"
            placeholder="type..."
              type="text"
              name="searchInputValue"
              onChange={handleOnChangeSearchInput}
              value={searchValues.searchInputValue}
            />
          </label>
          <label>
            Sort by:
            <select value={selectValue} onChange={handleOnChangeSelectSort}>
              <option disabled value="">
                --Select sort by--
              </option>
              <option value="A-YA">A-YA</option>
              <option value="YA-A">YA-A</option>
            </select>
          </label>
        </form>
      </div>
      <div className="flex flex-col gap-5 items-center justify-center py-4">
      {finishSortedByFavoriteContacts.length > 0
        ? finishSortedByFavoriteContacts.map((item) => (
            <ContactItem
              item={item}
              key={item.id}
              allContacts={allContacts}
              handleToggleFavorite={handleToggleFavorite}
            />
          ))
        : "EMPTY"}

      </div>
      
    </div>
  );
};

export default ContactList;
