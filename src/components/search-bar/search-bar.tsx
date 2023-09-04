'use client';

import { useEffect, useState } from 'react';

import * as Omdb from '@/libs/omdb-api';
import { OMDBSearchResults } from '@/libs/types';
import { useDebounce } from '../utils/use-debounce';

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

  useDebounce<string>(input, setSearchTerm);

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
    <div className="absolute top-0 flex w-full flex-col justify-center p-4">
      <input
        type="text"
        className="mb-1 w-6 rounded-full bg-black/50 bg-[url('/search.svg')] bg-[size:24px] bg-[position:8px_center] bg-no-repeat p-2 pl-8 text-gray-300 outline-none transition-all duration-300 hover:w-full focus:w-full focus:bg-black/90 focus:pl-10 md:hover:w-80 md:focus:w-80"
        onChange={handleChange}
        value={input}
      />
      {searchResults && (
        <ul className="relative z-10 flex flex-col justify-start rounded bg-black/90 text-gray-300">
          {searchResults.map((result) => (
            <li key={result.imdbID} className="p-2">
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
