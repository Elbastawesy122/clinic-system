"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { columns } from "@/components/Dashboard/Appointment/AppointmentColumns";
import { useDoctors } from "@/hooks/doctors/use-doctors";
import { Input } from "../../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DataTable } from "@/components/shared/DataTable";
import { DoctorDialog } from "./DoctorDialog";

export const DoctorCard = () => {

    const {
        data,
        isLoading,
    } = useDoctors();

    return (
        <SidebarProvider>
            <main className="w-full min-h-screen bg-[#f6fbfb] p-6">
                <div>
                    <h1 className="text-4xl font-black text-gray-800">
                        Doctors
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Manage clinic
                        Doctors
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
                        <DoctorDialog
                            open= {}
                        setOpen= {}
                        />
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
