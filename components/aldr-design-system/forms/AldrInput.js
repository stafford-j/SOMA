/**
 * AldrInput - Standardized Input Component for Aldr Design System
 * 
 * A flexible input component that provides consistent styling and behavior
 * for form inputs across all Aldr applications.
 * 
 * Features:
 * - Multiple input types (text, email, password, number, tel, url, search)
 * - Built-in validation with error states
 * - Icon support (prefix and suffix)
 * - Loading states and disabled states
 * - Label and help text support
 * - Responsive design with mobile optimization
 * 
 * @version 1.0.0
 * @author Aldr Design System
 */

import React, { useState, forwardRef } from 'react';
import PropTypes from 'prop-types';

const AldrInput = forwardRef(({ 
  label = null,
  type = "text",
  placeholder = "",
  value = "",
  defaultValue = "",
  onChange = null,
  onBlur = null,
  onFocus = null,
  disabled = false,
  required = false,
  error = null,
  helpText = null,
  icon = null,
  iconPosition = "left",
  suffixIcon = null,
  loading = false,
  size = "md",
  fullWidth = true,
  className = "",
  inputClassName = "",
  labelClassName = "",
  id = null,
  name = null,
  autoComplete = null,
  maxLength = null,
  minLength = null,
  min = null,
  max = null,
  step = null,
  pattern = null,
  ...props
}, ref) => {
  
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Generate unique ID if not provided
  const inputId = id || `aldr-input-${Math.random().toString(36).substr(2, 9)}`;

  // Base input classes
  const baseInputClasses = [
    "block w-full rounded-lg border transition-all duration-200",
    "focus:outline-none focus:ring-2 focus:ring-offset-1",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50",
    "placeholder:text-gray-400"
  ];

  // Size classes
  const sizeClasses = {
    sm: ["px-3 py-2 text-sm", "min-h-[36px]"],
    md: ["px-4 py-3 text-base", "min-h-[44px]"], // 44px for mobile touch targets
    lg: ["px-5 py-4 text-lg", "min-h-[52px]"]
  };

  // State-based styling
  const getInputStateClasses = () => {
    if (error) {
      return [
        "border-red-300 bg-red-50",
        "focus:border-red-500 focus:ring-red-500",
        "text-red-900"
      ];
    }
    
    if (focused) {
      return [
        "border-aldr-teal bg-white",
        "focus:border-aldr-teal focus:ring-aldr-teal"
      ];
    }
    
    return [
      "border-gray-300 bg-white",
      "hover:border-gray-400",
      "focus:border-aldr-teal focus:ring-aldr-teal",
      "text-gray-900"
    ];
  };

  // Icon classes
  const iconClasses = "absolute top-1/2 transform -translate-y-1/2 text-gray-400";
  const leftIconClasses = `${iconClasses} left-3`;
  const rightIconClasses = `${iconClasses} right-3`;

  // Padding adjustments for icons
  const getPaddingClasses = () => {
    const basePadding = sizeClasses[size]?.[0] || sizeClasses.md[0];
    
    if (icon && iconPosition === "left") {
      return basePadding.replace("px-", "pl-10 pr-");
    }
    
    if (suffixIcon || type === "password") {
      return basePadding.replace("px-", "pl-").replace("px-", " pr-10");
    }
    
    if (icon && iconPosition === "left" && (suffixIcon || type === "password")) {
      return basePadding.replace("px-", "pl-10 pr-10");
    }
    
    return basePadding;
  };

  // Build final input className
  const finalInputClasses = [
    ...baseInputClasses,
    ...getInputStateClasses(),
    getPaddingClasses(),
    sizeClasses[size]?.[1] || sizeClasses.md[1],
    inputClassName
  ].filter(Boolean).join(" ");

  // Handle input changes
  const handleChange = (e) => {
    if (onChange) {
      onChange(e);
    }
  };

  const handleFocus = (e) => {
    setFocused(true);
    if (onFocus) {
      onFocus(e);
    }
  };

  const handleBlur = (e) => {
    setFocused(false);
    if (onBlur) {
      onBlur(e);
    }
  };

  // Password visibility toggle
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Determine actual input type
  const actualType = type === "password" && showPassword ? "text" : type;

  return (
    <div className={`${fullWidth ? 'w-full' : ''} ${className}`}>
      {/* Label */}
      {label && (
        <label 
          htmlFor={inputId}
          className={`block text-sm font-medium text-gray-700 mb-2 ${labelClassName}`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Input container */}
      <div className="relative">
        {/* Left icon */}
        {icon && iconPosition === "left" && (
          <i className={`fas ${icon} ${leftIconClasses}`}></i>
        )}

        {/* Loading spinner */}
        {loading && (
          <div className={rightIconClasses}>
            <svg className="animate-spin h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          </div>
        )}

        {/* Right icon or password toggle */}
        {!loading && type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className={`${rightIconClasses} hover:text-gray-600 focus:outline-none`}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
          </button>
        )}

        {!loading && type !== "password" && suffixIcon && (
          <i className={`fas ${suffixIcon} ${rightIconClasses}`}></i>
        )}

        {/* Input element */}
        <input
          ref={ref}
          id={inputId}
          name={name}
          type={actualType}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled || loading}
          required={required}
          autoComplete={autoComplete}
          maxLength={maxLength}
          minLength={minLength}
          min={min}
          max={max}
          step={step}
          pattern={pattern}
          className={finalInputClasses}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            [
              helpText && `${inputId}-help`,
              error && `${inputId}-error`
            ].filter(Boolean).join(' ') || undefined
          }
          {...props}
        />
      </div>

      {/* Help text */}
      {helpText && !error && (
        <p id={`${inputId}-help`} className="mt-2 text-sm text-gray-600">
          {helpText}
        </p>
      )}

      {/* Error message */}
      {error && (
        <p id={`${inputId}-error`} className="mt-2 text-sm text-red-600">
          <i className="fas fa-exclamation-circle mr-1"></i>
          {error}
        </p>
      )}
    </div>
  );
});

AldrInput.displayName = 'AldrInput';

AldrInput.propTypes = {
  label: PropTypes.string,
  type: PropTypes.oneOf(['text', 'email', 'password', 'number', 'tel', 'url', 'search', 'date', 'time', 'datetime-local']),
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  error: PropTypes.string,
  helpText: PropTypes.string,
  icon: PropTypes.string,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  suffixIcon: PropTypes.string,
  loading: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  fullWidth: PropTypes.bool,
  className: PropTypes.string,
  inputClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  autoComplete: PropTypes.string,
  maxLength: PropTypes.number,
  minLength: PropTypes.number,
  min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  step: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  pattern: PropTypes.string
};

export default AldrInput;