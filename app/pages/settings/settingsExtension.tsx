import React from 'react';
import Section from '@/app/components/section';

interface SettingsExtensionProps {
  selectedMenu: string;
}

const SettingsExtension: React.FC<SettingsExtensionProps> = ({ selectedMenu }) => {
  const isDefaultMessage = selectedMenu;

  return (
    <section className={`border border-gray-300 bg-white p-4 rounded-lg relative flex items-center justify-center ${isDefaultMessage ? 'h-full' : 'h-full'}`}>
      <div className="w-full text-center">
        <Section style={{ marginTop: -1, marginBottom: isDefaultMessage ? '0' : '20px' }}>
          <span className="uppercase">{selectedMenu}</span>
        </Section>
        {isDefaultMessage && (
          <div className="flex items-center justify-center h-full">
            <span className="text-gray-400 uppercase text-xl">{selectedMenu}</span>
          </div>
        )}
      </div>
    </section>
  );
};

export default SettingsExtension;
