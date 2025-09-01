import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  focusColor?: string;
}

export const SearchInput = ({
  value,
  onChange,
  placeholder,
  focusColor = "focus:border-green-400 focus:ring-green-100",
}: SearchInputProps) => {
  return (
    <div className="relative flex-1">
      <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl ${focusColor} focus:ring-4 transition-all duration-200`}
      />
    </div>
  );
};
