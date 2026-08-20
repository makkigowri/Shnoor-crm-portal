function EmptyState({ icon: Icon, title, description, actionLabel, onAction }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6">
      <div className="h-14 w-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
        <Icon size={26} />
      </div>
      <h3 className="text-base font-semibold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-500 mt-1 max-w-sm">{description}</p>
      {actionLabel && (
        <button
          onClick={onAction}
          className="mt-5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

export default EmptyState;
