import Image from "next/image";

export const AboutHeroSection = () => {
  return (
    <section className="min-h-screen flex items-center px-6 md:px-16 lg:px-32 py-20 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center w-full">

        {/* Image */}
        <div className="flex justify-center">
          <Image
            src="/images/aboutSection.png"
            alt="Eye Care"
            width={700}
            height={700}
            className="w-full max-w-137.5 object-contain"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-7">
          <span className="text-[#409D9B] font-bold tracking-[4px] uppercase">
            Focus Eye Care & Surgery
          </span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-gray-800">
            Your Vision, Our Mission
          </h2>

          <p className="text-gray-600 text-lg leading-9">
            A specialized medical facility that provides diagnostic,
            therapeutic, and surgical services related to the eyes and vision.
          </p>

          <button className="w-fit bg-[#409D9B] text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:scale-105 transition-all duration-300 cursor-pointer">
            Book Today
          </button>
        </div>

      </div>
    </section>
  );
};