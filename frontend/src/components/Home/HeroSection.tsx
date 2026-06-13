import Image from "next/image";

export const HeroSection = () => {
  return (
    <section className="bg-[#EBFFF5] min-h-[calc(100vh-90px)] flex items-center px-6 md:px-16 lg:px-32 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center w-full">
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
            Where clear vision meets compassionate care.
          </h1>

          <p className="text-gray-600 text-lg leading-8 max-w-xl">
            A specialized medical facility that provides diagnostic,
            therapeutic, and surgical services related to the eyes and
            vision.
          </p>

          <div className="flex gap-4 mt-2">
            <button className="bg-[#409D9B] text-white px-8 py-3 rounded-full font-semibold hover:opacity-90 transition cursor-pointer">
              Book Appointment
            </button>

            <button className="border-2 border-[#409D9B] text-[#409D9B] px-8 py-3 rounded-full font-semibold hover:bg-[#409D9B] hover:text-white transition cursor-pointer">
              Learn More
            </button>
          </div>
        </div>

        <div className="flex justify-center">
          <Image
            src="/images/doctor-frame.png"
            alt="Doctor"
            width={700}
            height={700}
            className="w-full max-w-150 h-auto object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
};