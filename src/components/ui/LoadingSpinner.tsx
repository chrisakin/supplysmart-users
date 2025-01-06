export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-2rem)] w-full">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500" />
    </div>
  );
}