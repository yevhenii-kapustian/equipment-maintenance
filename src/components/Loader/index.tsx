export default function PageLoader() {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-9999">
      <div className="relative w-24 h-24">
        
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-green-600 border-r-green-400 animate-spin"
             style={{ animationDuration: '1.5s' }}>
        </div>

        <div className="absolute inset-2 rounded-full border-4 border-transparent border-b-blue-500 border-l-blue-400 animate-spin"
             style={{ animationDuration: '2s', animationDirection: 'reverse' }}>
        </div>

        <div className="absolute inset-4 rounded-full bg-gradient-to-br from-green-500 to-blue-500 animate-pulse opacity-50">
        </div>

        <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-green-600 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-lg">
        </div>

      </div>

      <div className="absolute bottom-16 text-center">
        <p className="text-gray-600 text-sm font-medium">Завантаження...</p>
        <div className="flex gap-1 mt-3 justify-center">
          <span className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
          <span className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
          <span className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
        </div>
      </div>
    </div>
  );
}