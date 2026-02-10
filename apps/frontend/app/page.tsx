import Link from 'next/link';
import { SignUpButton, SignInButton } from '@clerk/nextjs';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gold-500 via-gold-400 to-gold-600">
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-center space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            AuruVal
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl">
            Secure Digital Portfolio for Your Gold Jewelry & Investments
          </p>
          
          <div className="flex gap-4 justify-center mt-8">
            <SignUpButton mode="modal">
              <button className="px-8 py-3 bg-white text-gold-600 font-semibold rounded-lg hover:bg-gray-100 transition">
                Get Started
              </button>
            </SignUpButton>
            
            <SignInButton mode="modal">
              <button className="px-8 py-3 bg-white/20 text-white font-semibold rounded-lg hover:bg-white/30 transition border border-white">
                Sign In
              </button>
            </SignInButton>
          </div>

          <p className="text-white/80 text-sm mt-12">
            Free • Secure • Open-Source
          </p>
        </div>
      </div>
    </main>
  );
}
