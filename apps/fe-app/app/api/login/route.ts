import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { username, password, captcha, captchaUid } = await req.json();
  console.log(username, password, captcha, captchaUid);

  const params = new URLSearchParams({
    username,
    password,
  });
  const url = `${process.env.NEXT_PUBLIC_API_URL}/users/login?captchaUid=${captchaUid}&captcha=${encodeURIComponent(
    captcha,
  )}`;

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  });

  const data = await res.json();

  if (res.ok && data.access_token) {
    // Set cookie (secure, httpOnly, sameSite recommended)
    const response = NextResponse.json({
      success: true,
      access_token: data.access_token,
    });
    response.cookies.set('access_token', data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });
    return response;
  } else {
    return NextResponse.json(
      { error: data.message || 'Login failed' },
      { status: 401 },
    );
  }
}
