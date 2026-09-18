'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginAdmin(password: string) {
  const adminPassword = process.env.ADMIN_PASSWORD || 'CSI@2444';
  
  if (password === adminPassword) {
    cookies().set('admin_session', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
    });
    return { success: true };
  }
  
  return { error: 'Invalid admin password' };
}

export async function logoutAdmin() {
  cookies().delete('admin_session');
  redirect('/admin');
}
