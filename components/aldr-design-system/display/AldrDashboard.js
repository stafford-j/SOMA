/**
 * AldrDashboard - Unified Dashboard Component for Aldr Applications
 * 
 * A flexible dashboard component that provides consistent layout and functionality
 * for displaying vault statistics, recent activity, and key metrics.
 * 
 * Features:
 * - Configurable statistics cards with various layouts
 * - Recent activity feed with customizable items
 * - Action panels with quick access buttons
 * - Responsive grid layout that adapts to content
 * - Loading states and empty states
 * - Consistent Aldr branding and styling
 * 
 * @version 1.0.0
 * @author Aldr Design System
 */

import React from 'react';
import PropTypes from 'prop-types';
import AldrCard from './AldrCard';
import AldrButton from '../forms/AldrButton';

const AldrDashboard = ({ 
  title = "Dashboard",
  subtitle = null,
  statistics = [],
  recentActivity = [],
  quickActions = [],
  children = null,
  loading = false,
  emptyStateMessage = "No data available",
  emptyStateIcon = "fa-chart-line",
  className = "",
  gridCols = {
    stats: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    activity: "grid-cols-1 lg:grid-cols-2"
  }
}) => {

  // Default statistics data structure
  const defaultStats = [
    {
      id: 'total-records',
      title: 'Total Records',
      value: 0,
      icon: 'fa-file-alt',
      color: 'text-aldr-teal',
      bgColor: 'bg-teal-50',
      change: null
    }
  ];

  // Default quick actions
  const defaultQuickActions = [
    {
      id: 'add-record',
      title: 'Add Record',
      description: 'Add a new record to your vault',
      icon: 'fa-plus',
      action: () => alert('Add record functionality would open here'),
      variant: 'primary'
    }
  ];

  const stats = statistics.length > 0 ? statistics : defaultStats;
  const actions = quickActions.length > 0 ? quickActions : defaultQuickActions;

  // Statistics Card Component
  const StatCard = ({ stat }) => (
    <AldrCard 
      className="text-center"
      hover={true}
      padding="md"
    >
      <div className={`w-16 h-16 rounded-full ${stat.bgColor || 'bg-gray-100'} flex items-center justify-center mx-auto mb-4`}>
        <i className={`fas ${stat.icon} text-2xl ${stat.color || 'text-gray-600'}`}></i>
      </div>
      
      <div className="space-y-2">
        <div className="text-3xl font-bold text-gray-800">
          {loading ? (
            <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
          ) : (
            stat.value
          )}
        </div>
        
        <div className="text-sm font-medium text-gray-600">
          {stat.title}
        </div>
        
        {stat.change && (
          <div className={`text-xs flex items-center justify-center space-x-1 ${
            stat.change.type === 'increase' ? 'text-green-600' : 
            stat.change.type === 'decrease' ? 'text-red-600' : 'text-gray-600'
          }`}>
            <i className={`fas ${
              stat.change.type === 'increase' ? 'fa-arrow-up' : 
              stat.change.type === 'decrease' ? 'fa-arrow-down' : 'fa-minus'
            }`}></i>
            <span>{stat.change.value}</span>
          </div>
        )}
        
        {stat.description && (
          <div className="text-xs text-gray-500 mt-2">
            {stat.description}
          </div>
        )}
      </div>
    </AldrCard>
  );

  // Quick Action Card Component
  const ActionCard = ({ action }) => (
    <AldrCard 
      className="text-center"
      hover={true}
      clickable={true}
      onClick={action.action}
      padding="md"
    >
      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-aldr-teal to-aldr-purple flex items-center justify-center mx-auto mb-4">
        <i className={`fas ${action.icon} text-2xl text-white`}></i>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-800">{action.title}</h3>
        
        {action.description && (
          <p className="text-sm text-gray-600">{action.description}</p>
        )}
        
        <AldrButton
          variant={action.variant || 'primary'}
          size="sm"
          onClick={action.action}
          className="mt-3"
        >
          {action.buttonText || 'Get Started'}
        </AldrButton>
      </div>
    </AldrCard>
  );

  // Activity Item Component
  const ActivityItem = ({ item }) => (
    <div className="flex items-center space-x-4 p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
      <div className={`w-10 h-10 rounded-full ${item.bgColor || 'bg-gray-100'} flex items-center justify-center flex-shrink-0`}>
        <i className={`fas ${item.icon} ${item.color || 'text-gray-600'}`}></i>
      </div>
      
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-800 truncate">
          {item.title}
        </p>
        <p className="text-xs text-gray-500 truncate">
          {item.description}
        </p>
      </div>
      
      <div className="text-xs text-gray-400 flex-shrink-0">
        {item.timestamp}
      </div>
      
      {item.action && (
        <AldrButton
          variant="ghost"
          size="xs"
          onClick={item.action}
          icon="fa-chevron-right"
        />
      )}
    </div>
  );

  // Loading Skeleton
  const LoadingSkeleton = () => (
    <div className="space-y-6">
      {/* Stats skeleton */}
      <div className={`grid ${gridCols.stats} gap-6`}>
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 animate-pulse"></div>
            <div className="h-8 bg-gray-200 rounded mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          </div>
        ))}
      </div>
      
      {/* Activity skeleton */}
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center space-x-4 p-4 bg-white rounded-lg border border-gray-200">
            <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-3 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            </div>
            <div className="h-3 bg-gray-200 rounded w-16 animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  );

  // Empty State
  const EmptyState = () => (
    <div className="text-center py-12">
      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
        <i className={`fas ${emptyStateIcon} text-2xl text-gray-400`}></i>
      </div>
      <p className="text-lg text-gray-600 mb-2">Welcome to your dashboard</p>
      <p className="text-sm text-gray-500">{emptyStateMessage}</p>
    </div>
  );

  if (loading) {
    return (
      <div className={`space-y-6 ${className}`}>
        <LoadingSkeleton />
      </div>
    );
  }

  const hasData = stats.length > 0 || recentActivity.length > 0 || actions.length > 0;

  if (!hasData && !children) {
    return (
      <div className={`space-y-6 ${className}`}>
        <EmptyState />
      </div>
    );
  }

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Header */}
      {(title || subtitle) && (
        <div className="text-center lg:text-left">
          {title && (
            <h1 className="text-3xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'Lora, serif' }}>
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="text-lg text-gray-600">{subtitle}</p>
          )}
        </div>
      )}

      {/* Statistics Grid */}
      {stats.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Overview</h2>
          <div className={`grid ${gridCols.stats} gap-6`}>
            {stats.map((stat) => (
              <StatCard key={stat.id} stat={stat} />
            ))}
          </div>
        </section>
      )}

      {/* Quick Actions */}
      {actions.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <div className={`grid ${gridCols.activity} gap-6`}>
            {actions.map((action) => (
              <ActionCard key={action.id} action={action} />
            ))}
          </div>
        </section>
      )}

      {/* Recent Activity */}
      {recentActivity.length > 0 && (
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Recent Activity</h2>
            <AldrButton
              variant="ghost"
              size="sm"
              onClick={() => alert('View all activity would open here')}
            >
              View All
            </AldrButton>
          </div>
          <div className="space-y-3">
            {recentActivity.slice(0, 5).map((item, index) => (
              <ActivityItem key={item.id || index} item={item} />
            ))}
          </div>
        </section>
      )}

      {/* Custom Children Content */}
      {children && (
        <section>
          {children}
        </section>
      )}
    </div>
  );
};

AldrDashboard.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  statistics: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    icon: PropTypes.string.isRequired,
    color: PropTypes.string,
    bgColor: PropTypes.string,
    description: PropTypes.string,
    change: PropTypes.shape({
      type: PropTypes.oneOf(['increase', 'decrease', 'neutral']),
      value: PropTypes.string
    })
  })),
  recentActivity: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    timestamp: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    color: PropTypes.string,
    bgColor: PropTypes.string,
    action: PropTypes.func
  })),
  quickActions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    icon: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired,
    variant: PropTypes.string,
    buttonText: PropTypes.string
  })),
  children: PropTypes.node,
  loading: PropTypes.bool,
  emptyStateMessage: PropTypes.string,
  emptyStateIcon: PropTypes.string,
  className: PropTypes.string,
  gridCols: PropTypes.shape({
    stats: PropTypes.string,
    activity: PropTypes.string
  })
};

export default AldrDashboard;