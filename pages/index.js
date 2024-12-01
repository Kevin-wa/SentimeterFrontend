import Head from 'next/head';
import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleLogin = () => {
    const currentUrl = window.location.href;
    window.location.href = `${process.env.NEXT_PUBLIC_FLASK_BACKEND_URL}/api/auth/login?redirect_uri=${encodeURIComponent(currentUrl)}`;
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    setIsAuthenticated(false);
    setUser(null);
    router.push('/');
  };

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);

        if (decodedToken.exp < currentTime) {
          console.warn("Token has expired");
          handleLogout();
        } else {
          setIsAuthenticated(true);
          setUser(decodedToken.sub);
        }
      } catch (error) {
        console.error("Failed to decode token", error);
        handleLogout();
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get('jwt');
    if (token) {
      try {
        localStorage.setItem('auth_token', token);
        const decodedToken = jwtDecode(token);
        console.log(decodedToken);
        const currentTime = Math.floor(Date.now() / 1000);
        console.log(decodedToken.exp + " " + currentTime);

        if (decodedToken.exp < currentTime) {
          alert("Token expired. Please log in again.");
          handleLogout();
        } else {
          setIsAuthenticated(true);
          setUser(decodedToken.sub);
          router.push('/dashboard');
        }
      } catch (error) {
        console.error("Invalid or expired token", error);
        alert("Failed to authenticate. Please try logging in.");
        handleLogout();
      }
    }
  }, [router]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Head>
        <title>Home</title>
      </Head>

      {/* Navigation Bar */}
      <nav className="flex items-center justify-between p-4 bg-blue-600 text-white">
        <div className="font-bold text-xl">
          <Link href="/">App Logo</Link>
        </div>
        <div>
          {!isAuthenticated ? (
            <button
              onClick={handleLogin}
              className="bg-yellow-500 px-4 py-2 rounded-full hover:bg-yellow-400"
            >
              Login with Google
            </button>
          ) : (
            <div>
              <h2>Welcome, {user ? user.name : 'User'}</h2>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded-full hover:bg-red-400"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Main Section */}
      <main className="flex flex-col items-center justify-center flex-grow py-10">
        <h1 className="text-3xl font-bold mb-6">Learn More About Journal App</h1>
        <p className="text-gray-700 max-w-3xl text-center mb-6">
          Our app allows you to record your daily thoughts, track your moods, and reflect on your
          life. Over time, the app analyzes your journal entries and provides insights about your
          emotional journey. By writing regularly, you can gain a deeper understanding of yourself
          and your feelings.
        </p>
        <p className="text-gray-700 max-w-3xl text-center mb-6">
          With features like mood tracking, secure storage, and customizable options, Journal App
          makes journaling easy and meaningful.
        </p>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-500">
          Get Started
        </button>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4">
        <p>&copy; 2024 Journal App. All rights reserved.</p>
      </footer>
    </div>
  );
}
