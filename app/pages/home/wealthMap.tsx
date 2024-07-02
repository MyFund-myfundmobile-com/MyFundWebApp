"use client";
import React from 'react';
import Section from '@/app/components/section';
import Title from '@/app/components/title';
import Subtitle from '@/app/components/subtitle';
import Image from 'next/image';

const WealthMapSection = () => {
  return (
    <section className="border border-gray-300 bg-white p-4 rounded-lg relative">
      <Section style={{marginTop: -1}}>MY FINANCIAL STATUS</Section>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr,5fr] gap-4 mt-4 font-karla">
        <div style={{ position: 'relative', marginTop: 10 }}>
            <Subtitle style={{marginTop: -5, marginBottom: 1, fontSize: 13}}>Stage 3</Subtitle>
        <Title style={{ color: 'silver', position: 'absolute', marginTop: 0 }}>Surplus   
          </Title>

        
        </div>
        <div>
          <Image width='240' height='240' src="/images/9steps3.png"  alt="Wealth Map" className="w-full h-auto rounded-lg object-cover" />
        </div>
      </div>
    </section>
  );
};

export default WealthMapSection;
