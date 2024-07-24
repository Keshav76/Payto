interface SelectProps {
  changeHandler: (value: string) => void;
  options: {
    key: string;
    value: string;
  }[];
}
function Select({ changeHandler, options }: SelectProps) {
  return (
    <select
      className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      onChange={(e) => changeHandler(e.target.value)}
    >
      {options.map((option) => (
        <option key={option.key} value={option.key}>
          {option.value}
        </option>
      ))}
    </select>
  );
}
export default Select;
