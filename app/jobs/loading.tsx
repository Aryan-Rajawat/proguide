export default function Loading() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="h-10 bg-gray-200 rounded w-1/3 animate-pulse mb-2" />
        <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
      </div>

      {/* Search */}
      <div className="h-10 bg-gray-200 rounded animate-pulse" />

      {/* Jobs List */}
      <div className="space-y-4">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="p-6 border border-gray-200 rounded-lg space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex-1 space-y-2">
                <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse" />
              </div>
              <div className="h-5 w-5 bg-gray-200 rounded animate-pulse" />
            </div>
            
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-4 bg-gray-200 rounded animate-pulse" />
              ))}
            </div>

            <div className="flex gap-2">
              <div className="h-6 bg-gray-200 rounded w-16 animate-pulse" />
              <div className="h-6 bg-gray-200 rounded w-16 animate-pulse" />
              <div className="h-6 bg-gray-200 rounded w-16 animate-pulse" />
            </div>

            <div className="h-10 bg-gray-200 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  )
}
