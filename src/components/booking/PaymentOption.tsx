
import { cn } from '@/lib/utils';

interface PaymentOptionProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  selected: boolean;
  onClick: () => void;
}

const PaymentOption = ({ title, description, icon, selected, onClick }: PaymentOptionProps) => {
  return (
    <div
      className={cn(
        "border rounded-xl p-4 cursor-pointer transition-all duration-200",
        selected 
          ? 'border-neatspin-500 bg-neatspin-50 shadow-sm' 
          : 'border-gray-200 hover:border-neatspin-300'
      )}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-4">
            {icon}
          </div>
          <div>
            <h4 className="font-medium text-gray-900">{title}</h4>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>
        <div 
          className={cn(
            "w-5 h-5 rounded-full border flex items-center justify-center",
            selected 
              ? 'border-neatspin-500 bg-neatspin-500' 
              : 'border-gray-300'
          )}
        >
          {selected && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="12" height="12">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentOption;
