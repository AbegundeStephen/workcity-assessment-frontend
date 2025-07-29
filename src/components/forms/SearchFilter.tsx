// src/components/forms/SearchFilter.tsx
import React from "react";
import { Search, Filter, X } from "lucide-react";

interface SearchFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filters?: Record<string, any>;
  onFilterChange?: (filters: Record<string, any>) => void;
  placeholder?: string;
  showFilters?: boolean;
  filterOptions?: Array<{
    key: string;
    label: string;
    options: Array<{ value: string; label: string }>;
  }>;
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  searchQuery,
  onSearchChange,
  filters = {},
  onFilterChange,
  placeholder = "Search...",
  showFilters = true,
  filterOptions = [],
}) => {
  const [showFilterDropdown, setShowFilterDropdown] = React.useState(false);

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters };
    if (value === "") {
      delete newFilters[key];
    } else {
      newFilters[key] = value;
    }
    onFilterChange?.(newFilters);
  };

  const clearFilters = () => {
    onFilterChange?.({});
    setShowFilterDropdown(false);
  };

  const activeFilterCount = Object.keys(filters).length;

  return (
    <div className="relative">
      <div className="flex items-center space-x-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder={placeholder}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          />
        </div>

        {/* Filter Button */}
        {showFilters && filterOptions.length > 0 && (
          <div className="relative">
            <button
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              className={`inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${
                activeFilterCount > 0
                  ? "bg-primary-50 text-primary-700 border-primary-300"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}>
              <Filter className="h-4 w-4 mr-2" />
              Filters
              {activeFilterCount > 0 && (
                <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Filter Dropdown */}
            {showFilterDropdown && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-gray-900">
                      Filters
                    </h3>
                    {activeFilterCount > 0 && (
                      <button
                        onClick={clearFilters}
                        className="text-sm text-primary-600 hover:text-primary-500">
                        Clear all
                      </button>
                    )}
                  </div>

                  <div className="space-y-4">
                    {filterOptions.map((filterOption) => (
                      <div key={filterOption.key}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {filterOption.label}
                        </label>
                        <select
                          value={filters[filterOption.key] || ""}
                          onChange={(e) =>
                            handleFilterChange(filterOption.key, e.target.value)
                          }
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm">
                          <option value="">All</option>
                          {filterOption.options.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Active Filters Display */}
      {activeFilterCount > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {Object.entries(filters).map(([key, value]) => {
            const filterOption = filterOptions.find((f) => f.key === key);
            const option = filterOption?.options.find((o) => o.value === value);

            return (
              <span
                key={key}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                {filterOption?.label}: {option?.label || value}
                <button
                  onClick={() => handleFilterChange(key, "")}
                  className="ml-2 hover:bg-primary-200 rounded-full p-0.5">
                  <X className="h-3 w-3" />
                </button>
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchFilter;
