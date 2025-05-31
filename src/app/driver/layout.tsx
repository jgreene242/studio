import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Car, LogOut, UserCircle, Settings, BarChart3, Bell } from 'lucide-react'; // BarChart3 for earnings

export default function DriverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Placeholder for driver auth status
  const isDriverAuthenticated = true; 

  return (
    <div className="flex min-h-screen">
      {isDriverAuthenticated && (
        <aside className="w-64 bg-slate-800 text-slate-100 p-4 flex flex-col space-y-4 border-r border-slate-700">
          <Link href="/driver/dashboard" className="flex items-center space-x-2 mb-6">
            <Car className="h-7 w-7 text-accent" />
            <span className="font-bold text-xl font-headline">Driver Portal</span>
          </Link>
          
          <nav className="flex-grow space-y-2">
            <Button variant="ghost" className="w-full justify-start text-slate-200 hover:bg-slate-700 hover:text-white" asChild>
                <Link href="/driver/dashboard"><BarChart3 className="mr-2 h-5 w-5" /> Dashboard</Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start text-slate-200 hover:bg-slate-700 hover:text-white" asChild>
                <Link href="/driver/rides"><Car className="mr-2 h-5 w-5" /> Ride Requests</Link>
            </Button>
             <Button variant="ghost" className="w-full justify-start text-slate-200 hover:bg-slate-700 hover:text-white" asChild>
                <Link href="/driver/earnings"><BarChart3 className="mr-2 h-5 w-5" /> Earnings</Link>
            </Button>
             <Button variant="ghost" className="w-full justify-start text-slate-200 hover:bg-slate-700 hover:text-white" asChild>
                <Link href="/driver/profile"><UserCircle className="mr-2 h-5 w-5" /> Profile</Link>
            </Button>
             <Button variant="ghost" className="w-full justify-start text-slate-200 hover:bg-slate-700 hover:text-white" asChild>
                <Link href="/driver/notifications"><Bell className="mr-2 h-5 w-5" /> Notifications</Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start text-slate-200 hover:bg-slate-700 hover:text-white" asChild>
                <Link href="/driver/settings"><Settings className="mr-2 h-5 w-5" /> Settings</Link>
            </Button>
          </nav>

          <div>
            <Button variant="ghost" className="w-full justify-start text-red-400 hover:bg-red-700 hover:text-white">
              <LogOut className="mr-2 h-5 w-5" /> Logout
            </Button>
          </div>
        </aside>
      )}
      <main className="flex-1 p-6 bg-background text-foreground">
        {!isDriverAuthenticated && (
            <div className="flex flex-col items-center justify-center h-full">
                <h1 className="text-2xl font-semibold mb-4">Driver Portal</h1>
                <p className="mb-4">Please log in or register to access the driver features.</p>
                <div className="flex gap-4">
                    <Button asChild><Link href="/driver/login">Login</Link></Button>
                    <Button variant="outline" asChild><Link href="/driver/onboarding">Register as Driver</Link></Button>
                </div>
            </div>
        )}
        {isDriverAuthenticated && children}
      </main>
    </div>
  );
}
