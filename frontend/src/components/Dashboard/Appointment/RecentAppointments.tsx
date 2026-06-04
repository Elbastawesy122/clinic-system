const appointments = [
  {
    patient: "Ahmed",
    doctor: "Dr Sarah",
    status: "Confirmed",
  },
  {
    patient: "Ali",
    doctor: "Dr Karim",
    status: "Pending",
  },
  {
    patient: "Mona",
    doctor: "Dr Nada",
    status: "Cancelled",
  },
];

export function RecentAppointments() {
  return (
    <div
      className="bg-white rounded-3xl border p-6">
      <h2 className="text-xl font-bold mb-6">
        Recent Appointments
      </h2>
      <div className="space-y-4">
        {appointments.map(
          (appointment, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-b pb-4">
              <div>
                <h3 className="font-semibold">
                  {appointment.patient}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {appointment.doctor}
                </p>
              </div>
              <span className="text-sm">
                {appointment.status}
              </span>
            </div>
          )
        )}
      </div>
    </div>
  );
}