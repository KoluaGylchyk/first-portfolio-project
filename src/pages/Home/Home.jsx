import React from 'react'
import ContactList from '../../components/ContactList'

const Home = ({allContacts,setAllContacts}) => {
  return (
	 <div className='w-full'>
    <h6 className='text-center  text-4xl pt-5'> CONTACT</h6>
    <ContactList allContacts={allContacts} setAllContacts={setAllContacts}/>

   </div>
  )
}

export default Home