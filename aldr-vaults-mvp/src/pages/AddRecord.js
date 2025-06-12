import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UniformHeader from '../components/layout/UniformHeader';

const AddRecord = () => {
  const navigate = useNavigate();
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [formData, setFormData] = useState({
    title: '',
    specialty: 'medical',
    recordType: 'consultation',
    date: '',
    description: '',
    provider: '',
    location: ''
  });

  const specialtyOptions = [
    { value: 'medical', label: 'Medical' },
    { value: 'physiotherapy', label: 'Physiotherapy' },
    { value: 'chiropractic', label: 'Chiropractic' },
    { value: 'massage', label: 'Massage Therapy' },
    { value: 'mental_health', label: 'Mental Health' },
    { value: 'nutrition', label: 'Nutrition' },
    { value: 'alternative', label: 'Alternative Medicine' },
    { value: 'dentistry', label: 'Dentistry' },
    { value: 'optometry', label: 'Optometry' },
    { value: 'other', label: 'Other' }
  ];

  const recordTypeOptions = {
    medical: [
      { value: 'consultation', label: 'Consultation' },
      { value: 'laboratory', label: 'Laboratory Results' },
      { value: 'imaging', label: 'Imaging/X-Ray' },
      { value: 'prescription', label: 'Prescription' },
      { value: 'vaccination', label: 'Vaccination' },
      { value: 'surgery', label: 'Surgery' },
      { value: 'emergency', label: 'Emergency Visit' },
      { value: 'annual_physical', label: 'Annual Physical' }
    ],
    physiotherapy: [
      { value: 'physio_assessment', label: 'Assessment' },
      { value: 'physio_treatment', label: 'Treatment Session' },
      { value: 'exercise_program', label: 'Exercise Program' },
      { value: 'progress_review', label: 'Progress Review' }
    ],
    dentistry: [
      { value: 'dental_checkup', label: 'Dental Checkup' },
      { value: 'dental_cleaning', label: 'Dental Cleaning' },
      { value: 'dental_procedure', label: 'Dental Procedure' },
      { value: 'dental_surgery', label: 'Dental Surgery' }
    ],
    mental_health: [
      { value: 'therapy_session', label: 'Therapy Session' },
      { value: 'mental_assessment', label: 'Mental Health Assessment' },
      { value: 'medication_review', label: 'Medication Review' }
    ],
    optometry: [
      { value: 'eye_exam', label: 'Eye Examination' },
      { value: 'eye_prescription', label: 'Eye Prescription' },
      { value: 'eye_treatment', label: 'Eye Treatment' }
    ]
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      // Reset record type when specialty changes
      ...(name === 'specialty' && { recordType: recordTypeOptions[value]?.[0]?.value || 'consultation' })
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would save to the backend
    console.log('New record:', formData);
    alert('Record added successfully!');
    navigate('/aldr-health');
  };

  const currentRecordTypes = recordTypeOptions[formData.specialty] || recordTypeOptions.medical;

  return (
    <div className="dashboard-container">
      <UniformHeader />
      <div className="max-w-4xl mx-auto animate-fade-in">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold heading-gradient mb-4">Add New Health Record</h1>
              <p className="text-aldr-gray">
                Add a new health record to your Aldr Health vault
              </p>
            </div>
            <button
              onClick={() => navigate('/aldr-health')}
              className="btn-secondary"
            >
              <i className="fas fa-arrow-left mr-2"></i>
              Back to Health
            </button>
          </div>
        </header>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="md:col-span-2">
              <label htmlFor="title" className="block text-sm font-medium text-aldr-dark mb-2">
                Record Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-aldr-teal focus:border-transparent"
                placeholder="e.g., Annual Physical Exam, Blood Test Results"
              />
            </div>

            {/* Specialty */}
            <div>
              <label htmlFor="specialty" className="block text-sm font-medium text-aldr-dark mb-2">
                Specialty *
              </label>
              <select
                id="specialty"
                name="specialty"
                value={formData.specialty}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-aldr-teal focus:border-transparent"
              >
                {specialtyOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Record Type */}
            <div>
              <label htmlFor="recordType" className="block text-sm font-medium text-aldr-dark mb-2">
                Record Type *
              </label>
              <select
                id="recordType"
                name="recordType"
                value={formData.recordType}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-aldr-teal focus:border-transparent"
              >
                {currentRecordTypes.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-aldr-dark mb-2">
                Date *
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-aldr-teal focus:border-transparent"
              />
            </div>

            {/* Provider */}
            <div>
              <label htmlFor="provider" className="block text-sm font-medium text-aldr-dark mb-2">
                Healthcare Provider
              </label>
              <input
                type="text"
                id="provider"
                name="provider"
                value={formData.provider}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-aldr-teal focus:border-transparent"
                placeholder="e.g., Dr. Smith, Toronto General Hospital"
              />
            </div>

            {/* Location */}
            <div className="md:col-span-2">
              <label htmlFor="location" className="block text-sm font-medium text-aldr-dark mb-2">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-aldr-teal focus:border-transparent"
                placeholder="e.g., Toronto, ON"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-aldr-dark mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-aldr-teal focus:border-transparent"
                placeholder="Describe the visit, findings, treatments, or any other relevant details..."
              />
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate('/aldr-health')}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              <i className="fas fa-save mr-2"></i>
              Save Record
            </button>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
};

export default AddRecord;