'use server';

import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function updatePaymentStatus(id: string, newStatus: string) {
  const session = cookies().get('admin_session')?.value;
  
  if (!session || session !== 'authenticated') {
    return { error: 'Unauthorized' };
  }

  try {
    await prisma.registration.update({
      where: { id },
      data: { paymentStatus: newStatus }
    });
    
    revalidatePath('/dashboard');
    return { success: true };
  } catch (error: any) {
    console.error("Failed to update payment status:", error);
    return { error: 'Failed to update payment status' };
  }
}
