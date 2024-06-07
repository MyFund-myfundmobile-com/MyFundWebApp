// components/TopSaversSection.tsx

import React from 'react';
import Title from '@/app/components/title';
import Subtitle from '@/app/components/subtitle';
import { Divider, Tooltip } from '@mui/material';
import Section from '@/app/components/section';

interface Saver {
  id: number;
  firstName: string;
  profilePicture: string;
}

const TopSaversSection: React.FC = () => {
  const topSavers: Saver[] = [
    { id: 1, firstName: 'John', profilePicture: '/images/profile1.png' },
    { id: 2, firstName: 'Jane', profilePicture: '/images/profile1.png' },
    { id: 3, firstName: 'Alex', profilePicture: '/images/profile1.png' },
    { id: 4, firstName: 'Emily', profilePicture: '/images/profile1.png' },
    { id: 5, firstName: 'Michael', profilePicture: '/images/profile1.png' },
  ];

  return (
    <section className="border border-gray-300 bg-white p-4 rounded-lg w-full">
        <Section style={{marginTop: -1}}>TOP SAVERS THIS MONTH</Section>
      <div style={{ marginTop: 10 }}>
            <Subtitle style={{marginTop: -5, marginBottom: 1, fontSize: 13}}>My Position</Subtitle>
        <Title style={{ color: 'silver', marginTop: 0, fontSize: 70 }}>3RD   
          </Title>        
    </div>

    <Divider className="my-4 bg-silver mb-80" style={{ marginBottom: 30 }} />

      <ul className="space-y-3">
        {topSavers.map((saver, index) => (
          <li key={saver.id} className="flex items-center space-x-3">
            <span className="text-lg font-nexa" style={{textAlign: 'center', alignSelf: 'center'}}>{index + 1}</span>
            <img
              src={saver.profilePicture}
              alt={saver.firstName}
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="text-base font-product-sans">{saver.firstName}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TopSaversSection;
