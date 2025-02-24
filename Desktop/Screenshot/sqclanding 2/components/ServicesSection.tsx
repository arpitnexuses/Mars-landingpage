import React from 'react';

const ServicesSection = () => {
  return (
    <section className="py-16 bg-gray-50 border-2 border-red-500" id="services">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Our services for the food and beverage sector
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            At SQC, we empower food and beverage businesses with expert food safety consultancy, 
            tailored training, and quality management solutions that meet global standards. 
            In hospitality, quality management is key—it ensures safety, consistency, and 
            exceptional guest experiences that build trust and loyalty.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection; 