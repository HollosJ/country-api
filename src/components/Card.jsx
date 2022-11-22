const Card = ({ country }) => {
  return (
    <div
      className="bg-white transition hover:opacity-75 focus:opacity-75 h-full cursor-pointer shadow rounded-md p-4"
      key={country.cca3}
    >
      <div className="bg-gray-100 grid gap-4 p-4 content-start h-full">
        <img
          className="object-contain bg-gray-100 aspect-video"
          src={country.flags.svg}
          alt=""
        />

        <h4 className="font-bold text-lg text-center">{country.name.common}</h4>
      </div>
    </div>
  );
};

export default Card;
