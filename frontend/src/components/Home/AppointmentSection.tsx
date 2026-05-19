import Image from "next/image";

export const AppointmentSection = () => {
  return (
    <section
      id="appointment"
      className="
        relative
        overflow-hidden
        px-6 md:px-16 lg:px-32
        py-20
      "
    >
      {/* Background Glow */}
      <div
        className="
          absolute
          top-0 right-0
          w-100
          h-100
          rounded-full
        "
      />

      <div
        className="
          relative z-10
          bg-white
          rounded-[40px]
          shadow-2xl
          px-8 md:px-16
          py-14
          flex flex-col lg:flex-row
          items-center justify-between
          gap-10
        "
      >
        {/* Left Side */}
        <div className="max-w-2xl">
          <span
            className="
              inline-block
              bg-[#EBFFF5]
              text-[#409D9B]
              font-semibold
              px-5 py-2
              rounded-full
              mb-6
            "
          >
            BOOK NOW
          </span>

          <h2
            className="
              text-4xl md:text-5xl
              font-black
              leading-tight
              text-gray-800
            "
          >
            Book an appointment today
          </h2>

          <p
            className="
              mt-6
              text-gray-600
              text-lg
              leading-8
            "
          >
            Schedule your visit with our professional eye care specialists and
            receive the best medical service using advanced technology and
            personalized treatment.
          </p>

          <div
            className="
            flex flex-col sm:flex-row
            gap-4
            w-full lg:w-auto mt-3
          "
          >
            <button
              className="
              bg-[#409D9B]
              text-white
              px-8 py-4
              rounded-2xl
              font-semibold
              text-lg
              shadow-lg
              hover:scale-105
              hover:shadow-xl
              transition-all
              duration-300
              cursor-pointer
            "
            >
              Book Appointment
            </button>

            <button className="border-2 border-[#409D9B] text-[#409D9B] px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-[#409D9B] hover:text-white transition-all duration-300 cursor-pointer">
              Contact Us
            </button>
          </div>
        </div>

        {/* Right Side */}
        <div>
          <Image
            src="/images/landing-page/Booking.png"
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
      </div>
    </section>
  );
};
