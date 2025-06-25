/**
 * AldrLoading - Unified Loading Component for Aldr Design System
 * 
 * A flexible loading component that provides consistent loading states
 * and animations across all Aldr applications.
 * 
 * Features:
 * - Multiple loading variants (spinner, skeleton, pulse, dots)
 * - Configurable sizes and colors
 * - Overlay support for full-screen loading
 * - Custom loading messages and descriptions
 * - Responsive design with mobile optimization
 * - Accessibility support with proper ARIA labels
 * 
 * @version 1.0.0
 * @author Aldr Design System
 */

import React from 'react';
import PropTypes from 'prop-types';

const AldrLoading = ({ 
  variant = "spinner", // spinner, skeleton, pulse, dots, bars
  size = "md", // xs, sm, md, lg, xl
  color = "primary", // primary, secondary, white, gray
  overlay = false,
  fullScreen = false,
  message = null,
  description = null,
  className = "",
  duration = null, // For animations that support custom duration
  ...props
}) => {

  // Size configurations
  const sizeClasses = {
    spinner: {
      xs: "w-4 h-4",
      sm: "w-6 h-6", 
      md: "w-8 h-8",
      lg: "w-12 h-12",
      xl: "w-16 h-16"
    },
    dots: {
      xs: "w-2 h-2",
      sm: "w-3 h-3",
      md: "w-4 h-4", 
      lg: "w-5 h-5",
      xl: "w-6 h-6"
    },
    bars: {
      xs: "w-1 h-4",
      sm: "w-1 h-6",
      md: "w-1.5 h-8",
      lg: "w-2 h-10",
      xl: "w-2.5 h-12"
    }
  };

  // Color configurations
  const colorClasses = {
    primary: "text-aldr-teal",
    secondary: "text-aldr-purple",
    white: "text-white",
    gray: "text-gray-400"
  };

  // Spinner Component
  const Spinner = () => (
    <svg 
      className={`animate-spin ${sizeClasses.spinner[size]} ${colorClasses[color]}`}
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

  // Dots Component
  const Dots = () => (
    <div className="flex space-x-1">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`${sizeClasses.dots[size]} ${colorClasses[color]} rounded-full animate-pulse`}
          style={{
            animationDelay: `${i * 0.2}s`,
            animationDuration: duration || '1.4s'
          }}
        ></div>
      ))}
    </div>
  );

  // Bars Component
  const Bars = () => (
    <div className="flex items-end space-x-1">
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className={`${sizeClasses.bars[size]} bg-current ${colorClasses[color]} animate-pulse`}
          style={{
            animationDelay: `${i * 0.1}s`,
            animationDuration: duration || '1.2s'
          }}
        ></div>
      ))}
    </div>
  );

  // Pulse Component
  const Pulse = () => (
    <div className={`${sizeClasses.spinner[size]} ${colorClasses[color]} relative`}>
      <div className="absolute inset-0 rounded-full bg-current opacity-75 animate-ping"></div>
      <div className="relative rounded-full bg-current"></div>
    </div>
  );

  // Skeleton Components
  const SkeletonLine = ({ width = "w-full", height = "h-4" }) => (
    <div className={`${width} ${height} bg-gray-200 rounded animate-pulse`}></div>
  );

  const SkeletonCard = () => (
    <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
        <div className="flex-1 space-y-2">
          <SkeletonLine width="w-3/4" height="h-4" />
          <SkeletonLine width="w-1/2" height="h-3" />
        </div>
      </div>
      <div className="space-y-2">
        <SkeletonLine width="w-full" height="h-4" />
        <SkeletonLine width="w-5/6" height="h-4" />
        <SkeletonLine width="w-4/6" height="h-4" />
      </div>
    </div>
  );

  const SkeletonGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );

  const SkeletonList = () => (
    <div className="space-y-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex items-center space-x-4 p-4 bg-white rounded-lg border border-gray-200">
          <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="flex-1 space-y-2">
            <SkeletonLine width="w-3/4" height="h-4" />
            <SkeletonLine width="w-1/2" height="h-3" />
          </div>
          <div className="w-16 h-8 bg-gray-200 rounded animate-pulse"></div>
        </div>
      ))}
    </div>
  );

  // Get loading component based on variant
  const getLoadingComponent = () => {
    switch (variant) {
      case 'spinner':
        return <Spinner />;
      case 'dots':
        return <Dots />;
      case 'bars':
        return <Bars />;
      case 'pulse':
        return <Pulse />;
      case 'skeleton-card':
        return <SkeletonCard />;
      case 'skeleton-grid':
        return <SkeletonGrid />;
      case 'skeleton-list':
        return <SkeletonList />;
      case 'skeleton':
        return (
          <div className="space-y-4">
            <SkeletonLine width="w-3/4" height="h-6" />
            <SkeletonLine width="w-full" height="h-4" />
            <SkeletonLine width="w-5/6" height="h-4" />
            <SkeletonLine width="w-2/3" height="h-4" />
          </div>
        );
      default:
        return <Spinner />;
    }
  };

  // Container classes
  const containerClasses = [
    "flex flex-col items-center justify-center",
    fullScreen ? "fixed inset-0 z-50" : "",
    overlay ? "bg-black bg-opacity-50" : "",
    fullScreen && !overlay ? "bg-white" : "",
    className
  ].filter(Boolean).join(" ");

  // Content classes for centered loading
  const contentClasses = [
    "flex flex-col items-center justify-center space-y-4",
    variant.startsWith('skeleton') ? "w-full max-w-4xl mx-auto p-6" : "p-8"
  ].join(" ");

  return (
    <div 
      className={containerClasses}
      role="status"
      aria-live="polite"
      aria-label={message || "Loading..."}
      {...props}
    >
      <div className={contentClasses}>
        {/* Loading Animation */}
        {getLoadingComponent()}

        {/* Loading Message */}
        {message && (
          <div className="text-center space-y-2">
            <p className={`font-medium ${overlay || fullScreen ? 'text-white' : 'text-gray-800'}`}>
              {message}
            </p>
            {description && (
              <p className={`text-sm ${overlay || fullScreen ? 'text-gray-300' : 'text-gray-600'}`}>
                {description}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

AldrLoading.propTypes = {
  variant: PropTypes.oneOf([
    'spinner', 'skeleton', 'skeleton-card', 'skeleton-grid', 'skeleton-list', 
    'pulse', 'dots', 'bars'
  ]),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  color: PropTypes.oneOf(['primary', 'secondary', 'white', 'gray']),
  overlay: PropTypes.bool,
  fullScreen: PropTypes.bool,
  message: PropTypes.string,
  description: PropTypes.string,
  className: PropTypes.string,
  duration: PropTypes.string
};

export default AldrLoading;