const CityInput = ({ label, value, onChange, placeholder }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-2 md:gap-4 w-full">
      <label htmlFor="city" className="font-medium w-full sm:w-[80px] md:w-[100px] text-center sm:text-left">
        {label}
      </label>
      <input
        id="city"
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="input input-bordered w-full max-w-md md:max-w-lg"
      />
    </div>
  );
};

export default CityInput;
