
interface BookingProgressProps {
  step: number;
}

const BookingProgress = ({ step }: BookingProgressProps) => {
  return (
    <div className="flex mb-6">
      <div 
        className={`flex-1 h-2 rounded-full ${
          step >= 1 ? 'bg-neatspin-500' : 'bg-gray-200'
        } transition-all duration-300`}
      />
      <div className="w-1" />
      <div 
        className={`flex-1 h-2 rounded-full ${
          step >= 2 ? 'bg-neatspin-500' : 'bg-gray-200'
        } transition-all duration-300`}
      />
      <div className="w-1" />
      <div 
        className={`flex-1 h-2 rounded-full ${
          step >= 3 ? 'bg-neatspin-500' : 'bg-gray-200'
        } transition-all duration-300`}
      />
      <div className="w-1" />
      <div 
        className={`flex-1 h-2 rounded-full ${
          step >= 4 ? 'bg-neatspin-500' : 'bg-gray-200'
        } transition-all duration-300`}
      />
    </div>
  );
};

export default BookingProgress;
