
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProcessStepProps {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  delay?: number;
  isLast?: boolean;
}

const ProcessStep = ({
  number,
  title,
  description,
  icon,
  delay = 0,
  isLast = false
}: ProcessStepProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="flex flex-col md:flex-row items-start md:items-center gap-6 relative"
    >
      <div className="z-10">
        <div className="w-16 h-16 rounded-2xl bg-neatspin-100 flex items-center justify-center shadow-sm">
          {icon}
        </div>
      </div>

      {!isLast && (
        <div className="absolute left-8 top-16 bottom-0 w-[1px] bg-neatspin-100 z-0 hidden md:block" />
      )}

      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-full bg-neatspin-600 text-white flex items-center justify-center font-semibold text-sm shadow-sm">
            {number}
          </div>
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        </div>
        <p className="text-gray-600 ml-11">{description}</p>
      </div>
    </motion.div>
  );
};

export default ProcessStep;
