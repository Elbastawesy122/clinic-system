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
            <Card
                className="
          p-5 space-y-4
          rounded-2xl
          border
          hover:shadow-xl
          transition-all
          cursor-pointer
          hover:-translate-y-1
        "
            >
                {/* HEADER */}
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="font-bold text-lg text-gray-900">
                            {clinic.name}
                        </h2>

                        <p className="text-xs text-muted-foreground mt-1">
                            {clinic.location}
                        </p>
                    </div>

                    {/* STATUS TOGGLE (UNCHANGED) */}
                    <div className="flex items-center gap-3">
                        {clinic && (
                            <div className="flex items-center gap-2">
                                <span className="text-xs">
                                    {isActive ? "Active" : "Inactive"}
                                </span>

                                <button
                                    type="button"
                                    aria-label={isActive ? "Deactivate clinic" : "Activate clinic"}
                                    onClick={() => toggleStatus.mutate(clinic._id)}
                                    className={`w-10 h-5 flex items-center rounded-full p-1 transition ${clinic?.isActive ? "bg-green-500" : "bg-gray-300 cursor-pointer"}`}
                                >
                                    <div
                                        className={`w-4 h-4 bg-white rounded-full shadow transform transition ${isActive ? "translate-x-5" : ""}`}
                                    />
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* DESCRIPTION */}
                <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                    {clinic.description}
                </p>

                {/* ACTIONS - FULL WIDTH 3 BUTTONS */}
                <div className="grid grid-cols-3 gap-2 pt-2">
                    <Button
                        onClick={() => setViewOpen(true)}
                        variant="outline"
                        className="w-full rounded-xl cursor-pointer"
                    >
                        View
                    </Button>

                    <Button
                        onClick={() => setEditOpen(true)}
                        className="w-full rounded-xl bg-[#409D9B] hover:bg-[#358a88] cursor-pointer"
                    >
                        Edit
                    </Button>

                    <Button
                        onClick={() => setDeleteOpen(true)}
                        variant="destructive"
                        className="w-full rounded-xl cursor-pointer"
                    >
                        Delete
                    </Button>
                </div>
            </Card>

            {/* MODALS */}
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