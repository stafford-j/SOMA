import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const IdentityVault = () => {
  // Sample identity documents for demonstration
  const [documents, setDocuments] = useState([
    {
      id: 'id1',
      type: 'passport',
      title: 'Passport',
      category: 'government_id',
      issueDate: '2022-06-15',
      expiryDate: '2032-06-14',
      documentNumber: 'AB123456',
      tags: ['travel', 'international'],
      lastUpdated: '2023-01-10T14:30:00',
      thumbnailUrl: null
    },
    {
      id: 'id2',
      type: 'drivers_license',
      title: 'Driver\'s License',
      category: 'government_id',
      issueDate: '2021-03-20',
      expiryDate: '2026-03-19',
      documentNumber: 'DL9876543',
      tags: ['driving', 'identification'],
      lastUpdated: '2022-11-05T10:15:00',
      thumbnailUrl: null
    },
    {
      id: 'id3',
      type: 'birth_certificate',
      title: 'Birth Certificate',
      category: 'government_id',
      issueDate: '1985-08-12',
      expiryDate: null,
      documentNumber: 'BC12345678',
      tags: ['permanent', 'official'],
      lastUpdated: '2023-02-20T09:45:00',
      thumbnailUrl: null
    },
    {
      id: 'id4',
      type: 'professional_certification',
      title: 'Engineering License',
      category: 'professional',
      issueDate: '2019-11-10',
      expiryDate: '2025-11-09',
      documentNumber: 'ENG2019-78901',
      tags: ['career', 'certification'],
      lastUpdated: '2023-03-15T16:20:00',
      thumbnailUrl: null
    },
    {
      id: 'id5',
      type: 'ssn',
      title: 'Social Security Card',
      category: 'government_id',
      issueDate: '2010-05-05',
      expiryDate: null,
      documentNumber: '•••-••-1234', // Masked for privacy
      tags: ['financial', 'tax'],
      lastUpdated: '2023-01-18T11:30:00',
      thumbnailUrl: null
    }
  ]);

  // State for filters
  const [filters, setFilters] = useState({
    category: 'all',
    search: ''
  });

  // Filter documents based on current filters
  const filteredDocuments = documents.filter(doc => {
    // Filter by category
    if (filters.category !== 'all' && doc.category !== filters.category) {
      return false;
    }
    
    // Filter by search term
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      return (
        doc.title.toLowerCase().includes(searchLower) ||
        doc.type.toLowerCase().includes(searchLower) ||
        doc.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }
    
    return true;
  });

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Icon mapping for document types
  const getDocumentIcon = (type) => {
    const iconMap = {
      passport: 'fa-passport',
      drivers_license: 'fa-id-card',
      birth_certificate: 'fa-certificate',
      professional_certification: 'fa-award',
      ssn: 'fa-shield-alt',
      default: 'fa-file-alt'
    };
    
    return iconMap[type] || iconMap.default;
  };

  // Background color mapping for categories
  const getCategoryColor = (category) => {
    const colorMap = {
      government_id: 'bg-blue-100 text-blue-800',
      financial: 'bg-green-100 text-green-800',
      educational: 'bg-amber-100 text-amber-800',
      professional: 'bg-purple-100 text-purple-800',
      memberships: 'bg-pink-100 text-pink-800',
      default: 'bg-gray-100 text-gray-800'
    };
    
    return colorMap[category] || colorMap.default;
  };

  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
      {/* Header Section */}
      <header className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white mr-3">
              <i className="fas fa-id-card"></i>
            </div>
            <h1 className="text-3xl font-bold text-aldr-dark">Identity Vault</h1>
          </div>
          <p className="text-aldr-gray mt-1">
            Store and manage your identification documents and credentials
          </p>
        </div>
        
        <div className="mt-4 md:mt-0 flex space-x-3">
          <Link 
            to="/vault/identity/upload" 
            className="btn-primary"
          >
            <i className="fas fa-plus mr-2"></i> Add Document
          </Link>
          <button className="btn-secondary">
            <i className="fas fa-cog mr-2"></i> Settings
          </button>
        </div>
      </header>
      
      {/* Filters Section */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-grow">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-search text-gray-400"></i>
              </div>
              <input
                type="text"
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                placeholder="Search documents..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-aldr-teal focus:border-aldr-teal sm:text-sm"
              />
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4">
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-aldr-teal focus:border-aldr-teal sm:text-sm rounded-md"
            >
              <option value="all">All Categories</option>
              <option value="government_id">Government ID</option>
              <option value="financial">Financial</option>
              <option value="educational">Educational</option>
              <option value="professional">Professional</option>
              <option value="memberships">Memberships</option>
            </select>
            
            <select
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-aldr-teal focus:border-aldr-teal sm:text-sm rounded-md"
            >
              <option value="last_updated">Last Updated</option>
              <option value="name_asc">Name (A-Z)</option>
              <option value="name_desc">Name (Z-A)</option>
              <option value="issue_date">Issue Date</option>
              <option value="expiry_date">Expiry Date</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredDocuments.length > 0 ? (
          filteredDocuments.map(doc => (
            <div key={doc.id} className="card hover:shadow-lg transition-all duration-300">
              <div className="flex items-start mb-4">
                <div className="w-12 h-12 rounded-lg bg-aldr-gradient flex items-center justify-center text-white mr-4 flex-shrink-0">
                  <i className={`fas ${getDocumentIcon(doc.type)} text-xl`}></i>
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-bold text-aldr-dark">{doc.title}</h3>
                  <div className="flex items-center mt-1">
                    <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(doc.category)}`}>
                      {doc.category.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mb-4 space-y-2">
                {doc.documentNumber && (
                  <div className="flex justify-between text-sm">
                    <span className="text-aldr-gray">Document #:</span>
                    <span className="font-medium">{doc.documentNumber}</span>
                  </div>
                )}
                
                <div className="flex justify-between text-sm">
                  <span className="text-aldr-gray">Issue Date:</span>
                  <span className="font-medium">{formatDate(doc.issueDate)}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-aldr-gray">Expiry Date:</span>
                  <span className="font-medium">{formatDate(doc.expiryDate)}</span>
                </div>
                
                {doc.tags && doc.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {doc.tags.map((tag, index) => (
                      <span key={index} className="text-xs px-2 py-1 bg-aldr-light text-aldr-gray rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="flex justify-between items-center border-t pt-3">
                <Link 
                  to={`/document/${doc.id}`} 
                  className="text-aldr-teal hover:text-aldr-purple font-medium text-sm"
                >
                  View Document
                </Link>
                <div className="flex space-x-1">
                  <button className="p-2 text-aldr-teal hover:text-aldr-purple" title="Share">
                    <i className="fas fa-share-alt"></i>
                  </button>
                  <button className="p-2 text-aldr-teal hover:text-aldr-purple" title="Edit">
                    <i className="fas fa-edit"></i>
                  </button>
                  <button className="p-2 text-aldr-teal hover:text-aldr-purple" title="Download">
                    <i className="fas fa-download"></i>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-aldr-light flex items-center justify-center text-aldr-gray">
              <i className="fas fa-search text-2xl"></i>
            </div>
            <h3 className="text-lg font-medium text-aldr-dark mb-2">No documents found</h3>
            <p className="text-aldr-gray mb-6">Try adjusting your search or filters</p>
            <Link 
              to="/vault/identity/upload" 
              className="btn-primary inline-flex items-center"
            >
              <i className="fas fa-plus mr-2"></i> Add New Document
            </Link>
          </div>
        )}
        
        {/* Add New Document Card */}
        <div className="card border-2 border-dashed border-gray-300 hover:border-aldr-teal flex flex-col items-center justify-center hover:shadow-lg transition-all duration-300 cursor-pointer min-h-[220px]">
          <Link to="/vault/identity/upload" className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-aldr-light flex items-center justify-center mb-4">
              <i className="fas fa-plus text-2xl text-aldr-teal"></i>
            </div>
            <p className="text-aldr-teal font-medium">Add New Document</p>
          </Link>
        </div>
      </div>
      
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="card bg-white">
          <h3 className="text-lg font-semibold text-aldr-dark mb-4">Document Statistics</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Government IDs</span>
                <span className="font-medium">3</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-blue-500 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Professional</span>
                <span className="font-medium">1</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-purple-500 rounded-full" style={{ width: '20%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Financial</span>
                <span className="font-medium">1</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-green-500 rounded-full" style={{ width: '20%' }}></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="card bg-white">
          <h3 className="text-lg font-semibold text-aldr-dark mb-4">Expiring Soon</h3>
          <div className="space-y-3">
            <div className="flex items-center p-2 bg-amber-50 border border-amber-200 rounded-lg">
              <i className="fas fa-exclamation-triangle text-amber-500 mr-3"></i>
              <div>
                <p className="font-medium">Driver's License</p>
                <p className="text-xs text-aldr-gray">Expires in 3 months</p>
              </div>
            </div>
            <div className="flex items-center p-2 bg-red-50 border border-red-200 rounded-lg">
              <i className="fas fa-exclamation-circle text-red-500 mr-3"></i>
              <div>
                <p className="font-medium">Engineering License</p>
                <p className="text-xs text-aldr-gray">Expires in 2 weeks</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="card bg-white">
          <h3 className="text-lg font-semibold text-aldr-dark mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3 flex-shrink-0">
                <i className="fas fa-eye text-sm"></i>
              </div>
              <div>
                <p className="font-medium">Viewed Passport</p>
                <p className="text-xs text-aldr-gray">Yesterday</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3 flex-shrink-0">
                <i className="fas fa-upload text-sm"></i>
              </div>
              <div>
                <p className="font-medium">Added Social Security Card</p>
                <p className="text-xs text-aldr-gray">2 days ago</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-3 flex-shrink-0">
                <i className="fas fa-share-alt text-sm"></i>
              </div>
              <div>
                <p className="font-medium">Shared Birth Certificate</p>
                <p className="text-xs text-aldr-gray">1 week ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdentityVault;