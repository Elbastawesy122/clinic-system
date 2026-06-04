"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { columns } from "@/components/Dashboard/Appointment/AppointmentColumns";
import { AppointmentDialog } from "@/components/Dashboard/Appointment/AppointmentDialog";
import { useAppointments } from "@/hooks/appointments/use-appointments";
import { Input } from "../../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DataTable } from "@/components/shared/DataTable";

export const AppointmentCard = () => {

    const {
        data,
        isLoading,
    } = useAppointments();

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
                    <div className="flex justify-between items-center mb-5">
                        <div className="flex justify-between items-center gap-6">
                            <Input
                                placeholder="Search patient..."
                            />
                            <Select>
                                <SelectTrigger>
                                    <SelectValue
                                        placeholder="Status"
                                    />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="Pending">
                                        Pending
                                    </SelectItem>

                                    <SelectItem value="Confirmed">
                                        Confirmed
                                    </SelectItem>

                                    <SelectItem value="Cancelled">
                                        Cancelled
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <AppointmentDialog />
                    </div>
                    <DataTable
                        columns={columns}
                        data={data || []}
                    />
                </div>
            </main>
        </SidebarProvider>
    )
}
