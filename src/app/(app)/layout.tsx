import MainHeader from "@/components/navigation/main-header";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <MainHeader />
      <main className="flex-1 container py-8">
        {children}
      </main>
      <footer className="border-t py-4">
        <div className="container text-center text-sm text-muted-foreground">
          DispatchNow &copy; {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
}
