import { Eye, HeartPulse, ScanEye, Stethoscope } from "lucide-react";
import Image from "next/image";

export const ServicesSection = () => {
    const services = [
        {
            icon: <Eye size={28} />,
            title: "Eye Checkup",
            desc: "Comprehensive eye examination using advanced diagnostic tools.",
        },
        {
            icon: <ScanEye size={28} />,
            title: "Laser Treatment",
            desc: "Modern laser procedures for vision correction and eye care.",
        },
        {
            icon: <HeartPulse size={28} />,
            title: "Emergency Care",
            desc: "24/7 emergency eye care support for critical cases.",
        },
        {
            icon: <Stethoscope size={28} />,
            title: "Consultation",
            desc: "Expert consultation with highly experienced ophthalmologists.",
        },
    ];

    return (
        <>
            <section className="py-24 px-6 md:px-16 lg:px-32 bg-[#F7FFFC] relative overflow-hidden">

                <div className="relative z-10 text-center mb-16">

                    <h2 className="text-4xl md:text-5xl font-black text-gray-800 mt-4">
                        What We Offer
                    </h2>

                    <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                        We provide advanced eye care services with modern technology and expert doctors.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

                    {services.map((service, i) => (
                        <div
                            key={i}
                            className="
              group bg-white p-8 rounded-2xl shadow-md
              hover:shadow-xl hover:-translate-y-2
              transition duration-300 border border-transparent
              hover:border-[#409D9B]
            "
                        >
                            {/* Icon */}
                            <div className="text-[#409D9B] mb-4 group-hover:scale-110 transition">
                                {service.icon}
                            </div>

                            {/* Title */}
                            <h3 className="text-xl font-bold text-gray-800 mb-3">
                                {service.title}
                            </h3>

                            {/* Desc */}
                            <p className="text-gray-600 leading-7 text-sm">
                                {service.desc}
                            </p>
                        </div>
                    ))}

                </div>
            </section>
            <div>
                <Image
                    src="/images/ServicesSection.png"
                    alt="Clinic Logo"
                    width={700}
                    height={700}
                    priority
                    className="object-contain w-full"
                />
            </div>
        </>
    );
};