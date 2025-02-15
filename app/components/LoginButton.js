// app/components/LoginPopup.js
"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useRef, useEffect } from "react";

export default function LoginPopup() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef(null);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <button
        onClick={togglePopup}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {session ? "Account" : "Login/Sign Up"}
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div ref={popupRef} className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">
              {session ? "Account" : "Login/Sign Up"}
            </h2>

            {session ? (
              <div>
                <p>Welcome, {session.user.name}!</p>
                <button
                  onClick={() => signOut()}
                  className="bg-red-500 text-white px-4 py-2 rounded mt-4"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div>
                <p>Please log in to continue.</p>
                <button
                  onClick={() => signIn("google")}
                  className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                >
                  Sign in with Google
                </button>
              </div>
            )}

            <button
              onClick={togglePopup}
              className="mt-4 text-gray-600 hover:text-gray-800"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
