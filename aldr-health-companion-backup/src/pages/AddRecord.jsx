import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * AddRecord - A form to submit a new health record
 */
const AddRecord = () => {
  const navigate = useNavigate(); // Used to redirect after form submission

  // Form state
  const [formData, setFormData] = useState({
    recordType: "bloodwork",
    title: "",
    content: { 
      details: "",
      original_language: "",  // Store original language if not English
      translated_details: "",  // Store translated content if applicable
      files: []  // Store file references
    },
    language: "en", // Default language
  });
  
  // Track if content is multilingual
  const [isMultilingual, setIsMultilingual] = useState(false);
  
  // File uploads state
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [filePreview, setFilePreview] = useState([]);

  // Update state on input change
  const handleChange = (e) => {
    if (e.target.name === "content") {
      // Handle content as an object with 'details' property
      setFormData({ 
        ...formData, 
        content: { ...formData.content, details: e.target.value } 
      });
    } else if (e.target.name === "original_content") {
      // Handle original content (non-English)
      setFormData({
        ...formData,
        content: { ...formData.content, original_language: formData.language, details: e.target.value }
      });
    } else if (e.target.name === "translated_content") {
      // Handle translated content (English)
      setFormData({
        ...formData,
        content: { ...formData.content, translated_details: e.target.value }
      });
    } else if (e.target.name === "language") {
      // Update language
      setFormData({ 
        ...formData, 
        language: e.target.value 
      });
      
      // If language is not English, enable multilingual mode
      setIsMultilingual(e.target.value !== "en");
    } else {
      // Handle all other field changes
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(prev => [...prev, ...files]);
    
    // Create previews for the files
    files.forEach(file => {
      if (file.type.match('image.*')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setFilePreview(prev => [...prev, {
            name: file.name,
            type: file.type,
            url: e.target.result
          }]);
        };
        reader.readAsDataURL(file);
      } else {
        // Non-image file preview (just display name)
        setFilePreview(prev => [...prev, {
          name: file.name,
          type: file.type,
          url: null
        }]);
      }
    });
    
    // Update form data to include file information
    const fileData = files.map(file => ({
      name: file.name,
      type: file.type,
      size: file.size,
      // For a real app, we'd upload to storage and save URL
      // For this POC, we'll store the file data directly
      data: URL.createObjectURL(file)
    }));
    
    setFormData({
      ...formData,
      content: {
        ...formData.content,
        files: [...(formData.content.files || []), ...fileData]
      }
    });
  };
  
  // Remove a file
  const removeFile = (index) => {
    // Create new arrays without the removed file
    const updatedFiles = [...selectedFiles];
    const updatedPreviews = [...filePreview];
    const updatedFileData = [...formData.content.files];
    
    updatedFiles.splice(index, 1);
    updatedPreviews.splice(index, 1);
    updatedFileData.splice(index, 1);
    
    setSelectedFiles(updatedFiles);
    setFilePreview(updatedPreviews);
    setFormData({
      ...formData,
      content: {
        ...formData.content,
        files: updatedFileData
      }
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form refresh

    try {
      // Get user ID from localStorage
      const userId = localStorage.getItem('userId') || "1742961914546";

      // Prepare data to send
      const newRecord = {
        ...formData,
        userId,
      };

      // In a real application, we would first upload files to cloud storage
      // and then save the URLs in the record
      // For this POC, we're storing file data directly in the record
      
      // 🔁 POST data to your backend
      const response = await fetch("http://localhost:5000/api/health-records", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRecord),
      });

      if (!response.ok) {
        throw new Error("Failed to add record");
      }

      // ✅ Redirect to dashboard after success
      navigate("/");
    } catch (err) {
      console.error("Error submitting record:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
        Add New Health Record
      </h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Record Type Selector */}
        <div>
          <label className="block font-medium mb-1">Record Type</label>
          <select
            name="recordType"
            value={formData.recordType}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="bloodwork">Bloodwork</option>
            <option value="vaccination">Vaccination</option>
            <option value="appointment">Appointment</option>
            <option value="scan">Scan</option>
            <option value="diagnosis">Diagnosis</option>
            <option value="treatment">Treatment</option>
            <option value="allergy">Allergy</option>
            <option value="note">Doctor's Note</option>
          </select>
        </div>

        {/* Title Field */}
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="e.g. MRI Results - March 2024"
          />
        </div>

        {/* Language Selector */}
        <div>
          <label className="block font-medium mb-1">Record Language</label>
          <select
            name="language"
            value={formData.language}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="en">English</option>
            <option value="pt">Portuguese</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="it">Italian</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Content Field - depends on language selection */}
        {!isMultilingual ? (
          // English content (default)
          <div>
            <label className="block font-medium mb-1">Details / Notes</label>
            <textarea
              name="content"
              value={formData.content.details}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              rows="5"
              placeholder="Add any relevant notes, findings, or attachments info..."
            ></textarea>
          </div>
        ) : (
          // Non-English content with translation
          <>
            <div>
              <label className="block font-medium mb-1">
                Original Content ({formData.language === 'pt' ? 'Portuguese' : 
                                  formData.language === 'es' ? 'Spanish' : 
                                  formData.language === 'fr' ? 'French' : 
                                  formData.language === 'de' ? 'German' : 
                                  formData.language === 'it' ? 'Italian' : 'Other'})
              </label>
              <textarea
                name="original_content"
                value={formData.content.details}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                rows="5"
                placeholder="Add the original content in its native language..."
              ></textarea>
            </div>
            
            <div>
              <label className="block font-medium mb-1">English Translation (Optional)</label>
              <textarea
                name="translated_content"
                value={formData.content.translated_details}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                rows="5"
                placeholder="Add the English translation if available..."
              ></textarea>
              <p className="text-xs text-gray-500 mt-1">
                * You can leave this blank and add the translation later
              </p>
            </div>
          </>
        )}

        {/* File Upload Section */}
        <div>
          <label className="block font-medium mb-1">Attach Files (Images, Documents)</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full border rounded px-3 py-2"
            accept="image/*,.pdf,.doc,.docx"
            multiple
          />
          <p className="text-xs text-gray-500 mt-1">
            You can upload images, PDFs, and Office documents
          </p>
          
          {/* File Preview Area */}
          {filePreview.length > 0 && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
              {filePreview.map((file, index) => (
                <div key={index} className="border rounded-md p-2 relative">
                  {file.url && file.type.includes('image') ? (
                    <img 
                      src={file.url} 
                      alt={file.name} 
                      className="w-full h-32 object-cover rounded"
                    />
                  ) : (
                    <div className="h-32 flex items-center justify-center bg-gray-100 rounded">
                      <div className="text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p className="mt-1 text-sm text-gray-600 truncate">{file.name}</p>
                      </div>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          Submit Record
        </button>
      </form>
    </div>
  );
};

export default AddRecord;
