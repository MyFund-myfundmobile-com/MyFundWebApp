"use client";
import React, { useState, useEffect } from 'react';
import Title from '@/app/components/title';
import Subtitle from '@/app/components/subtitle';
import Section from '@/app/components/section';
import AccountCard from '@/app/components/accountCard';
import { Divider } from '@mui/material';
import BuyPropertyModal from './modals/buyPropertyModal';


const properties = [
  {
    image: '/images/amethyst.png',
    name: 'K&Q Hostels, FUNAAB',
    description: 'At Harmony Estate, opp. FUNAAB',
    availableUnits: 'Selfcon: 26 units',
    cost: 'N5,000,000/unit',
    roi: 'N450,000 p.a.',
  },
  {
    image: '/images/funaab.png',
    name: 'Amethyst Residences',
    description: 'Near Main Campus Gate',
    availableUnits: 'Selfcon: 10 units',
    cost: 'N4,500,000/unit',
    roi: 'N400,000 p.a.',
  },
  {
    image: '/images/myfundhostel.jpeg',
    name: 'MyFund Hostel',
    description: 'Behind the Cafeteria',
    availableUnits: 'Shared Room: 20 units',
    cost: 'N3,000,000/unit',
    roi: 'N350,000 p.a.',
  },
  {
    image: '/images/phase2.png',
    name: 'Phase 2 Hostels',
    description: 'Beside Sports Complex',
    availableUnits: 'Studio: 15 units',
    cost: 'N4,000,000/unit',
    roi: 'N380,000 p.a.',
  },
  {
    image: '/images/phase3.jpeg',
    name: 'Phase 3 Apartments',
    description: 'Engineering Block',
    availableUnits: '1 Bedroom: 18 units',
    cost: 'N5,500,000/unit',
    roi: 'N420,000 p.a.',
  },
  {
    image: '/images/phase4.png',
    name: 'Phase 4 Apartments',
    description: 'Sports Complex',
    availableUnits: 'Selfcon: 12 units',
    cost: 'N6,000,000/unit',
    roi: 'N500,000 p.a.',
  },
];

const BuyPropertiesPage = () => {

  const [selectedProperty, setSelectedProperty] = useState<{
    image: string;
    title: string;
    cost: number;
    earnings: number;
  } | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (property: {
    image: string;
    name: string;
    description: string;
    availableUnits: string;
    cost: string;
    roi: string;
  }) => {
    setSelectedProperty({
      image: property.image,
      title: property.name,
      cost: parseFloat(property.cost.replace('N', '').replace(/,/g, '')),
      earnings: parseFloat(property.roi.replace('N', '').replace(/,/g, '')),
    });
    setIsModalOpen(true);
  };
  

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="px-6 w-full animate-floatIn overflow-x-hidden">
      <Title>Own</Title>
      <Subtitle>Buy properties and earn lifetime rental income.</Subtitle>
      <div className="mb-8 mt-4">
        <img src="/images/ownership2.png" alt="Ownership" className="w-full h-auto rounded-lg" />
      </div>
      <Section>MY PROPERTIES</Section>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        {properties.map((property, index) => (
          <AccountCard
            key={index}
            icon="home-outline"
            label={property.name}
            rate={property.roi}
            currency="₦"
            amount={property.cost}
            buttonText="Buy Now"
            buttonIcon="home-outline"
            style={{ backgroundImage: 'url(/images/icb2.png)' }}
            isPropertyCard
            propertyDetails={{
              name: property.name,
              description: property.description,
              availableUnits: property.availableUnits,
              cost: property.cost,
              roi: property.roi,
            }}
            image={property.image}
            onButtonClick={() => handleOpenModal(property)}
          />
        ))}
      </div>
      <Divider className="my-4 bg-gray-100" style={{ marginTop: 20, marginBottom: 20 }} />
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-10">
        {/* Additional sections can be added here */}
      </div>

      {selectedProperty && (
        <BuyPropertyModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          property={selectedProperty}
        />
      )}

    </div>
  );
};

export default BuyPropertiesPage;
