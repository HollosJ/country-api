const CardSkeleton = () => {
  return (
    <div className="bg-white shadow rounded-md p-4">
      <div className="bg-gray-100 grid gap-4 p-4">
        <div className="object-contain bg-gray-200 aspect-video rounded animate-pulse"></div>

        <div className="bg-gray-200 h-6 w-full rounded animate-pulse"></div>
      </div>
    </div>
  );
};

export default CardSkeleton;
