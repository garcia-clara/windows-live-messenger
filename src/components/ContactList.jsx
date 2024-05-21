import React, { useState, useEffect } from 'react';
import online from "../assets/status/online-dot.png";
import busy from "../assets/status/busy-dot.png";
import away from "../assets/status/away-dot.png";
import offline from "../assets/status/offline-dot.png";
import emoticons from '../imports/emoticons';

const ContactCategory = ({ title, contacts, count }) => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="mt-2">
            <div className="flex items-center cursor-pointer gap-1 ml-1 hovercontact" onClick={toggleAccordion}>
                <h2>{isOpen ? '-' : '+'}</h2>
                <h2 className='text-[16px] text-[#1D2F7F]'>{title}</h2>
                <h2 className='opacity-40'>({count})</h2>
            </div>
            {isOpen && (
                <ContactList contacts={contacts} />
            )}
        </div>
    );
};

const Contacts = ({ contact }) => {

    // Change le statut
    const whichStatus = (contactStatus) => {
        switch (contactStatus) {
            case 'online':
                return online;
            case 'busy':
                return busy;
            case 'away':
                return away;
            case 'offline':
                return offline;
            default:
                return offline; // or some default status
        }
    };

    // Replace emoticons
    const replaceEmoticons = (message) => {
        return message.split(/(\[.*?\])/).map((part, index) => {
            const match = part.match(/\[(.*?)\]/);
            if (match && emoticons[match[1]]) {
                return <img key={index} src={emoticons[match[1]]} alt={match[1]} />;
            } else {
                return part;
            }
        });
    };


    return (
        <div className="flex gap-1 px-6 items-center hovercontact">
            <div className='w-2 mt-1'><img src={whichStatus(contact.status)} alt="contact-status" /></div>
            <p className='flex gap-1'>{replaceEmoticons(contact.name)}</p>
            <p>-</p>
            <p className='flex gap-1 text-gray-400'>{replaceEmoticons(contact.message)}</p>
        </div>
    );
};

const ContactList = ({ contacts }) => {
    return (
        <div className="accordion">
            {contacts.map((contact, index) => (
                <Contacts key={index} contact={contact} />
            ))}
        </div>
    );
};

export default ContactCategory;