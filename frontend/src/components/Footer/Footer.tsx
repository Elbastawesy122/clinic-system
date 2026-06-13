import Image from "next/image";

export const Footer = () => {
  const quickLinks = [
    { title: "Home", href: "#" },
    { title: "About", href: "#about" },
    { title: "Services", href: "#services" },
    { title: "Appointment", href: "#appointment" },
  ];

  const services = [
    "Eye Examination",
    "Vision Testing",
    "Laser Surgery",
    "Retina Treatment",
  ];

  const socialLinks = [
    { title: "Facebook", href: "#" },
    { title: "Instagram", href: "#" },
    { title: "Twitter", href: "#" },
  ];

  const contactInfo = [
    "📍 Mansoura, Egypt",
    "📞 +20 1026288096",
    "✉ info@eyecare.com",
  ];

  return (
    <footer
      id="contact"
      className="relative overflow-hidden bg-[#0F172A] text-white px-6 md:px-16 lg:px-32 pt-20 pb-8"
    >
      {/* Glow */}
      <div className="absolute top-0 left-0 w-87.5 h-87.5 bg-[#409D9B]/20 blur-3xl rounded-full" />

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* Logo + Description */}
        <div className="flex flex-col gap-6">
          <Image
            src="/images/logo.png"
            alt="Clinic Logo"
            width={150}
            height={100}
            className="object-contain"
          />

          <p className="text-gray-300 leading-7">
            We provide professional eye care services with
            modern technology and experienced specialists
            to ensure the best treatment for our patients.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-2xl font-bold mb-6">
            Quick Links
          </h3>

          <ul className="flex flex-col gap-4 text-gray-300">
            {quickLinks.map((link) => (
              <li key={link.title}>
                <a
                  href={link.href}
                  className="hover:text-[#409D9B] transition"
                >
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-2xl font-bold mb-6">
            Services
          </h3>

          <ul className="flex flex-col gap-4 text-gray-300">
            {services.map((service) => (
              <li key={service}>
                {service}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-2xl font-bold mb-6">
            Contact Us
          </h3>

          <div className="flex flex-col gap-4 text-gray-300">
            {contactInfo.map((item) => (
              <p key={item}>
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="relative z-10 border-t border-white/10 mt-16 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">

        <p className="text-gray-400 text-sm text-center">
          © 2026 Eye Care Clinic. All rights reserved.
        </p>

        <div className="flex items-center gap-4 text-gray-400">
          {socialLinks.map((social) => (
            <a
              key={social.title}
              href={social.href}
              className="hover:text-[#409D9B] transition"
            >
              {social.title}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};