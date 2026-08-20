export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] w-full gap-4">
      <div className="relative w-20 h-20">
        {/* Outer ring */}
        <div className="absolute inset-0 border-4 border-transparent border-t-violet-500 rounded-full animate-spin" />
        
        {/* Inner ring (spins opposite direction) */}
        <div className="absolute inset-2 border-4 border-transparent border-t-violet-300 rounded-full animate-spin [animation-direction:reverse] [animation-duration:0.8s]" />
        
        {/* Center book icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl">📚</span>
        </div>
      </div>
      
      <p className="text-sm font-medium text-gray-500 animate-pulse">
        Loading...
      </p>
    </div>
  );
}