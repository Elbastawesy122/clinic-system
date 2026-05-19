export const ServicesSection = () => {
  const services = [
    "Eye Examination",
    "Vision Testing",
    "Laser Eye Surgery",
    "Retina Treatment",
    "Contact Lens Care",
    "Cataract Surgery",
  ];

  return (
    <section
      id="services"
      className="bg-[#EBFFF5] px-6 md:px-16 lg:px-32 py-24"
    >
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mt-4">
          Our Medical Services
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <div
            key={service}
            className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-lg transition"
          >
            <h3 className="text-2xl font-bold text-[#409D9B] mb-4">
              {service}
            </h3>

            <p className="text-gray-600 leading-7">
              Professional medical care using the latest technologies and
              treatment methods.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};