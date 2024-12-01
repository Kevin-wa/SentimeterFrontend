import Head from "next/head";
import { useRouter } from "next/router";

export default function SignIn() {
  const router = useRouter();

  const handleGoogleSignIn = () => {
    // Simulate sign-in logic (replace with actual authentication logic)
    const isSignedIn = true; // Replace with actual sign-in logic

    if (isSignedIn) {
      // Redirect to Home (index page) after successful sign-in
      router.push("/");
    } else {
      alert("Sign-in failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Head>
        <title>Sign In</title>
      </Head>
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md text-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-red-500 mb-4">Sentimeter</h1>

        {/* Sign-In Header */}
        <p className="text-lg font-medium text-gray-800 mb-6">Log in to your account</p>

        {/* Google Sign-In Button */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg mb-4 hover:bg-gray-100"
        >
          <img
            src="https://www.google.com/favicon.ico"
            alt="Google Logo"
            className="h-5 w-5 mr-2"
          />
          Continue with Google
        </button>
      </div>
    </div>
  );
}
