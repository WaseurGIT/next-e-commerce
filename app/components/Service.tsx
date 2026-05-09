import React from "react";
import { Truck, Shield, RotateCcw } from "lucide-react";

const Service = () => {
  const services = [
    {
      icon: Truck,
      title: "Free Global Shipping",
      description:
        "Complimentary express shipping on all orders over $250. Fully insured.",
    },
    {
      icon: Shield,
      title: "Secure Payment",
      description:
        "Military-grade encryption for all transactions. Your security is our priority.",
    },
    {
      icon: RotateCcw,
      title: "30-Day Returns",
      description:
        "Not perfectly satisfied? We offer hassle-free returns within 30 days.",
    },
  ];

  return (
    <section className="py-8 md:py-12 lg:py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center md:items-start text-center md:text-left p-4 sm:p-6 rounded-lg hover:shadow-lg transition-shadow duration-300"
              >
                <div className="mb-4 p-3 bg-blue-50 rounded-full">
                  <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Service;
