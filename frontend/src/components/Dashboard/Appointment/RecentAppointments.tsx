"use client";

import { useAppointments } from "@/hooks/appointments/useAppointments";
import { Appointment } from "@/types/appointment.types";

export function RecentAppointments() {
  const { data, isLoading } = useAppointments(1, "");

  const appointments = data?.appointments?.slice(0, 5) || [];

  return (
    <div className="bg-white rounded-3xl border p-6">
      <h2 className="text-xl font-bold mb-6">Recent Appointments</h2>

      <div className="space-y-4">
        {isLoading && <p>Loading...</p>}

        {!isLoading &&
          appointments.map((appointment: Appointment) => (
            <div
              key={appointment._id}
              className="flex items-center justify-between border-b pb-4"
            >
              <div>
                <h3 className="font-semibold">
                  {appointment.patient?.name}
                </h3>

                <p className="text-sm text-muted-foreground">
                  {appointment.doctor.user.name}
                </p>
              </div>

              <span className="text-sm">{appointment.status}</span>
            </div>
          ))}
      </div>
    </div>
  );
}