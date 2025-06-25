/**
 * AldrForm - Unified Form Component for Aldr Design System
 * 
 * A comprehensive form component that provides consistent form handling,
 * validation, and styling across all Aldr applications.
 * 
 * Features:
 * - Built-in form validation with custom rules
 * - Loading and submission states
 * - Error handling and display
 * - Flexible layout options (vertical, horizontal, grid)
 * - Form progress indication for multi-step forms
 * - Consistent styling and spacing
 * 
 * @version 1.0.0
 * @author Aldr Design System
 */

import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import AldrButton from './AldrButton';

const AldrForm = ({ 
  children,
  onSubmit,
  initialValues = {},
  validationRules = {},
  layout = "vertical", // vertical, horizontal, grid
  showProgress = false,
  currentStep = 1,
  totalSteps = 1,
  loading = false,
  disabled = false,
  className = "",
  formClassName = "",
  title = null,
  description = null,
  submitText = "Submit",
  cancelText = "Cancel",
  showCancel = false,
  onCancel = null,
  submitVariant = "primary",
  gridCols = "grid-cols-1 md:grid-cols-2",
  spacing = "space-y-6",
  ...props
}) => {

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation function
  const validateField = useCallback((name, value) => {
    const rules = validationRules[name];
    if (!rules) return null;

    // Required validation
    if (rules.required && (!value || value.toString().trim() === '')) {
      return rules.required === true ? `${name} is required` : rules.required;
    }

    // Min length validation
    if (rules.minLength && value && value.toString().length < rules.minLength) {
      return `${name} must be at least ${rules.minLength} characters`;
    }

    // Max length validation
    if (rules.maxLength && value && value.toString().length > rules.maxLength) {
      return `${name} must be no more than ${rules.maxLength} characters`;
    }

    // Pattern validation
    if (rules.pattern && value && !rules.pattern.test(value)) {
      return rules.patternMessage || `${name} format is invalid`;
    }

    // Email validation
    if (rules.email && value) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) {
        return 'Please enter a valid email address';
      }
    }

    // Custom validation function
    if (rules.validate && typeof rules.validate === 'function') {
      return rules.validate(value, values);
    }

    return null;
  }, [validationRules, values]);

  // Validate all fields
  const validateForm = useCallback(() => {
    const newErrors = {};
    let isValid = true;

    Object.keys(validationRules).forEach(fieldName => {
      const error = validateField(fieldName, values[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [validateField, values]);

  // Handle field change
  const handleChange = useCallback((name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  }, [errors]);

  // Handle field blur
  const handleBlur = useCallback((name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    
    // Validate field on blur
    const error = validateField(name, values[name]);
    setErrors(prev => ({ ...prev, [name]: error }));
  }, [validateField, values]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (loading || disabled || isSubmitting) return;

    // Mark all fields as touched
    const allTouched = {};
    Object.keys(validationRules).forEach(field => {
      allTouched[field] = true;
    });
    setTouched(allTouched);

    // Validate form
    const isValid = validateForm();
    if (!isValid) return;

    setIsSubmitting(true);

    try {
      if (onSubmit) {
        await onSubmit(values, { setErrors, setValues });
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      // Reset form
      setValues(initialValues);
      setErrors({});
      setTouched({});
    }
  };

  // Clone children with form props
  const renderChildren = () => {
    return React.Children.map(children, child => {
      if (React.isValidElement(child) && child.props.name) {
        return React.cloneElement(child, {
          value: values[child.props.name] || '',
          error: touched[child.props.name] ? errors[child.props.name] : null,
          onChange: (e) => {
            const value = e.target ? e.target.value : e;
            handleChange(child.props.name, value);
            if (child.props.onChange) {
              child.props.onChange(e);
            }
          },
          onBlur: (e) => {
            handleBlur(child.props.name);
            if (child.props.onBlur) {
              child.props.onBlur(e);
            }
          }
        });
      }
      return child;
    });
  };

  // Form layout classes
  const layoutClasses = {
    vertical: spacing,
    horizontal: "space-y-4",
    grid: `grid ${gridCols} gap-6`
  };

  // Progress component
  const FormProgress = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-sm text-gray-500">
          {Math.round((currentStep / totalSteps) * 100)}% Complete
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-aldr-teal to-aldr-purple h-2 rounded-full transition-all duration-300"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        ></div>
      </div>
    </div>
  );

  return (
    <div className={`max-w-2xl mx-auto ${className}`}>
      {/* Form Header */}
      {(title || description) && (
        <div className="text-center mb-8">
          {title && (
            <h2 className="text-2xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Lora, serif' }}>
              {title}
            </h2>
          )}
          {description && (
            <p className="text-gray-600 leading-relaxed">
              {description}
            </p>
          )}
        </div>
      )}

      {/* Progress Indicator */}
      {showProgress && totalSteps > 1 && <FormProgress />}

      {/* Form */}
      <form 
        onSubmit={handleSubmit}
        className={`${formClassName}`}
        noValidate
        {...props}
      >
        {/* Form Fields */}
        <div className={layoutClasses[layout]}>
          {renderChildren()}
        </div>

        {/* Form Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-end mt-8 pt-6 border-t border-gray-200">
          {showCancel && (
            <AldrButton
              type="button"
              variant="secondary"
              onClick={handleCancel}
              disabled={loading || isSubmitting}
            >
              {cancelText}
            </AldrButton>
          )}
          
          <AldrButton
            type="submit"
            variant={submitVariant}
            loading={loading || isSubmitting}
            disabled={disabled}
            className="sm:min-w-[120px]"
          >
            {submitText}
          </AldrButton>
        </div>
      </form>
    </div>
  );
};

AldrForm.propTypes = {
  children: PropTypes.node.isRequired,
  onSubmit: PropTypes.func,
  initialValues: PropTypes.object,
  validationRules: PropTypes.objectOf(PropTypes.shape({
    required: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    minLength: PropTypes.number,
    maxLength: PropTypes.number,
    pattern: PropTypes.instanceOf(RegExp),
    patternMessage: PropTypes.string,
    email: PropTypes.bool,
    validate: PropTypes.func
  })),
  layout: PropTypes.oneOf(['vertical', 'horizontal', 'grid']),
  showProgress: PropTypes.bool,
  currentStep: PropTypes.number,
  totalSteps: PropTypes.number,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  formClassName: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  submitText: PropTypes.string,
  cancelText: PropTypes.string,
  showCancel: PropTypes.bool,
  onCancel: PropTypes.func,
  submitVariant: PropTypes.string,
  gridCols: PropTypes.string,
  spacing: PropTypes.string
};

export default AldrForm;