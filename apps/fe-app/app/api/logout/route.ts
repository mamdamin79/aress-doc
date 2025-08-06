import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ message: 'خروج با موفقیت انجام شد!' });

  response.cookies.set('access_token', '', {
    httpOnly: true,
    path: '/',
    maxAge: 0,
  });

  return response;
}
