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
    result: OMDBSearchResults['Search'][number],
  ) => {
    setInput('');
    setSearchResults([]);
    onResultClick(result);
  };

  return (
    <div className="absolute top-0 flex flex-col justify-center p-4 lg:block">
      <div className="relative mb-1">
        <input
          type="text"
          className="w-6 overflow-hidden rounded-full bg-black/50 p-2 pl-8 text-gray-300 outline-none transition-all duration-300 hover:w-auto focus:w-full focus:bg-black/90 focus:pl-10 md:focus:w-auto"
          onChange={handleChange}
          value={input}
        />
        <Search
          className="pointer-events-none absolute left-1 top-1 text-white"
          width="2rem"
          height="2rem"
        />
      </div>
      {searchResults && (
        <ul className="relative z-10 flex flex-col justify-start rounded bg-black/90 text-gray-300">
          {searchResults.map((result) => (
            <li key={result.imdbID} className="p-3">
              <button
                onClick={() => handleSearchResultClick(result)}
                className="flex flex-col justify-between text-start"
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
