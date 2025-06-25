import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import Navbar from '../components/layout/Navbar';

const EditRecord = () => {
  const navigate = useNavigate();
  const { recordId } = useParams();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [filePreview, setFilePreview] = useState([]);
  const [translating, setTranslating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [error, setError] = useState(null);
  
  // Basic form state
  const [formData, setFormData] = useState({
    recordType: "appointment",
    specialty: "medical", // Default specialty to medical
    title: "",
    content: { 
      details: "",
      original_language: "",
      translated_details: "",
      date: new Date().toISOString().split('T')[0],
      location: "",
      doctor: "",
      duration: "",
      reason: "",
      diagnosis: "",
      followUp: {
        required: false,
        date: "",
        notes: ""
      },
      insurance: {
        provider: "",
        policyNumber: "",
        coverage: ""
      },
      payment: {
        amount: "",
        currency: "EUR",
        paid: false
      },
      medication: {
        name: "",
        dosage: "",
        frequency: ""
      },
      sideEffects: "",
      files: []
    },
    language: "en"
  });

  // Track if multilingual
  const [isMultilingual, setIsMultilingual] = useState(false);

  // Show fields based on record type
  const [showAdditionalFields, setShowAdditionalFields] = useState({
    medication: false,
    followUp: false,
    payment: false
  });

  // Fetch record data on component mount
  useEffect(() => {
    const fetchRecord = async () => {
      try {
        setLoading(true);
        console.log(`Fetching record ${recordId} for editing`);
        
        const response = await fetch(`http://localhost:5000/api/health-records/record/${recordId}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch record: ${response.status}`);
        }
        
        const recordData = await response.json();
        console.log("Record data received:", recordData);
        
        // Initialize file previews if record has files
        if (recordData.content && recordData.content.files && recordData.content.files.length > 0) {
          const fileData = recordData.content.files.map(file => ({
            name: file.name,
            type: file.type,
            url: file.type.includes('image') ? file.data : null
          }));
          setFilePreview(fileData);
          setSelectedFiles(recordData.content.files);
        }
        
        // Set form data from record
        setFormData({
          recordType: recordData.recordType || "appointment",
          specialty: recordData.specialty || "medical", // Get specialty from record or default to medical
          title: recordData.title || "",
          content: {
            details: recordData.content?.details || "",
            original_language: recordData.content?.original_language || "",
            translated_details: recordData.content?.translated_details || "",
            date: recordData.content?.date ? new Date(recordData.content.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
            location: recordData.content?.location || "",
            doctor: recordData.content?.doctor || "",
            duration: recordData.content?.duration || "",
            reason: recordData.content?.reason || "",
            diagnosis: recordData.content?.diagnosis || "",
            followUp: {
              required: recordData.content?.followUp?.required || false,
              date: recordData.content?.followUp?.date || "",
              notes: recordData.content?.followUp?.notes || ""
            },
            insurance: {
              provider: recordData.content?.insurance?.provider || "",
              policyNumber: recordData.content?.insurance?.policyNumber || "",
              coverage: recordData.content?.insurance?.coverage || ""
            },
            payment: {
              amount: recordData.content?.payment?.amount || "",
              currency: recordData.content?.payment?.currency || "EUR",
              paid: recordData.content?.payment?.paid || false
            },
            medication: {
              name: recordData.content?.medication?.name || "",
              dosage: recordData.content?.medication?.dosage || "",
              frequency: recordData.content?.medication?.frequency || ""
            },
            sideEffects: recordData.content?.sideEffects || "",
            files: recordData.content?.files || []
          },
          language: recordData.content?.original_language || recordData.language || "en"
        });
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching record for editing:", err);
        setError("Failed to load health record for editing. Please try again later.");
        setLoading(false);
      }
    };

    fetchRecord();
  }, [recordId]);

  useEffect(() => {
    // Set multilingual if language is not English
    setIsMultilingual(formData.language !== "en");
    
    // Show/hide specific sections based on record type
    setShowAdditionalFields({
      medication: ["medication", "vaccination"].includes(formData.recordType),
      followUp: ["appointment", "diagnosis", "bloodwork", "imaging"].includes(formData.recordType),
      payment: true // Show payment fields for all types
    });
  }, [formData.language, formData.recordType]);
  
  // Handle language change
  const handleLanguageChange = (e) => {
    const language = e.target.value;
    setFormData({
      ...formData,
      language,
      content: {
        ...formData.content,
        original_language: language
      }
    });
    setIsMultilingual(language !== "en");
  };
  
  // Handle file upload
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(prev => [...prev, ...files]);
    
    // Create previews
    files.forEach(file => {
      if (file.type.includes('image')) {
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
        // Non-image file preview
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
  
  // Handle form change for basic fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Handle nested objects in content
    if (name.includes('.')) {
      const [parentKey, childKey] = name.split('.');
      setFormData({
        ...formData,
        content: {
          ...formData.content,
          [parentKey]: {
            ...formData.content[parentKey],
            [childKey]: value
          }
        }
      });
    } 
    // Handle checkbox for followUp.required
    else if (name === "followUp.required") {
      setFormData({
        ...formData,
        content: {
          ...formData.content,
          followUp: {
            ...formData.content.followUp,
            required: e.target.checked
          }
        }
      });
    }
    // Handle checkbox for payment.paid
    else if (name === "payment.paid") {
      setFormData({
        ...formData,
        content: {
          ...formData.content,
          payment: {
            ...formData.content.payment,
            paid: e.target.checked
          }
        }
      });
    }
    // Handle basic content fields
    else if (["details", "original_content", "translated_content", "date", "location", "doctor", "duration", "reason", "diagnosis", "sideEffects"].includes(name)) {
      const contentFieldMap = {
        "original_content": "details",
        "translated_content": "translated_details"
      };
      
      setFormData({
        ...formData,
        content: { 
          ...formData.content, 
          [contentFieldMap[name] || name]: value 
        }
      });
    } 
    // Handle form level fields
    else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  // Mock translation service
  const translateText = () => {
    setTranslating(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // For demo, we'd normally call a translation API
      // Here we'll simulate a translation by prepending "TRANSLATED: "
      const translatedText = "TRANSLATED: " + formData.content.details;
      
      setFormData({
        ...formData,
        content: {
          ...formData.content,
          translated_details: translatedText
        }
      });
      
      setTranslating(false);
    }, 1500);
  };
  
  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoadingSubmit(true);
      
      // Get user ID from localStorage or use default
      const userId = localStorage.getItem('userId') || "1742961914546";
      
      // Prepare data to send - add userId back in case it's needed
      const updatedRecord = {
        userId,
        recordType: formData.recordType,
        specialty: formData.specialty,
        title: formData.title,
        content: formData.content,
        id: recordId // Ensure the ID is included
      };
      
      // In a real app, we would first upload new files to cloud storage
      
      // PUT data to backend to update record
      console.log("Updating record with data:", JSON.stringify(updatedRecord, null, 2));
      
      const url = `http://localhost:5000/api/health-records/record/${recordId}`;
      console.log("Making request to URL:", url);
      
      try {
        // Make the actual API call to update the record
        const response = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedRecord),
        });
        
        console.log("Response status:", response.status);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error("Error response body:", errorText);
          throw new Error(`Failed to update record: ${response.status} ${errorText}`);
        }
        
        const result = await response.json();
        console.log("Update response:", result);
        
        setLoadingSubmit(false);
        alert("Health record updated successfully!");
        navigate(`/record/${recordId}`);
      } catch (fetchError) {
        console.error("Fetch error:", fetchError);
        throw fetchError;
      }
      
    } catch (error) {
      console.error("Error updating record:", error);
      setLoadingSubmit(false);
      alert("Something went wrong. Please try again.");
    }
  };

  // Render loading state
  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 py-6">
          <main className="bg-white shadow-md rounded-lg p-6">
            <div className="flex justify-center items-center h-64">
              <p className="text-gray-600">Loading record data...</p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div>
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 py-6">
          <main className="bg-white shadow-md rounded-lg p-6">
            <div className="flex flex-col items-center justify-center h-64">
              <p className="text-red-600 mb-4">{error}</p>
              <Link 
                to="/" 
                className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition"
              >
                Back to Dashboard
              </Link>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-6">
        <header className="bg-white shadow-md rounded-lg mb-6 p-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div className="flex items-center">
              <svg className="w-8 h-8 mr-2 text-teal-600" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-6h2v2h-2zm0-8h2v6h-2z" />
              </svg>
              <div>
                <h1 className="text-2xl font-bold text-teal-700">SOMA | Edit Health Record</h1>
                <p className="text-xs text-gray-500">somavault.io</p>
              </div>
            </div>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link 
                to={`/record/${recordId}`}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
              >
                Cancel
              </Link>
            </div>
          </div>
        </header>

        <main className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-teal-800 mb-6 border-b pb-2 border-teal-200">Edit Health Record</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information Section */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="text-lg font-medium text-teal-700 mb-4">Basic Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Specialty (First-tier) */}
                <div>
                  <label className="block font-medium mb-1 text-gray-700">Medical Specialty</label>
                  <select
                    name="specialty"
                    value={formData.specialty}
                    onChange={handleChange}
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  >
                    <option value="medical">Medical (Conventional)</option>
                    <option value="physiotherapy">Physiotherapy</option>
                    <option value="chiropractic">Chiropractic</option>
                    <option value="massage">Massage/Bodywork</option>
                    <option value="mental_health">Mental Health</option>
                    <option value="nutrition">Nutrition</option>
                    <option value="alternative">Alternative/Complementary</option>
                    <option value="dentistry">Dentistry</option>
                    <option value="optometry">Optometry</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                {/* Record Type (Second-tier) */}
                <div>
                  <label className="block font-medium mb-1 text-gray-700">Record Type</label>
                  <select
                    name="recordType"
                    value={formData.recordType}
                    onChange={handleChange}
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  >
                    {/* Medical record types */}
                    {formData.specialty === 'medical' && (
                      <>
                        <option value="consultation">Consultation</option>
                        <option value="laboratory">Laboratory (Bloodwork, Tests)</option>
                        <option value="imaging">Imaging/Scan</option>
                        <option value="prescription">Prescription</option>
                        <option value="vaccination">Vaccination</option>
                        <option value="surgery">Surgery</option>
                        <option value="emergency">Emergency</option>
                        <option value="annual_physical">Annual Physical</option>
                      </>
                    )}
                    
                    {/* Physiotherapy record types */}
                    {formData.specialty === 'physiotherapy' && (
                      <>
                        <option value="physio_assessment">Assessment</option>
                        <option value="physio_treatment">Treatment Session</option>
                        <option value="exercise_program">Exercise Program</option>
                        <option value="progress_review">Progress Review</option>
                      </>
                    )}
                    
                    {/* Chiropractic record types */}
                    {formData.specialty === 'chiropractic' && (
                      <>
                        <option value="adjustment">Adjustment</option>
                        <option value="xray_assessment">X-ray Assessment</option>
                        <option value="maintenance_visit">Maintenance Visit</option>
                      </>
                    )}
                    
                    {/* Massage/Bodywork record types */}
                    {formData.specialty === 'massage' && (
                      <>
                        <option value="deep_tissue">Deep Tissue</option>
                        <option value="trigger_point">Trigger Point</option>
                        <option value="sports_massage">Sports Massage</option>
                        <option value="thai_massage">Thai Massage</option>
                        <option value="reflexology">Reflexology</option>
                        <option value="craniosacral">Craniosacral</option>
                        <option value="myofascial">Myofascial Release</option>
                      </>
                    )}
                    
                    {/* Mental Health record types */}
                    {formData.specialty === 'mental_health' && (
                      <>
                        <option value="therapy_session">Therapy Session</option>
                        <option value="mental_assessment">Assessment</option>
                        <option value="medication_review">Medication Review</option>
                      </>
                    )}
                    
                    {/* Nutrition record types */}
                    {formData.specialty === 'nutrition' && (
                      <>
                        <option value="nutrition_assessment">Initial Assessment</option>
                        <option value="nutrition_followup">Follow-up</option>
                        <option value="diet_plan">Diet Plan</option>
                      </>
                    )}
                    
                    {/* Alternative/Complementary record types */}
                    {formData.specialty === 'alternative' && (
                      <>
                        <option value="acupuncture">Acupuncture</option>
                        <option value="naturopathy">Naturopathy</option>
                        <option value="homeopathy">Homeopathy</option>
                        <option value="ayurveda">Ayurveda</option>
                        <option value="tcm">Traditional Chinese Medicine</option>
                        <option value="energy_healing">Energy Healing</option>
                      </>
                    )}
                    
                    {/* Dentistry record types */}
                    {formData.specialty === 'dentistry' && (
                      <>
                        <option value="dental_checkup">Check-up</option>
                        <option value="dental_cleaning">Cleaning</option>
                        <option value="dental_procedure">Procedure</option>
                        <option value="dental_surgery">Surgery</option>
                      </>
                    )}
                    
                    {/* Optometry record types */}
                    {formData.specialty === 'optometry' && (
                      <>
                        <option value="eye_exam">Eye Exam</option>
                        <option value="eye_prescription">Prescription</option>
                        <option value="eye_treatment">Treatment</option>
                      </>
                    )}
                    
                    {/* Other record types */}
                    {formData.specialty === 'other' && (
                      <option value="other">Custom Entry</option>
                    )}
                  </select>
                </div>
                
                {/* Title */}
                <div>
                  <label className="block font-medium mb-1 text-gray-700">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="e.g. Annual Check-up"
                    required
                  />
                </div>
                
                {/* Date */}
                <div>
                  <label className="block font-medium mb-1 text-gray-700">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.content.date}
                    onChange={handleChange}
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>
                
                {/* Location */}
                <div>
                  <label className="block font-medium mb-1 text-gray-700">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.content.location}
                    onChange={handleChange}
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Hospital or clinic name"
                    required
                  />
                </div>
                
                {/* Medical Group / Doctor */}
                <div>
                  <label className="block font-medium mb-1 text-gray-700">Medical Group / Doctor</label>
                  <input
                    type="text"
                    name="doctor"
                    value={formData.content.doctor}
                    onChange={handleChange}
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Name of doctor or medical group"
                    required
                  />
                </div>
                
                {/* Duration (for appointments) */}
                <div>
                  <label className="block font-medium mb-1 text-gray-700">Duration (if applicable)</label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.content.duration}
                    onChange={handleChange}
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="e.g. 30 minutes, 1 hour"
                  />
                </div>
              </div>
            </div>
            
            {/* Medical Information Section */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="text-lg font-medium text-teal-700 mb-4">Medical Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Reason/Symptoms */}
                <div className="md:col-span-2">
                  <label className="block font-medium mb-1 text-gray-700">Reason / Symptoms</label>
                  <input
                    type="text"
                    name="reason"
                    value={formData.content.reason}
                    onChange={handleChange}
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Purpose of visit or symptoms experienced"
                  />
                </div>
                
                {/* Diagnosis/Results */}
                <div className="md:col-span-2">
                  <label className="block font-medium mb-1 text-gray-700">Diagnosis / Results</label>
                  <input
                    type="text"
                    name="diagnosis"
                    value={formData.content.diagnosis}
                    onChange={handleChange}
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Doctor's diagnosis or test results"
                  />
                </div>
              </div>
              
              {/* Medication Info (show only for medication/vaccination) */}
              {showAdditionalFields.medication && (
                <div className="mt-4 border-t pt-4 border-gray-200">
                  <h4 className="text-md font-medium text-teal-700 mb-3">Medication Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block font-medium mb-1 text-gray-700">Medication Name</label>
                      <input
                        type="text"
                        name="medication.name"
                        value={formData.content.medication.name}
                        onChange={handleChange}
                        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="Medication name"
                      />
                    </div>
                    <div>
                      <label className="block font-medium mb-1 text-gray-700">Dosage</label>
                      <input
                        type="text"
                        name="medication.dosage"
                        value={formData.content.medication.dosage}
                        onChange={handleChange}
                        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="e.g. 10mg, 500ml"
                      />
                    </div>
                    <div>
                      <label className="block font-medium mb-1 text-gray-700">Frequency</label>
                      <input
                        type="text"
                        name="medication.frequency"
                        value={formData.content.medication.frequency}
                        onChange={handleChange}
                        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="e.g. twice daily, weekly"
                      />
                    </div>
                    <div className="md:col-span-3">
                      <label className="block font-medium mb-1 text-gray-700">Side Effects / Reactions</label>
                      <input
                        type="text"
                        name="sideEffects"
                        value={formData.content.sideEffects}
                        onChange={handleChange}
                        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="Any side effects or reactions experienced"
                      />
                    </div>
                  </div>
                </div>
              )}
              
              {/* Follow-up Information */}
              {showAdditionalFields.followUp && (
                <div className="mt-4 border-t pt-4 border-gray-200">
                  <div className="flex items-center mb-3">
                    <h4 className="text-md font-medium text-teal-700">Follow-up Required</h4>
                    <input
                      type="checkbox"
                      name="followUp.required"
                      checked={formData.content.followUp.required}
                      onChange={handleChange}
                      className="ml-2 h-5 w-5 text-teal-600 focus:ring-teal-500"
                    />
                  </div>
                  
                  {formData.content.followUp.required && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-medium mb-1 text-gray-700">Follow-up Date</label>
                        <input
                          type="date"
                          name="followUp.date"
                          value={formData.content.followUp.date}
                          onChange={handleChange}
                          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                      </div>
                      <div>
                        <label className="block font-medium mb-1 text-gray-700">Follow-up Notes</label>
                        <input
                          type="text"
                          name="followUp.notes"
                          value={formData.content.followUp.notes}
                          onChange={handleChange}
                          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                          placeholder="Any notes about the follow-up"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* Insurance and Payment Section */}
            {showAdditionalFields.payment && (
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="text-lg font-medium text-teal-700 mb-4">Insurance & Payment</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium mb-1 text-gray-700">Insurance Provider</label>
                    <input
                      type="text"
                      name="insurance.provider"
                      value={formData.content.insurance.provider}
                      onChange={handleChange}
                      className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Insurance company name"
                    />
                  </div>
                  <div>
                    <label className="block font-medium mb-1 text-gray-700">Policy Number</label>
                    <input
                      type="text"
                      name="insurance.policyNumber"
                      value={formData.content.insurance.policyNumber}
                      onChange={handleChange}
                      className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Your insurance policy number"
                    />
                  </div>
                  <div>
                    <label className="block font-medium mb-1 text-gray-700">Coverage Details</label>
                    <input
                      type="text"
                      name="insurance.coverage"
                      value={formData.content.insurance.coverage}
                      onChange={handleChange}
                      className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="e.g. 80% covered, fully covered"
                    />
                  </div>
                  <div>
                    <label className="block font-medium mb-1 text-gray-700">Payment Amount</label>
                    <div className="flex">
                      <select
                        name="payment.currency"
                        value={formData.content.payment.currency}
                        onChange={handleChange}
                        className="border rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      >
                        <option value="EUR">€</option>
                        <option value="USD">$</option>
                        <option value="GBP">£</option>
                      </select>
                      <input
                        type="text"
                        name="payment.amount"
                        value={formData.content.payment.amount}
                        onChange={handleChange}
                        className="w-full border-t border-b border-r rounded-r-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="Amount paid"
                      />
                    </div>
                  </div>
                  <div className="flex items-center mt-2">
                    <input
                      type="checkbox"
                      name="payment.paid"
                      checked={formData.content.payment.paid}
                      onChange={handleChange}
                      className="h-5 w-5 text-teal-600 focus:ring-teal-500"
                    />
                    <label className="ml-2 font-medium text-gray-700">Payment Completed</label>
                  </div>
                </div>
              </div>
            )}
            
            {/* Language and Description Section */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="text-lg font-medium text-teal-700 mb-4">Description & Notes</h3>
              
              {/* Language Selector */}
              <div className="mb-4">
                <label className="block font-medium mb-1 text-gray-700">Record Language</label>
                <select
                  name="language"
                  value={formData.language}
                  onChange={handleLanguageChange}
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="en">English</option>
                  <option value="pt">Portuguese</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="it">Italian</option>
                  <option value="de">German</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              {/* Content Field - depends on language selection */}
              {!isMultilingual ? (
                // English content
                <div>
                  <label className="block font-medium mb-1 text-gray-700">Details / Notes</label>
                  <textarea
                    name="details"
                    value={formData.content.details}
                    onChange={handleChange}
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    rows="5"
                    placeholder="Enter detailed notes about the health record..."
                    required
                  ></textarea>
                </div>
              ) : (
                // Non-English content with translation
                <>
                  <div className="mb-4">
                    <label className="block font-medium mb-1 text-gray-700">
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
                      className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      rows="5"
                      placeholder="Add the original content in its native language..."
                      required
                    ></textarea>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block font-medium text-gray-700">English Translation (for Irish account)</label>
                      <button 
                        type="button" 
                        onClick={translateText}
                        disabled={!formData.content.details || translating}
                        className="text-sm bg-teal-600 text-white px-3 py-1 rounded hover:bg-teal-700 disabled:bg-gray-400 transition"
                      >
                        {translating ? "Translating..." : "Translate Now"}
                      </button>
                    </div>
                    <textarea
                      name="translated_content"
                      value={formData.content.translated_details}
                      onChange={handleChange}
                      className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      rows="5"
                      placeholder="Add or generate English translation..."
                    ></textarea>
                    <p className="text-xs text-gray-500 mt-1">
                      Translation will be displayed when viewing this record from your Irish account.
                    </p>
                  </div>
                </>
              )}
            </div>
            
            {/* File Upload Section */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="text-lg font-medium text-teal-700 mb-4">Attachments</h3>
              
              <div>
                <label className="block font-medium mb-1 text-gray-700">Add More Files</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  accept="image/*,.pdf,.doc,.docx"
                  multiple
                />
                <p className="text-xs text-gray-500 mt-1">
                  You can upload images, PDFs, and other medical documents
                </p>
                
                {/* File Preview Area */}
                {filePreview.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
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
            </div>
            
            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <Link
                to={`/record/${recordId}`}
                className="py-2 px-6 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loadingSubmit}
                className="bg-teal-600 text-white py-2 px-6 rounded-md hover:bg-teal-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:bg-gray-400"
              >
                {loadingSubmit ? "Saving..." : "Update Record"}
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default EditRecord;