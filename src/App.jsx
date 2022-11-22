import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import CountryDetail from './CountryDetail';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />

        <Route
          exact
          path={`/country/:id`}
          element={<CountryDetail />}
          key={window.location.pathname}
        />
      </Routes>

      <Footer />
    </>
  );
}
export default App;
