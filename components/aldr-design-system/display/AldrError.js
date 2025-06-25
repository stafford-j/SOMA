/**
 * AldrError - Error Display Component for Aldr Design System
 * 
 * A flexible error display component for handling and presenting errors
 * in a consistent, user-friendly manner across Aldr applications.
 * 
 * Features:
 * - Multiple error display variants (inline, card, banner, modal)
 * - Configurable severity levels (error, warning, info)
 * - Action button support for error resolution
 * - Dismissible errors with callback support
 * - Retry functionality for recoverable errors
 * - Accessibility support with proper ARIA roles
 * 
 * @version 1.0.0
 * @author Aldr Design System
 */

import React from 'react';
import PropTypes from 'prop-types';
import AldrButton from '../forms/AldrButton';

const AldrError = ({ 
  title = "Something went wrong",
  message = null,
  error = null,
  severity = "error", // error, warning, info
  variant = "card", // inline, card, banner, modal
  showIcon = true,
  dismissible = false,
  onDismiss = null,
  retryable = false,
  onRetry = null,
  actions = [],
  className = "",
  ...props
}) => {

  // Get icon based on severity
  const getIcon = () => {
    const iconMap = {
      error: 'fa-exclamation-circle',
      warning: 'fa-exclamation-triangle',
      info: 'fa-info-circle'
    };
    return iconMap[severity] || iconMap.error;
  };

  // Get color classes based on severity
  const getColorClasses = () => {
    const colorMap = {
      error: {
        bg: 'bg-red-50',
        border: 'border-red-200',
        icon: 'text-red-500',
        title: 'text-red-800',
        text: 'text-red-700'
      },
      warning: {
        bg: 'bg-yellow-50',
        border: 'border-yellow-200',
        icon: 'text-yellow-500',
        title: 'text-yellow-800',
        text: 'text-yellow-700'
      },
      info: {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        icon: 'text-blue-500',
        title: 'text-blue-800',
        text: 'text-blue-700'
      }
    };
    return colorMap[severity] || colorMap.error;
  };

  const colors = getColorClasses();

  // Get error message from various sources
  const getErrorMessage = () => {
    if (message) return message;
    if (error && error.message) return error.message;
    if (typeof error === 'string') return error;
    return 'An unexpected error occurred. Please try again.';
  };

  // Handle dismiss
  const handleDismiss = () => {
    if (onDismiss) {
      onDismiss();
    }
  };

  // Handle retry
  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    }
  };

  // Get variant-specific classes
  const getVariantClasses = () => {
    const variantMap = {
      inline: 'flex items-center space-x-2 text-sm',
      card: `rounded-lg border p-4 ${colors.bg} ${colors.border}`,
      banner: `border-l-4 p-4 ${colors.bg} ${colors.border}`,
      modal: `rounded-lg border p-6 bg-white shadow-lg ${colors.border}`
    };
    return variantMap[variant] || variantMap.card;
  };

  // Render based on variant
  const renderContent = () => {
    if (variant === 'inline') {
      return (
        <div className={`${getVariantClasses()} ${className}`} role="alert" {...props}>
          {showIcon && (
            <i className={`fas ${getIcon()} ${colors.icon} flex-shrink-0`}></i>
          )}
          <span className={colors.text}>{getErrorMessage()}</span>
          {dismissible && (
            <button
              onClick={handleDismiss}
              className={`ml-2 ${colors.text} hover:opacity-75 focus:outline-none`}
              aria-label="Dismiss error"
            >
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>
      );
    }

    return (
      <div className={`${getVariantClasses()} ${className}`} role="alert" {...props}>
        <div className="flex">
          <div className="flex-shrink-0">
            {showIcon && (
              <i className={`fas ${getIcon()} ${colors.icon} text-xl`}></i>
            )}
          </div>
          
          <div className="ml-3 flex-1">
            <h3 className={`text-sm font-medium ${colors.title}`}>
              {title}
            </h3>
            
            {getErrorMessage() && (
              <div className={`mt-2 text-sm ${colors.text}`}>
                <p>{getErrorMessage()}</p>
              </div>
            )}

            {/* Debug information in development */}
            {process.env.NODE_ENV === 'development' && error && error.stack && (
              <details className="mt-2">
                <summary className={`text-xs ${colors.text} cursor-pointer hover:underline`}>
                  Debug Information
                </summary>
                <pre className={`mt-1 text-xs ${colors.text} bg-white bg-opacity-50 p-2 rounded overflow-x-auto`}>
                  {error.stack}
                </pre>
              </details>
            )}

            {/* Action buttons */}
            {(retryable || actions.length > 0 || dismissible) && (
              <div className="mt-4 flex flex-wrap gap-2">
                {retryable && (
                  <AldrButton
                    variant="secondary"
                    size="sm"
                    onClick={handleRetry}
                    icon="fa-redo"
                  >
                    Retry
                  </AldrButton>
                )}
                
                {actions.map((action, index) => (
                  <AldrButton
                    key={index}
                    variant={action.variant || 'secondary'}
                    size="sm"
                    onClick={action.onClick}
                    icon={action.icon}
                  >
                    {action.label}
                  </AldrButton>
                ))}
                
                {dismissible && (
                  <AldrButton
                    variant="ghost"
                    size="sm"
                    onClick={handleDismiss}
                    icon="fa-times"
                  >
                    Dismiss
                  </AldrButton>
                )}
              </div>
            )}
          </div>

          {/* Dismiss button (top-right) */}
          {dismissible && variant !== 'inline' && (
            <div className="ml-auto pl-3">
              <button
                onClick={handleDismiss}
                className={`-mx-1.5 -my-1.5 rounded-md p-1.5 ${colors.text} hover:opacity-75 focus:outline-none`}
                aria-label="Dismiss error"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return renderContent();
};

AldrError.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Error),
    PropTypes.object
  ]),
  severity: PropTypes.oneOf(['error', 'warning', 'info']),
  variant: PropTypes.oneOf(['inline', 'card', 'banner', 'modal']),
  showIcon: PropTypes.bool,
  dismissible: PropTypes.bool,
  onDismiss: PropTypes.func,
  retryable: PropTypes.bool,
  onRetry: PropTypes.func,
  actions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    variant: PropTypes.string,
    icon: PropTypes.string
  })),
  className: PropTypes.string
};

export default AldrError;