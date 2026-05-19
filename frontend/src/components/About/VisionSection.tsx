import Image from "next/image";

export const VisionSection = () => {
  return (
    
<section
  className="
    relative
    overflow-hidden
    min-h-screen
    flex items-center
    px-6 md:px-16 lg:px-32
    py-20
    bg-[#EBFFF5]
  "
>
  {/* Top Wave */}
  <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-0">
    <svg
      className="relative block w-full h-[120px]"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
    >
      <path
        fill="#ffffff"
        d="M0,160L80,149.3C160,139,320,117,480,128C640,139,800,181,960,181.3C1120,181,1280,139,1360,117.3L1440,96L1440,0L0,0Z"
      />
    </svg>
  </div>

  {/* Background */}
  <div
    className="
      absolute
      inset-0
      opacity-20
    "
  />

  <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">

    {/* Content */}
    <div className="flex flex-col gap-7">
      <span className="text-[#409D9B] font-bold tracking-[4px] uppercase">
        Improve Your Vision
      </span>

      <h2 className="text-4xl md:text-5xl font-black leading-tight text-gray-800">
        At The Best Eye Hospital, Ahmedabad
      </h2>

      <p className="text-gray-700 text-lg leading-9">
        We are a dedicated team of eye care professionals committed to
        providing our patients with the highest quality of care.
      </p>

      <p className="text-gray-700 text-lg leading-9">
        Our skilled and experienced doctors use the latest technologies
        and techniques to ensure that our patients receive the best
        possible care.
      </p>
    </div>

    {/* Image */}
    <div className="flex justify-center">
      <Image
        src="/images/landing-page/aboutSection2.png"
        alt="Vision Care"
        width={400}
        height={400}
        className="w-fit max-w-[550px] object-contain"
      />
    </div>

  </div>

  {/* Bottom Wave */}
  <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
    <svg
      className="relative block w-full h-[120px]"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
    >
      <path
        fill="#ffffff"
        d="M0,160L80,149.3C160,139,320,117,480,128C640,139,800,181,960,181.3C1120,181,1280,139,1360,117.3L1440,96L1440,320L0,320Z"
      />
    </svg>
  </div>

</section>
  );
};