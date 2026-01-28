import React from 'react';

const Hero_SearchBar = () => {
    return (
        <div className="flex items-center border gap-2 bg-white border-gray-500/30 h-12 max-w-md w-full rounded-full overflow-hidden">
            <input type="text" placeholder="search by teacher name or course name" className="w-full h-full pl-6 outline-none text-sm placeholder-gray-500" required />
            <button type="submit" className="bg-amber-500 active:scale-95 font-bold  transition w-56 h-10 rounded-full text-sm text-white mr-1 flex items-center justify-center gap-1">
                Search
            </button>
        </div>
    );
};

export default Hero_SearchBar;