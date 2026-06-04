"use client";

import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { doctors } from "@/data/doctors";
import { useCreateAppointment } from "@/hooks/appointments/use-create-appointment";

export const AppointmentDialog = () => {
    const mutation = useCreateAppointment();
    const [doctor, setDoctor] = useState("");
    const [clinic, setClinic] = useState("");
    const [date, setDate] = useState<Date>();
    const [time, setTime] = useState("");
    const handleCreate = () => {
        mutation.mutate({
            doctor,
            clinic,
            date:
                format(
                    date!,
                    "yyyy-MM-dd"
                ),
            time,
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    Create Appointment
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        New Appointment
                    </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <Select onValueChange={setDoctor}>
                        <SelectTrigger>
                            <SelectValue placeholder="Doctor" />
                        </SelectTrigger>
                        <SelectContent>
                            {doctors.map(
                                (doctor) => (
                                    <SelectItem
                                        key={doctor}
                                        value={doctor}
                                    >
                                        {doctor}
                                    </SelectItem>

                                )
                            )}
                        </SelectContent>
                    </Select>
                    <Select onValueChange={setClinic}>
                        <SelectTrigger>
                            <SelectValue placeholder="Clinic" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Eye Clinic">
                                Eye Clinic
                            </SelectItem>
                            <SelectItem value="Dental Clinic">
                                Dental Clinic
                            </SelectItem>
                        </SelectContent>
                    </Select>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className="w-full justify-start"
                            >
                                <CalendarIcon />
                                {date
                                    ? format(
                                        date,
                                        "PPP"
                                    )
                                    : "Pick Date"}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={
                                    setDate
                                }
                            />
                        </PopoverContent>
                    </Popover>
                    <Select onValueChange={setTime}>
                        <SelectTrigger>
                            <SelectValue
                                placeholder="Time"
                            />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="10:00 AM">
                                10:00 AM
                            </SelectItem>
                            <SelectItem value="11:00 AM">
                                11:00 AM
                            </SelectItem>
                            <SelectItem value="12:00 PM">
                                12:00 PM
                            </SelectItem>
                        </SelectContent>
                    </Select>
                    <Button
                        className="w-full"
                        onClick={
                            handleCreate
                        }
                    >
                        Create
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};