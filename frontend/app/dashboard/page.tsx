"use client"
import { Saarthi } from "./components/creative"
import { useRouter } from 'next/navigation';
import { apiLogout } from '@/lib/api';

export default function Home() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await apiLogout();
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
     
      <main className="overflow-hidden">  
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
          <Saarthi />

      </main>
     
  )
}
