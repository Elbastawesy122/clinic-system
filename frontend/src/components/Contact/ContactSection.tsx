
export const ContactSection = () => {
  return (
    <section className="relative bg-white py-24 px-6 md:px-16 lg:px-32 overflow-hidden">

      {/* Background blur */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_left,_#409D9B_0,_transparent_50%)]" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

        {/* LEFT SIDE - FORM + MAP */}
        <div className="space-y-10">

          {/* Contact Form */}
          <div className="bg-[#F7FFFC] p-8 rounded-2xl shadow-md">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Contact Us
            </h2>

            <form className="space-y-5">

              <input
                type="text"
                placeholder="Full Name"
                className="w-full p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#409D9B]"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#409D9B]"
              />

              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#409D9B]"
              />

              <textarea
                placeholder="Your Message"
                rows={5}
                className="w-full p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#409D9B]"
              />

              <button
                type="submit"
                className="w-full bg-[#409D9B] text-white py-4 rounded-xl font-semibold hover:bg-[#2f7f7d] transition"
              >
                Send Message
              </button>
            </form>
          </div>

        </div>

        {/* RIGHT SIDE - INFO */}
        <div className="space-y-10">

          {/* Working Hours */}
          <div className="bg-white shadow-md p-8 rounded-2xl border">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Working Hours
            </h3>

            <div className="space-y-2 text-gray-600">
              <p>Monday - Friday: 9:00 AM - 9:00 PM</p>
              <p>Saturday: 10:00 AM - 6:00 PM</p>
              <p>Sunday: Emergency Only</p>
            </div>
          </div>

          {/* Location */}
          <div className="bg-white shadow-md p-8 rounded-2xl border">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Location
            </h3>

            <p className="text-gray-600 leading-7">
              123 Eye Care Street, Medical District, Ahmedabad, India
            </p>
          </div>

          {/* Helpline */}
          <div className="bg-[#409D9B] text-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold mb-2">Helpline</h3>
            <p className="text-2xl font-black">+91 98765 43210</p>
            <p className="text-sm mt-2 opacity-90">
              24/7 Emergency Support Available
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};