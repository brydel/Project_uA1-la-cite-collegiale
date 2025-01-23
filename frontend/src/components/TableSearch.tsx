import axios from "axios";
import { useState } from "react";
import { MdSearch } from "react-icons/md";


const TableSearch = () => {

  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      setResults([]);
      return;
    }
  }

  try {
    const { data } = await axios.get(`/api/products/search?term=${searchTerm}`);
    setResults(data);
  }

  return (
    <div className="w-full md:w-auto flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">
      <MdSearch size={20}/>
      <input
        type="text"
        placeholder="Search..."
        className="w-[200px] p-2 bg-transparent outline-none"
      />
    </div>
  );
};

export default TableSearch;