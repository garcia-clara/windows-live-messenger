import emoticons from '../imports/emoticons';

export const replaceEmoticons = (message) => {
    return message.split(/(\(.*?\))/).map((part, index) => {
        const match = part.match(/\((.*?)\)/);
        if (match && emoticons[match[1]]) {
            return (
                <span className='flex items-center' key={index}>
                    <img src={emoticons[match[1]]} alt={match[1]} className='w-[14px] h-[14px]' />
                </span>
            );
        } else {
            return part;
        }
    });
};
