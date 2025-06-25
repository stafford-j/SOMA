/**
 * AldrButton - Standardized Button Component for Aldr Design System
 * 
 * A flexible button component that provides consistent styling and behavior
 * across all Aldr applications with multiple variants and configurations.
 * 
 * Features:
 * - Multiple variants (primary, secondary, outline, white, danger, success)
 * - Configurable sizes (xs, sm, md, lg, xl)
 * - Icon support with proper spacing
 * - Loading states with spinner
 * - Disabled states with appropriate styling
 * - Mobile-optimized touch targets
 * 
 * @version 1.0.0
 * @author Aldr Design System
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const AldrButton = ({ 
  children,
  variant = "primary",
  size = "md",
  icon = null,
  iconPosition = "left",
  loading = false,
  disabled = false,
  fullWidth = false,
  className = "",
  onClick,
  type = "button",
  href = null,
  to = null,
  target = null,
  rel = null,
  ariaLabel = null,
  ...props
}) => {

  // Base button classes
  const baseClasses = [
    "inline-flex items-center justify-center",
    "font-semibold rounded-lg transition-all duration-300",
    "focus:outline-none focus:ring-2 focus:ring-offset-2",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    "touch-manipulation" // Improve mobile touch performance
  ];

  // Variant styles
  const variantClasses = {
    primary: [
      "bg-aldr-teal text-white",
      "hover:bg-aldr-purple hover:shadow-lg",
      "focus:ring-aldr-teal",
      "active:transform active:scale-95"
    ],
    secondary: [
      "bg-gray-200 text-gray-700",
      "hover:bg-gray-300 hover:shadow-md",
      "focus:ring-gray-300",
      "active:transform active:scale-95"
    ],
    outline: [
      "bg-transparent text-aldr-teal border-2 border-aldr-teal",
      "hover:bg-aldr-teal hover:text-white hover:shadow-md",
      "focus:ring-aldr-teal",
      "active:transform active:scale-95"
    ],
    white: [
      "bg-white text-aldr-teal",
      "hover:bg-opacity-90 hover:text-aldr-purple hover:shadow-md",
      "focus:ring-white",
      "active:transform active:scale-95"
    ],
    danger: [
      "bg-red-600 text-white",
      "hover:bg-red-700 hover:shadow-lg",
      "focus:ring-red-500",
      "active:transform active:scale-95"
    ],
    success: [
      "bg-green-600 text-white",
      "hover:bg-green-700 hover:shadow-lg",
      "focus:ring-green-500",
      "active:transform active:scale-95"
    ],
    ghost: [
      "bg-transparent text-gray-600",
      "hover:bg-gray-100 hover:text-gray-800",
      "focus:ring-gray-300",
      "active:transform active:scale-95"
    ],
    gradient: [
      "bg-gradient-to-r from-aldr-teal to-aldr-purple text-white",
      "hover:opacity-90 hover:shadow-lg",
      "focus:ring-aldr-teal",
      "active:transform active:scale-95"
    ]
  };

  // Size styles
  const sizeClasses = {
    xs: ["px-2 py-1 text-xs", "min-h-[32px]"],
    sm: ["px-3 py-1.5 text-sm", "min-h-[36px]"],
    md: ["px-4 py-2 text-base", "min-h-[44px]"], // 44px for mobile touch targets
    lg: ["px-6 py-3 text-lg", "min-h-[48px]"],
    xl: ["px-8 py-4 text-xl", "min-h-[52px]"]
  };

  // Icon spacing classes
  const iconSpacing = {
    xs: "gap-1",
    sm: "gap-1.5", 
    md: "gap-2",
    lg: "gap-2.5",
    xl: "gap-3"
  };

  // Loading spinner component
  const Spinner = () => (
    <svg 
      className="animate-spin h-4 w-4" 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24"
    >
      <circle 
        className="opacity-25" 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="currentColor" 
        strokeWidth="4"
      />
      <path 
        className="opacity-75" 
        fill="currentColor" 
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  // Build final className
  const finalClasses = [
    ...baseClasses,
    ...variantClasses[variant] || variantClasses.primary,
    ...sizeClasses[size] || sizeClasses.md,
    iconSpacing[size] || iconSpacing.md,
    fullWidth ? "w-full" : "",
    loading ? "cursor-wait" : "",
    className
  ].filter(Boolean).join(" ");

  // Content with icon and loading state
  const buttonContent = (
    <>
      {loading && <Spinner />}
      {!loading && icon && iconPosition === "left" && (
        <i className={`fas ${icon} flex-shrink-0`} />
      )}
      {children && (
        <span className={size === 'xs' || size === 'sm' ? "hidden sm:inline" : ""}>
          {children}
        </span>
      )}
      {!loading && icon && iconPosition === "right" && (
        <i className={`fas ${icon} flex-shrink-0`} />
      )}
    </>
  );

  // Common props
  const commonProps = {
    className: finalClasses,
    disabled: disabled || loading,
    "aria-label": ariaLabel,
    ...props
  };

  // Render as Link (React Router)
  if (to && !disabled && !loading) {
    return (
      <Link to={to} {...commonProps}>
        {buttonContent}
      </Link>
    );
  }

  // Render as anchor tag
  if (href && !disabled && !loading) {
    return (
      <a 
        href={href} 
        target={target}
        rel={rel || (target === "_blank" ? "noopener noreferrer" : undefined)}
        {...commonProps}
      >
        {buttonContent}
      </a>
    );
  }

  // Render as button
  return (
    <button 
      type={type}
      onClick={!disabled && !loading ? onClick : undefined}
      {...commonProps}
    >
      {buttonContent}
    </button>
  );
};

AldrButton.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf([
    'primary', 'secondary', 'outline', 'white', 'danger', 'success', 'ghost', 'gradient'
  ]),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  icon: PropTypes.string,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  href: PropTypes.string,
  to: PropTypes.string,
  target: PropTypes.string,
  rel: PropTypes.string,
  ariaLabel: PropTypes.string
};

export default AldrButton;