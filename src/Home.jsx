import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import SearchBar from './components/SearchBar';
import SearchBarSkeleton from './components/SearchBarSkeleton';
import Loading from './components/Loading';
import Card from './components/Card';
import ScrollBtn from './components/ScrollBtn';

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');

  useEffect(() => {
    async function fetchCountries() {
      const req = await fetch('https://restcountries.com/v3.1/all').then(
        (res) => res.json()
      );

      // Once fetched, set state to sorted countries (by name)
      setCountries(
        req.sort((a, b) =>
          a.name.common > b.name.common
            ? 1
            : b.name.common > a.name.common
            ? -1
            : 0
        )
      );
      setLoading(false);

      console.log(req);
      return req;
    }

    fetchCountries();
  }, []);

  let filteredCountries = countries.filter((country) => {
    let q = query.toLowerCase();

    if (country.name.common.toLowerCase().includes(q)) {
      return country;
    }
  });

  return (
    <div className="container relative p-4 grid gap-4 mx-auto">
      {/* Anchor */}
      <div className="top-0 left-0 w-4 h-4 bg-black" id="top-anchor"></div>

      <div className="container grid gap-4 mx-auto">
        <div className="lg:max-w-lg">
          {!loading ? <SearchBar setQuery={setQuery} /> : <SearchBarSkeleton />}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {!loading ? (
            // Check if there are countries that match the query
            filteredCountries.length ? (
              filteredCountries.map((country, key) => {
                return (
                  <Link key={key} to={`/country/${country.cca3}`}>
                    <Card country={country} />
                  </Link>
                );
              })
            ) : (
              // If no results found, display message
              <span className="font-bold text-center w-full col-span-3">
                Sorry, no results found!
              </span>
            )
          ) : (
            <Loading />
          )}
        </div>
      </div>

      <ScrollBtn />
    </div>
  );
};

export default Home;
