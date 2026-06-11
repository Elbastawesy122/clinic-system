import { CardSetupDoctorPassword } from "@/components/Auth/CardSetupDoctorPassword";

export default function SetupDoctorPasswordPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
            <div className="w-full max-w-md">
                <CardSetupDoctorPassword />
            </div>
        </div>
    );
}