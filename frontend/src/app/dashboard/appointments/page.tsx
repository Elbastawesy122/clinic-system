import { SidebarProvider } from "@/components/ui/sidebar";
import { AppointmentsTable } from "@/components/Dashboard/AppointmentsTable";
import { columns } from "@/components/Dashboard/AppointmentColumns";
import { appointments } from "@/data/appointments";

export default function AppointmentsPage() {
    return (
        <SidebarProvider>
            <main className="w-full min-h-screen bg-[#f6fbfb] p-6">
                <div>
                    <h1 className="text-4xl font-black text-gray-800">
                        Appointments
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Manage clinic
                        appointments
                    </p>
                </div>
                <div className="mt-8">
                    <AppointmentsTable
                        columns={columns}
                        data={appointments}
                    />
                </div>
            </main>
        </SidebarProvider>
    );
}