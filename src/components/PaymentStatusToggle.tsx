'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { updatePaymentStatus } from '@/app/actions/updatePayment';

export default function PaymentStatusToggle({ id, currentStatus }: { id: string, currentStatus: string }) {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleToggle = async () => {
    setIsUpdating(true);
    const newStatus = currentStatus === 'Paid' ? 'Pending at Venue' : 'Paid';
    
    const result = await updatePaymentStatus(id, newStatus);
    
    if (result?.error) {
      alert(result.error);
    }
    setIsUpdating(false);
  };

  const isPaid = currentStatus === 'Paid';

  return (
    <button 
      onClick={handleToggle}
      disabled={isUpdating}
      className={`px-3 py-1 rounded-full text-xs font-bold border transition-colors flex items-center justify-center min-w-[120px] ${
        isPaid 
          ? 'bg-green-400/10 text-green-400 border-green-400/20 hover:bg-green-400/20' 
          : 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20 hover:bg-yellow-400/20'
      } disabled:opacity-50`}
    >
      {isUpdating ? <Loader2 className="w-4 h-4 animate-spin" /> : currentStatus}
    </button>
  );
}
