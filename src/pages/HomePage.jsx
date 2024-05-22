import React, { useState, useEffect } from 'react';
import Background from "../components/Background";
import AvatarSmall from "../components/AvatarSmall";
import SearchBar from "../components/SearchBar";
import ContactCategory from "../components/ContactList";
import arrow from "../assets/general/arrow.png";
import ad from "../assets/ad.png"
import mail from "../assets/general/mail.png";
import addcontact from "../assets/contacts/add.ico";
import showmenu from "../assets/contacts/1489.png";
import contactlistlayout from "../assets/chat/410.png";
import contactsData from '../data/contacts.json';
import divider from "../assets/general/divider.png";
import WhatsNew from '../components/WhatsNew';

const HomePage = () => {

    const [contacts, setContacts] = useState([]);

    useEffect(() => {
      setContacts(contactsData); // Utilisation directe des données importées
  }, []);

      // Filtrage des contacts par statut
      const favoritesContacts = contacts.filter(contact => contact.isFavorite === 1);
      const groupsContacts = contacts.filter(contact => contact.status === 'group');
      const availableContacts = contacts.filter(contact => contact.status !== 'offline');
      const offlineContacts = contacts.filter(contact => contact.status === 'offline');

  return (
    <Background>
        <div className="flex flex-col w-full font-sans text-base h-screen">
        {/* Personnal informations row */}
          <div className="flex justify-between px-4 pt-4">
            <div className="flex">
            <AvatarSmall/>
            <div>
              <div className="flex items-center">
                <div className="flex aerobutton cursor-pointer items-center pl-1 white-light">
                  <p className="text-lg">Username</p>
                  <p className="ml-1">(Status)</p>
                  <div className="mx-1">
                    <img src={arrow} alt="" />
                  </div>
                </div>
              </div>

              <div className="flex aerobutton pl-1 items-center white-light">
                <p>Share a quick message</p>
                <div className="ml-1">
                  <img src={arrow} alt="" />
                </div>
              </div>
            </div>
            </div>
        {/* Hotmail icon */}
            <div className="w-9 flex items-end">
              <div><img src={mail} alt=""/></div>
            </div>
          </div>
        

        {/* Contacts row */}
        <div className="h-full">
        <img src={divider} alt="" className='mb-[-5px] pointer-events-none' />

        {/* Searchbar and icons */}
          <div className="flex items-center mt-2 px-4">
            <SearchBar initialValue="Search contacts or the web..."/>
            <div className="flex gap-1 items-center aerobutton p-1 ml-1">
              <div><img src={addcontact} alt="" /></div>
              <div><img src={arrow} alt="" /></div>
            </div>
            <div className="flex gap-1 items-center aerobutton p-1">
              <div><img src={contactlistlayout} alt="" /></div>
            </div>
            <div className="flex gap-1 items-center aerobutton p-1">
              <div><img src={showmenu} alt="" /></div>
              <div><img src={arrow} alt="" /></div>
            </div>
          </div>

        {/* Contacts */}
        <ContactCategory title="Favorites" contacts={favoritesContacts} count={favoritesContacts.length}/>
        <ContactCategory title="Groups" contacts={groupsContacts} count={groupsContacts.length}/>
        <ContactCategory title="Available" contacts={availableContacts} count={availableContacts.length}/>
        <ContactCategory title="Offline" contacts={offlineContacts} count={offlineContacts.length}/>
        </div>

        {/* What's New row */}
        <WhatsNew />

        {/* Footer row */}
        <div className='w-full bg-white h-[1px] shadow-sm shadow-[#6b8fa3]'></div>
        <footer className="w-full flex justify-center pb-4">
          <div className="mt-4"><img src={ad} alt="" /></div>
        </footer>
        </div>
    </Background>
  );
};

export default HomePage;
