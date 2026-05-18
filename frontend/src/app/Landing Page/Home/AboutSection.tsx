import Image from "next/image";

export const AboutSection = () => {
  return (
    <section
      id="about"
      className="px-6 md:px-16 lg:px-32 py-16 md:py-24 bg-white"
    >
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">

        {/* Image */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <Image
            src="/images/landing-page/about.png"
            alt="About Clinic"
            width={600}
            height={500}
            className="
              w-full max-w-125
              h-auto
              object-cover
              rounded-3xl
              shadow-lg
            "
          />
        </div>

        {/* Content */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6">

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-center lg:text-left">
            We provide modern eye care with advanced technology.
          </h2>

          <p className="text-gray-600 leading-7 text-base md:text-lg text-center lg:text-left">
            Our clinic offers comprehensive eye examinations, surgeries,
            treatment plans, and personalized care from highly qualified
            specialists.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            <div className="bg-[#EBFFF5] p-4 md:p-6 rounded-2xl text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-[#409D9B]">
                15+
              </h3>
              <p className="text-gray-600 mt-1 md:mt-2 text-sm md:text-base">
                Years Experience
              </p>
            </div>

            <div className="bg-[#EBFFF5] p-4 md:p-6 rounded-2xl text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-[#409D9B]">
                10K+
              </h3>
              <p className="text-gray-600 mt-1 md:mt-2 text-sm md:text-base">
                Happy Patients
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};