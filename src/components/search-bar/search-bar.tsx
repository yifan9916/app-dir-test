'use client';

import { useEffect, useState } from 'react';

import * as Omdb from '@/libs/omdb-api';
import { OMDBSearchResults } from '@/libs/types';
import { Search } from '../icons';

// simple search bar for demoing purposes
export const SearchBar = ({
  onResultClick,
}: {
  onResultClick: (result: OMDBSearchResults['Search'][number]) => void;
}) => {
  const [input, setInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] =
    useState<OMDBSearchResults['Search']>();

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (!input) return;

      setSearchTerm(input);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [input]);

  useEffect(() => {
    if (!searchTerm) return;

    Omdb.fetchSearchTerm(searchTerm).then((results) => {
      setSearchResults(results);
    });
  }, [searchTerm]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSearchResultClick = (
    result: OMDBSearchResults['Search'][number]
  ) => {
    setInput('');
    setSearchResults([]);
    onResultClick(result);
  };

  return (
    <div className="absolute flex flex-col justify-center p-4 lg:block top-0">
      <div className="relative mb-1">
        <input
          type="text"
          className="p-2 w-6 rounded-full overflow-hidden bg-black/50 text-gray-300 hover:w-auto focus:w-full md:focus:w-auto focus:bg-black/90 pl-8 focus:pl-10 outline-none transition-all duration-300"
          onChange={handleChange}
          value={input}
        />
        <Search
          className="absolute text-white top-1 left-1 pointer-events-none"
          width="2rem"
          height="2rem"
        />
      </div>
      {searchResults && (
        <ul className="bg-black/90 text-gray-300 flex flex-col justify-start rounded relative z-10">
          {searchResults.map((result) => (
            <li key={result.imdbID} className="p-3">
              <button
                onClick={() => handleSearchResultClick(result)}
                className="text-start flex flex-col justify-between"
              >
                <span>{result.Title}</span>
                <span className="text-xs">{result.Year}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
