"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { DoctorDialog } from "@/components/Dashboard/Doctors/DoctorDialog";

export default function DoctorsPage() {
    const [
        open,
        setOpen,
    ] = useState(false);

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-black">
                        Doctors
                    </h1>

                    <p className="text-muted-foreground">
                        Manage clinic doctors
                    </p>
                </div>
                <Button
                    onClick={() => setOpen(true)}
                >
                    <Plus />
                    Add Doctor
                </Button>
            </div>
            {/* DataTable */}
            <DoctorDialog
                open={open}
                setOpen={setOpen}
            />
        </div>
    );
}