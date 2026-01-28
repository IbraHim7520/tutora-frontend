import React from 'react';

const Hero_SearchBar = () => {
    return (
        <form className="flex items-center border gap-2 bg-white border-gray-500/30 h-12 max-w-md w-full rounded-full overflow-hidden">
            <input type="email" placeholder="Enter your email" className="w-full h-full pl-6 outline-none text-sm placeholder-gray-500" required />
            <button type="submit" className="bg-amber-500 active:scale-95 font-bold  transition w-56 h-10 rounded-full text-sm text-white mr-1 flex items-center justify-center gap-1">
                <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12.6963 8.88475C12.6963 8.96959 12.68 9.04984 12.6566 9.12632L8.93489 5.12331L12.6963 2.19775V8.88475ZM1.64439 9.69807L5.41585 5.67917L6.8452 6.75954L8.2127 5.67248L12.046 9.69807C11.9863 9.71186 1.70415 9.71186 1.64439 9.69807ZM0.994078 8.88475V2.19775L4.75552 5.12331L1.03378 9.12632C1.01038 9.04984 0.994078 8.96959 0.994078 8.88475ZM12.2784 1.36188L6.8452 5.54125L1.41202 1.36188H12.2784ZM11.8605 0.526001H1.82995C0.906729 0.526001 0.158203 1.27453 0.158203 2.19775V8.88475C0.158203 9.80798 0.906729 10.5565 1.82995 10.5565H11.8605C12.7837 10.5565 13.5322 9.80798 13.5322 8.88475V2.19775C13.5322 1.27453 12.7837 0.526001 11.8605 0.526001Z" fill="white"/>
                </svg>
                Subscribe
            </button>
        </form>
    );
};

export default Hero_SearchBar;