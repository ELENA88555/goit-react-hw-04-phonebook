import React, { useEffect, useState  } from 'react';
import { nanoid } from 'nanoid';
import { ContactList } from './ContactList/ContactList';
import { AddContactForm } from './AddContactForm/AddContactForm';
import { Filter } from './Filter/Filter';
import css from './App.module.css';

export const App = ()=> {

  const [ contacts, setContacts] = useState([])
  const [filter, setFilter] = useState('')





  useEffect(()=>{
    const contactsSave = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contactsSave);
    parsedContacts && setContacts(parsedContacts) 
    }, []);

  useEffect(()=> {
    localStorage.setItem('contacts', JSON.stringify(contacts))
    },[contacts])


 const loginInputId = nanoid();

 const addNewContact = ({id, name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    contacts.find(contact => contact.name === name)
      ? alert(`${name} is alredy in contact`)
      : setContacts(
        prevContacts => [contact, ...prevContacts])
  };

 const filtrChangeHandler = ({target:{value}}) => {
  setFilter(value);
  };

 const getVisibleContacts = () => {
     return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase().trim())
    );
  };

 const btnDeleteHandler = contactId => {
  setContacts(prevState => 
     prevState.filter(contact => contact.id !== contactId),
    );
    setFilter('')
  };



    return (
      <div>
        <div className={css.thumble}>
          <h1 className={css.title}>Phonebook</h1>

          <AddContactForm onSubmit={addNewContact}></AddContactForm>
          <h2 className={css.titleText}> Contacts</h2>

          {contacts.length < 1 ? (
            <p className={css.textApp}> You have no contacts saved</p>
          ) : (
            <>
              <Filter
                value={filter}
                changeFilter={filtrChangeHandler}
              ></Filter>
              <ContactList
                title="Contacts"
                contacts={getVisibleContacts()}
                id={loginInputId}
                onDeleteBtn={btnDeleteHandler}
              ></ContactList>
            </>
          )}
        </div>
      </div>
    );
  
}
