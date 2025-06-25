/**
 * AldrCard - Unified Card Component for Aldr Design System
 * 
 * A flexible card component that provides consistent styling for content
 * containers across all Aldr applications.
 * 
 * Features:
 * - Multiple variants (default, gradient, bordered, elevated)
 * - Configurable padding and spacing
 * - Header and footer sections with custom content
 * - Hover effects and interaction states
 * - Responsive design with mobile optimization
 * - Loading states and skeleton support
 * 
 * @version 1.0.0
 * @author Aldr Design System
 */

import React from 'react';
import PropTypes from 'prop-types';

const AldrCard = ({ 
  children,
  variant = "default",
  padding = "md",
  header = null,
  footer = null,
  title = null,
  subtitle = null,
  icon = null,
  iconColor = "text-aldr-teal",
  hover = false,
  clickable = false,
  loading = false,
  className = "",
  onClick = null,
  ...props
}) => {

  // Base card classes
  const baseClasses = [
    "bg-white rounded-lg",
    "transition-all duration-300",
    clickable || onClick ? "cursor-pointer" : "",
    loading ? "animate-pulse" : ""
  ];

  // Variant styles
  const variantClasses = {
    default: [
      "border border-gray-200 shadow-sm",
      hover ? "hover:shadow-md hover:border-gray-300" : ""
    ],
    gradient: [
      "bg-gradient-to-r from-aldr-teal to-aldr-purple text-white",
      "shadow-lg",
      hover ? "hover:shadow-xl hover:scale-105" : ""
    ],
    bordered: [
      "border-2 border-aldr-teal",
      hover ? "hover:border-aldr-purple hover:shadow-md" : ""
    ],
    elevated: [
      "shadow-lg border border-gray-100",
      hover ? "hover:shadow-xl hover:-translate-y-1" : ""
    ],
    outline: [
      "border-2 border-gray-200 bg-transparent",
      hover ? "hover:border-aldr-teal hover:bg-gray-50" : ""
    ],
    soft: [
      "bg-gray-50 border border-gray-100",
      hover ? "hover:bg-white hover:shadow-sm" : ""
    ]
  };

  // Padding styles
  const paddingClasses = {
    none: "",
    xs: "p-2",
    sm: "p-4", 
    md: "p-6",
    lg: "p-8",
    xl: "p-10"
  };

  // Build final className
  const finalClasses = [
    ...baseClasses,
    ...variantClasses[variant] || variantClasses.default,
    paddingClasses[padding] || paddingClasses.md,
    className
  ].filter(Boolean).join(" ");

  // Header content
  const headerContent = header || (title || subtitle || icon) ? (
    <div className="mb-4 pb-4 border-b border-gray-200">
      <div className="flex items-center">
        {icon && (
          <div className={`w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3 ${iconColor}`}>
            <i className={`fas ${icon} text-lg`}></i>
          </div>
        )}
        <div className="flex-1">
          {title && (
            <h3 className={`font-semibold ${variant === 'gradient' ? 'text-white' : 'text-gray-800'}`}>
              {title}
            </h3>
          )}
          {subtitle && (
            <p className={`text-sm ${variant === 'gradient' ? 'text-white text-opacity-80' : 'text-gray-600'} mt-1`}>
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  ) : null;

  // Loading skeleton
  const LoadingSkeleton = () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-4/6"></div>
      </div>
    </div>
  );

  // Card content
  const cardContent = (
    <>
      {headerContent}
      <div className={headerContent ? "" : "flex-1"}>
        {loading ? <LoadingSkeleton /> : children}
      </div>
      {footer && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          {footer}
        </div>
      )}
    </>
  );

  return (
    <div 
      className={finalClasses}
      onClick={onClick}
      {...props}
    >
      {cardContent}
    </div>
  );
};

AldrCard.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(['default', 'gradient', 'bordered', 'elevated', 'outline', 'soft']),
  padding: PropTypes.oneOf(['none', 'xs', 'sm', 'md', 'lg', 'xl']),
  header: PropTypes.node,
  footer: PropTypes.node,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  icon: PropTypes.string,
  iconColor: PropTypes.string,
  hover: PropTypes.bool,
  clickable: PropTypes.bool,
  loading: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func
};

export default AldrCard;