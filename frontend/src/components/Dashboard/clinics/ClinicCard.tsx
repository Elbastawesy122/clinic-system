import { Clinic } from "@/types/clinic.types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import { EditClinicDialog } from "./EditClinicDialog";
import { DeleteClinicDialog } from "./DeleteClinicDialog";
import { ClinicViewDialog } from "./ClinicViewDialog";
import { useToggleClinicStatus } from "@/hooks/clinics/use-toggle-clinic-status";

export function ClinicCard({ clinic }: { clinic: Clinic }) {
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [viewOpen, setViewOpen] = useState(false);
    const toggleStatus = useToggleClinicStatus();
    const isActive = clinic?.isActive;

    return (
        <>
            <Card className="p-4 space-y-3 hover:shadow-lg transition">
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-lg">{clinic.name}</h2>
                    {clinic && (
                        <div className="flex items-center gap-2">
                            <span className="text-xs">
                                {isActive ? "Active" : "Inactive"}
                            </span>

                            <button
                                type="button"
                                aria-label={isActive ? "Deactivate clinic" : "Activate clinic"}
                                onClick={() => toggleStatus.mutate(clinic._id)}
                                className={`w-10 h-5 flex items-center rounded-full p-1 transition ${clinic?.isActive ? "bg-green-500" : "bg-gray-300"
                                    }`}
                            >
                                <div
                                    className={`w-4 h-4 bg-white rounded-full shadow transform transition ${isActive ? "translate-x-5" : ""
                                        }`}
                                />
                            </button>
                        </div>
                    )}
                </div>

                <p className="text-sm text-gray-500 line-clamp-2">
                    {clinic.description}
                </p>

                <div className="flex gap-2 pt-2 flex-wrap">
                    <Button size="sm" variant="outline" onClick={() => setViewOpen(true)}>
                        View
                    </Button>

                    <Button size="sm" onClick={() => setEditOpen(true)}>
                        Edit
                    </Button>

                    <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => setDeleteOpen(true)}
                    >
                        Delete
                    </Button>
                </div>
            </Card>

            {/* Modals */}
            <EditClinicDialog
                open={editOpen}
                setOpen={setEditOpen}
                clinic={clinic}
            />

            <DeleteClinicDialog
                open={deleteOpen}
                setOpen={setDeleteOpen}
                clinicId={clinic._id}
            />

            <ClinicViewDialog
                open={viewOpen}
                setOpen={setViewOpen}
                clinic={clinic}
            />
        </>
    );
}