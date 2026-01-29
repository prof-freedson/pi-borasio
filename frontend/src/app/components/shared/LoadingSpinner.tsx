interface LoadingSpinnerProps {
  text?: string;
}

export default function LoadingSpinner({ text = "Carregando..." }: LoadingSpinnerProps) {
  return (
    <div className="text-center py-8">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#004d2b] mx-auto"></div>
      <p className="mt-4 text-gray-600">{text}</p>
    </div>
  );
}
