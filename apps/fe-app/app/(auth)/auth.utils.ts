export async function fetchToken(): Promise<string> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/token`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'password',
        username: 'test',
        password: 'test',
      }).toString(),
    },
  );

  if (!response.ok) {
    throw new Error('Failed to fetch access token');
  }

  const data = await response.json();

  return data.access_token;
}
