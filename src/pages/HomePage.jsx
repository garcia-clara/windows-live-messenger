import React, { useState, useEffect } from "react";
import Background from "../components/Background";
import SearchBar from "../components/SearchBar";
import ContactCategory from "../components/ContactList";
import arrow from "/assets/general/arrow.png";
import ad from "/assets/ad.png";
import mail from "/assets/general/mail.png";
import addcontact from "/assets/contacts/add_contact.png";
import showmenu from "/assets/contacts/1489.png";
import contactlistlayout from "/assets/contacts/change_contact_list_layout.png";
import contactsData from "../data/contacts.json";
import divider from "/assets/general/divider.png";
import WhatsNew from "../components/WhatsNew";
import UserInformations from "../components/UserInformations";
import bg from "/assets/background/background.jpg";
import hotmail from "/assets/general/hotmail.png";

const HomePage = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    setContacts(contactsData); // Utilisation directe des données importées
  }, []);

  // Filtrage des contacts par statut
  const favoritesContacts = contacts.filter(
    (contact) => contact.isFavorite === 1
  );
  const groupsContacts = contacts.filter(
    (contact) => contact.status === "group"
  );
  const availableContacts = contacts.filter(
    (contact) => contact.status !== "offline"
  );
  const offlineContacts = contacts.filter(
    (contact) => contact.status === "offline"
  );

  const background = localStorage.getItem("scene");

  return (
    <Background>
      <div
        className={`bg-no-repeat ${
          background === "/assets/scenes/default_background.jpg"
            ? "h-screen"
            : "h-[97px]"
        } bg-[length:100%_100px]`}
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize:
            background !== "/assets/scenes/default_background.jpg"
              ? "cover"
              : "",
          backgroundPosition:
            background !== "/assets/scenes/default_background.jpg"
              ? "center"
              : "",
        }}
      >
        <div className="flex flex-col w-full font-sans text-base h-screen">
          {/* Personnal informations row */}
          <div className="flex justify-between px-4 pt-4">
            <UserInformations />
            {/* Hotmail icon */}
            <div className="w-9 mb-2 flex items-end">
              <div>
                <img src={hotmail} alt="" />
              </div>
            </div>
          </div>

          {/* Contacts row */}
          <div className="h-full">
            <img
              src={divider}
              alt=""
              className="mb-[-5px] pointer-events-none mix-blend-multiply"
            />

            {/* Searchbar and icons */}
            <div className="flex items-center mt-2 px-4">
              <SearchBar initialValue="Search contacts or the web..." />
              <div className="flex gap-1 items-center aerobutton p-1 ml-1 h-6">
                <div className="w-5">
                  <img src={addcontact} alt="" />
                </div>
                <div>
                  <img src={arrow} alt="" />
                </div>
              </div>
              <div className="flex gap-1 items-center aerobutton p-1 h-6">
                <div className="w-5">
                  <img src={contactlistlayout} alt="" />
                </div>
              </div>
              <div className="flex gap-1 items-center aerobutton p-1 h-6">
                <div className="w-5">
                  <img src={showmenu} alt="" />
                </div>
                <div>
                  <img src={arrow} alt="" />
                </div>
              </div>
            </div>

            {/* Contacts */}
            <ContactCategory
              title="Favorites"
              contacts={favoritesContacts}
              count={favoritesContacts.length}
            />
            <ContactCategory
              title="Groups"
              contacts={groupsContacts}
              count={groupsContacts.length}
            />
            <ContactCategory
              title="Available"
              contacts={availableContacts}
              count={availableContacts.length}
            />
            <ContactCategory
              title="Offline"
              contacts={offlineContacts}
              count={offlineContacts.length}
            />
          </div>

          {/* What's New row */}
          <WhatsNew />

          {/* Footer row */}
          <div className="w-full mix-blend-luminosity bg-white h-[1px] shadow-sm shadow-[#6b8fa3]"></div>
          <footer className="w-full flex justify-center pb-4">
            <div className="mt-4">
              <img src={ad} alt="" />
            </div>
          </footer>
        </div>
      </div>
    </Background>
  );
};

export default HomePage;
