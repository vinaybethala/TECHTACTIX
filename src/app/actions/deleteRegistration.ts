'use server';

import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function deleteRegistration(id: string) {
  const session = cookies().get('admin_session')?.value;
  
  if (!session || session !== 'authenticated') {
    return { error: 'Unauthorized' };
  }

  try {
    await prisma.registration.delete({
      where: { id }
    });
    
    revalidatePath('/dashboard');
    return { success: true };
  } catch (error: any) {
    console.error("Failed to delete registration:", error);
    return { error: 'Failed to delete registration' };
  }
}
