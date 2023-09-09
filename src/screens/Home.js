import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BeerCard from '../components/BeerCard';
import LoadingSpinner from '../components/LoadingSpinner';

const Home = () => {
  const [beers, setBeers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const fetchData = async (pageNum) => {
    if (loading) return;
    setLoading(true);
  
    try {
      const response = await axios.get(
        `https://api.punkapi.com/v2/beers?page=${pageNum}`
      );
      setBeers([...beers, ...response.data]);
      setPage(pageNum + 1);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
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
        <input
          type="text"
          placeholder="Search beers..."
          onChange={handleSearch}
        />
      </header>
      <div className="beer-list">
        {beers.map((beer) => (
          <BeerCard key={beer.id} beer={beer} />
        ))}
      </div>
      {loading && <LoadingSpinner />}
    </div>
  );
};

export default Home;
