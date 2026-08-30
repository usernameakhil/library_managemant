import React from 'react';

const StatCard = ({ title, value, icon: Icon, colorClass, subtitle }) => {
  return (
    <div className="bg-white overflow-hidden shadow-sm hover:shadow-md border border-gray-100 rounded-2xl p-6 transition-all duration-300 transform hover:-translate-y-0.5">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">{title}</span>
          <div className="text-3xl font-extrabold text-gray-900 mt-2 tracking-tight">{value}</div>
          {subtitle && (
            <p className="text-xs text-gray-500 mt-1 font-medium bg-gray-50 inline-block px-2 py-0.5 rounded-md">
              {subtitle}
            </p>
          )}
        </div>
        <div className={`p-4 rounded-2xl flex items-center justify-center shadow-inner ${colorClass}`}>
          <Icon className="h-6 w-6" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
