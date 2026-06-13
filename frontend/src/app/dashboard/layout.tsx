import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/Dashboard/DashboardSidebar";
import { DashboardNavbar } from "@/components/Dashboard/DashboardNavbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <DashboardSidebar />
            <main className="w-full min-h-screen bg-[#f5fbfb]">
                <DashboardNavbar />
                <div className="p-6">
                    {children}
                </div>
            </main>
        </SidebarProvider>
    );
}