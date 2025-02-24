import React from 'react';
import Image from 'next/image';

interface Card {
  id: number;
  title: string;
  imageUrl: string;
  services: string[];
}

const ImageCardSection = () => {
  const cards: Card[] = [
    {
      id: 1,
      title: "Basic Food Safety Food Service",
      services: [
        "Food Manufacturing",
        "Food Packaging",
        "Retail",
        "Logistics & Storage",
        "Animal Feed"
      ],
      imageUrl: "https://22527425.fs1.hubspotusercontent-na1.net/hubfs/22527425/food-safety-rubber-stamp-ink-76536808%201.png"
    },
    {
      id: 2,
      title: "PIC Advanced Training",
      services: [
        "Food Manufacturing",
        "Food & Beverage Industry",
        "Event Management",
        "Supermarkets",
        "Institutional Food Services"
      ],
      imageUrl: "https://22527425.fs1.hubspotusercontent-na1.net/hubfs/22527425/pngwing.com%20(1)%201.png"
    },
    {
      id: 3,
      title: "HACCP Training",
      services: [
        "Food Processing",
        "Hospitality",
        "Pharmaceuticals",
        "Meat & Poultry",
        "Retail"
      ],
      imageUrl: "https://22527425.fs1.hubspotusercontent-na1.net/hubfs/22527425/iso-22000-haccp-certification-500x500%202.png"
    },
    {
      id: 4,
      title: "FSMS - ISO 22000:2018",
      services: [
        "Packaging",
        "Food & Beverage Industry"
      ],
      imageUrl: "https://22527425.fs1.hubspotusercontent-na1.net/hubfs/22527425/6a99a7a98785268bc15b0a904fed71a4%201.png"
    },
    {
      id: 5,
      title: "Halal Training",
      services: [
        "Pharmaceuticals",
        "Food & Beverage Industry", 
        "Cosmetics",
        "Logistics",
        "Retail"
      ],
      imageUrl: "https://22527425.fs1.hubspotusercontent-na1.net/hubfs/22527425/halal-certification-products-500x500%202.png"
    },
    {
      id: 6,
      title: "BRCGS Training",
      services: [
        "Food Manufacturing",
        "Packaging"
      ],
      imageUrl: "https://22527425.fs1.hubspotusercontent-na1.net/hubfs/22527425/Group%2040%20(1).png"
    },
    {
      id: 7,
      title: "Advanced Food Safety Level 4",
      services: [
        "Food Processing",
        "Retail",
        "Training Organizations",
        "Logistics",
        "Regulatory Bodies",
        "Hospitality"
      ],
      imageUrl: "https://22527425.fs1.hubspotusercontent-na1.net/hubfs/22527425/Lovepik_com-450166348-Food%20Safety%20Icons%2c%20Safe%20Food%20Badge%2c%20Seal%2c%20Tag%2c%20Label%2c%20Sticker%2c%20Emblem%20Vector%20With%20Grunge%20Effect%201.png"
    },
    {
      id: 8,
      title: "Legionella Awareness",
      services: [
        "Hospitality",
        "Retail",
        "Government",
        "Construction",
        "Healthcare",
        "Manufacturing"
      ],
      imageUrl: "https://22527425.fs1.hubspotusercontent-na1.net/hubfs/22527425/Group%20455.png"
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {cards.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden p-6 
              border border-gray-100 backdrop-blur-sm backdrop-filter
              hover:border-blue-200 transition-all duration-300 
              hover:shadow-2xl hover:-translate-y-2
              animate-fadeIn group"
            >
              <div className={`relative h-[160px] sm:h-[180px] mb-6 
                ${card.id === 6 ? 'bg-transparent' : ''}`}>
                <div className="absolute inset-0 bg-blue-50/50 rounded-xl -z-10" />
                <Image
                  src={card.imageUrl}
                  alt={card.title}
                  fill
                  className={`object-contain ${card.id === 6 ? 'mix-blend-normal' : ''} 
                  transition-all duration-500 group-hover:scale-110 p-4`}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="text-center transform transition-all duration-300">
                <h3 className="text-base sm:text-lg font-bold mb-4 px-2 text-gray-800 
                  group-hover:text-blue-600 transition-colors duration-300">{card.title}</h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {card.services.map((service, index) => (
                    <span
                      key={index}
                      className="bg-blue-50 text-blue-600 px-4 py-2 text-xs rounded-full font-semibold 
                      hover:bg-blue-100 transition-all duration-300 hover:scale-105 
                      hover:shadow-md cursor-pointer"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImageCardSection; 