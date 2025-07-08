/**
 * CSV Export Utility for Autonomi Demo
 * 
 * Exports Peter Murphy's Aldr ID data in unified CSV format
 */

export const exportPeterMurphyDataAsCSV = () => {
  // Get data from localStorage (where Svelte app stores it)
  const aldrIdData = localStorage.getItem('aldrId');
  const setupData = localStorage.getItem('aldrIdSetup');
  
  if (!aldrIdData) {
    return { 
      success: false, 
      message: 'No Aldr ID data found to export' 
    };
  }

  try {
    const parsedData = JSON.parse(aldrIdData);
    
    // Convert to unified data structure format
    const unifiedData = convertToUnifiedFormat(parsedData);
    
    // Generate CSV content
    const csvContent = generateCSV(unifiedData);
    
    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `peter-murphy-aldr-data-export-${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    return { 
      success: true, 
      recordCount: unifiedData.length,
      message: `Successfully exported ${unifiedData.length} records for Peter Murphy` 
    };

  } catch (error) {
    console.error('Error exporting data:', error);
    return { 
      success: false, 
      message: `Export failed: ${error.message}` 
    };
  }
};

const convertToUnifiedFormat = (aldrIdData) => {
  const unifiedRecords = [];
  const userId = 'peter-murphy-demo';
  const currentDate = new Date().toISOString();

  // Add profile data as a record
  if (aldrIdData.name || aldrIdData.dateOfBirth || aldrIdData.taxId || aldrIdData.nationality) {
    unifiedRecords.push({
      title: 'Peter Murphy Profile',
      category: 'identity',
      subcategory: 'profile',
      document_type: 'profile_data',
      description: 'Personal profile information for Peter Murphy',
      content: '',
      data_tags: ['personal', 'profile', 'identity'],
      issue_date: '',
      expiry_date: '',
      renewal_date: '',
      reminder_date: '',
      country: aldrIdData.nationality || '',
      state_province: '',
      city: '',
      status: 'active',
      verification_status: 'verified',
      file_name: '',
      structured_data: {
        name: aldrIdData.name || '',
        dateOfBirth: aldrIdData.dateOfBirth || '',
        taxId: aldrIdData.taxId || '',
        nationality: aldrIdData.nationality || ''
      },
      created_date: currentDate,
      updated_date: currentDate
    });
  }

  // Add document records
  if (aldrIdData.documents) {
    Object.entries(aldrIdData.documents).forEach(([docType, docData]) => {
      if (docData.uploaded && docData.address) {
        // Determine expiry dates based on document type
        let expiryDate = '';
        let renewalDate = '';
        let reminderDate = '';
        
        if (docType === 'passport') {
          // Passports typically expire in 10 years
          const issueDate = new Date();
          const expiry = new Date(issueDate);
          expiry.setFullYear(expiry.getFullYear() + 10);
          expiryDate = expiry.toISOString().split('T')[0];
          
          const renewal = new Date(expiry);
          renewal.setMonth(renewal.getMonth() - 6); // Remind 6 months before
          renewalDate = renewal.toISOString().split('T')[0];
          reminderDate = renewal.toISOString().split('T')[0];
        } else if (docType === 'driversLicense') {
          // Driver's licenses typically expire in 5-10 years
          const issueDate = new Date();
          const expiry = new Date(issueDate);
          expiry.setFullYear(expiry.getFullYear() + 5);
          expiryDate = expiry.toISOString().split('T')[0];
          
          const renewal = new Date(expiry);
          renewal.setMonth(renewal.getMonth() - 2); // Remind 2 months before
          renewalDate = renewal.toISOString().split('T')[0];
          reminderDate = renewal.toISOString().split('T')[0];
        }

        unifiedRecords.push({
          title: getDocumentTitle(docType, docData),
          category: 'identity',
          subcategory: mapDocumentTypeToSubcategory(docType),
          document_type: 'document',
          description: `${getDocumentTitle(docType, docData)} stored on Autonomi network`,
          content: `Document stored at network address: ${docData.address}`,
          data_tags: getDocumentTags(docType),
          issue_date: getCurrentDateForDemo(),
          expiry_date: expiryDate,
          renewal_date: renewalDate,
          reminder_date: reminderDate,
          country: aldrIdData.nationality || '',
          state_province: '',
          city: '',
          status: 'active',
          verification_status: 'verified',
          file_name: docData.customName || getDocumentTitle(docType, docData),
          structured_data: {
            document_type: docType,
            autonomi_address: docData.address,
            custom_name: docData.customName || '',
            uploaded: docData.uploaded
          },
          created_date: currentDate,
          updated_date: currentDate
        });
      }
    });
  }

  return unifiedRecords;
};

const getDocumentTitle = (docType, docData) => {
  if (docType === 'other' && docData.customName) {
    return docData.customName;
  }
  
  const titleMap = {
    'passport': 'Passport',
    'driversLicense': 'Driver\'s License',
    'governmentId': 'Government ID',
    'birthCertificate': 'Birth Certificate',
    'profile': 'Digital ID Card'
  };
  
  return titleMap[docType] || docType;
};

const mapDocumentTypeToSubcategory = (docType) => {
  const subcategoryMap = {
    'passport': 'passport',
    'driversLicense': 'drivers_license',
    'governmentId': 'government_id',
    'birthCertificate': 'birth_certificate',
    'profile': 'profile',
    'other': 'general'
  };
  
  return subcategoryMap[docType] || 'general';
};

const getDocumentTags = (docType) => {
  const tagMap = {
    'passport': ['official', 'travel', 'government', 'identity'],
    'driversLicense': ['official', 'government', 'identity', 'transport'],
    'governmentId': ['official', 'government', 'identity'],
    'birthCertificate': ['official', 'government', 'vital_records'],
    'profile': ['personal', 'profile', 'identity'],
    'other': ['personal', 'document']
  };
  
  return tagMap[docType] || ['personal', 'document'];
};

const getCurrentDateForDemo = () => {
  // For demo purposes, set issue date to 1 year ago
  const date = new Date();
  date.setFullYear(date.getFullYear() - 1);
  return date.toISOString().split('T')[0];
};

const generateCSV = (data) => {
  // Define CSV headers based on unified schema
  const headers = [
    'Title',
    'Category',
    'Subcategory', 
    'Document Type',
    'Description',
    'Content',
    'Tags',
    'Issue Date',
    'Expiry Date',
    'Renewal Date',
    'Reminder Date',
    'Country',
    'State/Province',
    'City',
    'Status',
    'Verification Status',
    'File Name',
    'Structured Data',
    'Created Date',
    'Updated Date'
  ];

  // Generate CSV rows
  const csvRows = [
    headers.join(','), // Header row
    ...data.map(row => [
      escapeCsvField(row.title || ''),
      escapeCsvField(row.category || ''),
      escapeCsvField(row.subcategory || ''),
      escapeCsvField(row.document_type || ''),
      escapeCsvField(row.description || ''),
      escapeCsvField(row.content || ''),
      escapeCsvField(Array.isArray(row.data_tags) ? row.data_tags.join('; ') : ''),
      escapeCsvField(row.issue_date || ''),
      escapeCsvField(row.expiry_date || ''),
      escapeCsvField(row.renewal_date || ''),
      escapeCsvField(row.reminder_date || ''),
      escapeCsvField(row.country || ''),
      escapeCsvField(row.state_province || ''),
      escapeCsvField(row.city || ''),
      escapeCsvField(row.status || ''),
      escapeCsvField(row.verification_status || ''),
      escapeCsvField(row.file_name || ''),
      escapeCsvField(row.structured_data ? JSON.stringify(row.structured_data) : ''),
      escapeCsvField(row.created_date ? new Date(row.created_date).toLocaleDateString() : ''),
      escapeCsvField(row.updated_date ? new Date(row.updated_date).toLocaleDateString() : '')
    ].join(','))
  ];

  return csvRows.join('\n');
};

const escapeCsvField = (field) => {
  if (field === null || field === undefined) {
    return '';
  }
  
  const stringField = String(field);
  
  // If field contains comma, newline, or quote, wrap in quotes and escape internal quotes
  if (stringField.includes(',') || stringField.includes('\n') || stringField.includes('"')) {
    return '"' + stringField.replace(/"/g, '""') + '"';
  }
  
  return stringField;
};

// Function to get smart reminders based on expiry dates (query-based, no AI)
export const getSmartRemindersForDemo = () => {
  const aldrIdData = localStorage.getItem('aldrId');
  
  if (!aldrIdData) {
    return { success: false, reminders: [] };
  }

  try {
    const parsedData = JSON.parse(aldrIdData);
    const unifiedData = convertToUnifiedFormat(parsedData);
    const today = new Date();
    const reminders = [];

    unifiedData.forEach(item => {
      if (item.expiry_date) {
        const expiryDate = new Date(item.expiry_date);
        const daysUntilExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
        
        let priority = 'normal';
        let type = 'general';
        let message = '';

        if (daysUntilExpiry < 0) {
          priority = 'urgent';
          type = 'expired';
          message = `${item.title} expired ${Math.abs(daysUntilExpiry)} days ago`;
        } else if (daysUntilExpiry <= 30) {
          priority = 'urgent';
          type = 'expires_soon';
          message = `${item.title} expires in ${daysUntilExpiry} days`;
        } else if (daysUntilExpiry <= 90) {
          priority = 'high';
          type = 'upcoming_expiry';
          message = `${item.title} expires in ${daysUntilExpiry} days`;
        }

        if (priority !== 'normal') {
          reminders.push({
            id: `reminder-${item.subcategory}`,
            title: item.title,
            category: item.category,
            subcategory: item.subcategory,
            priority,
            type,
            message,
            expiryDate: item.expiry_date,
            daysUntilExpiry
          });
        }
      }
    });

    return {
      success: true,
      reminders: reminders.sort((a, b) => a.daysUntilExpiry - b.daysUntilExpiry),
      totalCount: reminders.length
    };

  } catch (error) {
    console.error('Error getting reminders:', error);
    return {
      success: false,
      reminders: []
    };
  }
};