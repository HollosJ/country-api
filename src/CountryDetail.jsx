import { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';

// Icon imports
import { AiOutlineRollback, AiFillInfoCircle } from 'react-icons/ai';
import { IoIosPeople } from 'react-icons/io';
import { FaLanguage, FaCity } from 'react-icons/fa';
import { BsCurrencyExchange } from 'react-icons/bs';

const CountryDetail = () => {
  const [country, setCountry] = useState({});
  const [loading, setLoading] = useState(true);

  // Get params passed via the route
  const params = useParams();

  // Get route location data
  const location = useLocation();

  useEffect(() => {
    async function fetchCountry() {
      const req = await fetch(
        `https://restcountries.com/v3.1/alpha/${params.id}`
      ).then((res) => res.json());

      // Once fetched, set state to sorted countries (by name)
      setCountry(req[0]);
      setLoading(false);
    }

    fetchCountry();
  }, [location]);

  return (
    <div className="container grid gap-4 p-4 mx-auto">
      <Link className="flex items-center gap-4 hover:opacity-75" to="/">
        <AiOutlineRollback className="text-4xl" /> Home
      </Link>

      <div className="grid gap-4 md:gap-8 md:grid-cols-4">
        {/* Flag */}
        <>
          {!loading ? (
            <img
              className="rounded"
              src={country.flags.svg}
              alt={`${country.name.common} flag`}
            />
          ) : (
            <div className="w-full bg-gray-200 rounded aspect-video animate-pulse"></div>
          )}
        </>

        {/* Right side of grid, where text data is shown */}
        <div className="grid content-start gap-4 md:col-start-2 md:col-end-5">
          {!loading ? (
            <>
              {/* Name, region and coords */}
              <>
                <h1 className="text-2xl font-bold">
                  {country.name.common}, {country.region}{' '}
                  <span className="text-sm">
                    [{country.latlng[0]}, {country.latlng[1]}]
                  </span>
                </h1>
              </>

              {/* Capital */}
              {country.capital && (
                <div className="flex gap-2">
                  <FaCity className="text-lg" />
                  {country.capital}
                </div>
              )}

              {/* Population */}
              <div className="flex gap-2">
                <IoIosPeople />

                <p className="flex-1">
                  {country.population.toLocaleString('en-US')}
                </p>
              </div>

              {/* Languages */}
              {country.languages && (
                <div className="flex gap-2">
                  <FaLanguage className="text-lg" />

                  <p className="flex-1">
                    {Object.values(country.languages).join(', ')}
                  </p>
                </div>
              )}

              {/* Currencies */}
              {country.currencies && (
                <div className="flex gap-2">
                  <BsCurrencyExchange className="text-lg" />

                  {/* Loop through all currencies, join with a comma if not the last element in array */}
                  <p className="flex-1">
                    {Object.values(country.currencies).map((currency, key) => {
                      return `${currency.name} ${
                        currency.symbol ? `(${currency.symbol})` : ''
                      }${
                        key < Object.values(country.currencies).length - 1
                          ? ', '
                          : ''
                      }`;
                    })}
                  </p>
                </div>
              )}

              {/* Border info */}
              {country.borders && (
                <div className="flex gap-2">
                  <AiFillInfoCircle />

                  <p>
                    <span>{country.name.common} </span>

                    <span>{`${
                      country.landlocked ? 'is landlocked, it ' : ''
                    }`}</span>

                    <span>is surrounded by: </span>

                    {country.borders.map((border, key) => (
                      <Link key={key} to={`/country/${border}`} relative="path">
                        <span className="underline font-bold text-blue-600 hover:no-underline hover:opacity-75">
                          {border}
                        </span>

                        {key < country.borders.length - 1 ? `, ` : `.`}
                      </Link>
                    ))}
                  </p>
                </div>
              )}
            </>
          ) : (
            // Skeleton
            <>
              <div className="h-8 bg-gray-200 rounded animate-pulse"></div>

              <div className="h-6 bg-gray-200 rounded animate-pulse"></div>

              <div className="h-6 bg-gray-200 rounded animate-pulse"></div>

              <div className="h-6 bg-gray-200 rounded animate-pulse"></div>

              <div className="h-6 bg-gray-200 rounded animate-pulse"></div>

              <div className="h-6 bg-gray-200 rounded animate-pulse"></div>

              <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CountryDetail;
