import Image from "next/image";

export const AuthLayout = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <section className="min-h-screen flex items-center justify-center bg-[#EBFFF5] px-6 py-30 relative overflow-hidden">
            <div className="relative z-10 w-full max-w-6xl bg-white rounded-[40px] shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
                {/* Left */}
                <div className="hidden lg:flex bg-[#409D9B] text-white p-16 flex-col justify-between relative overflow-hidden">
                    <div
                        className="absolute top-0 left-0 w-full h-full"/>

                    <div className="relative z-10">
                        <Image
                            src="/images/landing-page/logo.png"
                            alt="Logo"
                            width={180}
                            height={120}
                        />

                        <h2 className="text-5xl font-black leading-tight mt-10">
                            Modern Eye Care For Better Vision
                        </h2>

                        <p className="mt-6 text-lg leading-8 text-white/80">
                            Professional medical services with advanced
                            technology and experienced specialists.
                        </p>
                    </div>

                    <p className="relative z-10 text-white/70">
                        © 2026 Eye Care Clinic
                    </p>
                </div>

                {/* Right */}
                <div className="flex items-center justify-center p-4 md:p-14">
                    {children}
                </div>
            </div>
        </section>
    );
};