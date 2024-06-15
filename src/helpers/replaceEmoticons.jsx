import React from 'react';
import emoticons from '../imports/emoticons';

// Create a regex to match any defined emoticon
const emoticonRegex = new RegExp(
    Object.keys(emoticons)
        .map(emoticon => {
            const escapedEmoticon = emoticon.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            return `(${escapedEmoticon})`;
        })
        .join('|'),
    'gi' // Case-insensitive matching
);

// Function to replace emoticons with <img> tags
export const replaceEmoticons = (message) => {
    return message.replace(emoticonRegex, (match) => {
        const emoticonSrc = emoticons[match]; // Convert match to lowercase
        if (emoticonSrc) {
            return `<span><img src="${emoticonSrc}" alt="${match}"/></span>`; // Return HTML string for the emoticon
        } else {
            return match; // Return the original match if no emoticon found
        }
    });
};

export default replaceEmoticons;
