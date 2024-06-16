import React, { useState } from 'react';
import { IonIcon } from '@ionic/react';
import { settingsOutline, cardOutline, personOutline, keyOutline, starOutline, helpCircleOutline, giftOutline, mailOutline, thumbsUpOutline, lockClosedOutline, logOutOutline } from 'ionicons/icons';

interface SettingsButtonsSectionProps {
  onMenuSelect: (menu: string) => void;
}

const SettingsButtonsSection: React.FC<SettingsButtonsSectionProps> = ({ onMenuSelect }) => {
  const [selectedButton, setSelectedButton] = useState<string | null>(null);

  const settings = [
    { label: "Savings Goal", icon: settingsOutline },
    { label: "Card and Bank Settings", icon: cardOutline },
    { label: "Update KYC", icon: personOutline },
    { label: "Update Transaction PIN", icon: keyOutline },
    { label: "Top Savers", icon: starOutline },
    { label: "FAQs", icon: helpCircleOutline },
    { label: "Refer and Earn: N1000 EACH", icon: giftOutline },
    { label: "Message Admin", icon: mailOutline },
    { label: "Rate MyFund", icon: thumbsUpOutline },
    // { label: "Privacy and Policy", icon: lockClosedOutline },
    { label: "Log Out", icon: logOutOutline, color: "brown" }
  ];

  const handleButtonClick = (label: string) => {
    setSelectedButton(label);
    onMenuSelect(label);
  };

  return (
    <section className="flex flex-col gap-2 mt-2 font-karla">
      {settings.map((setting, index) => (
        <button
          key={index}
          className={`flex items-center p-2 border rounded-lg transition-all duration-300 transform ${
            selectedButton === setting.label ? 'bg-purple-500 text-white scale-105' : 'bg-white hover:scale-105 hover:bg-[#DCD1FF]'
          }`}
          onClick={() => handleButtonClick(setting.label)}
        >
          <IonIcon icon={setting.icon} className={`text-xl ${selectedButton === setting.label ? 'text-white' : 'text-black'}`} style={{ color: setting.color }} />
          <span className="ml-3 flex-1 text-left text-sm">
            {setting.label.includes("Refer and Earn:") ? (
              <>
                Refer and Earn: <span style={{ color: 'green' }}>N1000 EACH</span>
              </>
            ) : (
              setting.label
            )}
          </span>
        </button>
      ))}
    </section>
  );
};

export default SettingsButtonsSection;
