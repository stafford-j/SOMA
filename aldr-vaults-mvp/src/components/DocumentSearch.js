/**
 * DocumentSearch Component
 * 
 * Reusable search component for filtering documents across all vaults
 */

import React, { useState } from 'react';

const DocumentSearch = ({ documents, onFilteredResults, placeholder = "Search documents..." }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchFilter, setSearchFilter] = useState('all');

  const handleSearch = (term) => {
    setSearchTerm(term);
    filterDocuments(term, searchFilter);
  };

  const handleFilterChange = (filter) => {
    setSearchFilter(filter);
    filterDocuments(searchTerm, filter);
  };

  const filterDocuments = (term, filter) => {
    let filtered = documents;

    // Apply text search
    if (term.trim()) {
      const searchLower = term.toLowerCase();
      filtered = filtered.filter(doc => 
        doc.title.toLowerCase().includes(searchLower) ||
        doc.description?.toLowerCase().includes(searchLower) ||
        doc.metadata?.category?.toLowerCase().includes(searchLower) ||
        doc.file_name?.toLowerCase().includes(searchLower)
      );
    }

    // Apply category filter
    if (filter !== 'all') {
      filtered = filtered.filter(doc => doc.metadata?.category === filter);
    }

    onFilteredResults(filtered);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSearchFilter('all');
    onFilteredResults(documents);
  };

  // Get unique categories from documents
  const categories = [...new Set(documents.map(doc => doc.metadata?.category).filter(Boolean))];

  return (
    <div className="document-search-container bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="search-header flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          <i className="fas fa-search mr-2 text-teal-600"></i>
          Search Documents
        </h3>
        {(searchTerm || searchFilter !== 'all') && (
          <button
            onClick={clearSearch}
            className="text-sm text-gray-500 hover:text-gray-700 flex items-center"
          >
            <i className="fas fa-times mr-1"></i>
            Clear
          </button>
        )}
      </div>

      <div className="search-controls space-y-3">
        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder={placeholder}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
          <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
        </div>

        {/* Category Filter */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleFilterChange('all')}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                searchFilter === 'all'
                  ? 'bg-teal-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Categories
            </button>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => handleFilterChange(category)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors capitalize ${
                  searchFilter === category
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.replace('_', ' ')}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Search Results Summary */}
      {(searchTerm || searchFilter !== 'all') && (
        <div className="mt-3 text-sm text-gray-600">
          {searchTerm && (
            <span>Searching for "{searchTerm}"</span>
          )}
          {searchTerm && searchFilter !== 'all' && <span> in </span>}
          {searchFilter !== 'all' && (
            <span className="capitalize">{searchFilter.replace('_', ' ')} category</span>
          )}
        </div>
      )}
    </div>
  );
};

export default DocumentSearch;