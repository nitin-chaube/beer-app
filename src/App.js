// src/components/App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import BeerCard from "./BeerCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { useAuth } from "./AuthContext";
import './App.css'

const App = () => {
  const [beers, setBeers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const { user, login, logout } = useAuth();

  const filteredBeers = beers.filter((beer) =>
    beer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const fetchData = async (pageNum) => {
    try {
      const response = await axios.get(
        `https://api.punkapi.com/v2/beers?page=${pageNum}&per_page=10`
      );
      setBeers([...beers, ...response.data]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  return (
    <div className="App">
      <header>
        <h1>Beer List</h1>
        {user ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <button onClick={login}>Login</button>
        )}
      </header>
      <input type="text" placeholder="Search beers..." onChange={handleSearch} />
      <InfiniteScroll
        dataLength={filteredBeers.length}
        next={() => setPage(page + 1)}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        <div className="beer-list">
          {filteredBeers.map((beer) => (
            <BeerCard key={beer.id} beer={beer} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default App;
