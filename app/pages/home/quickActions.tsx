import React from 'react';
import Section from '@/app/components/section';
import { IonIcon } from '@ionic/react';
import { carOutline, carSportOutline, personAddOutline, checkmarkCircleOutline } from 'ionicons/icons';

const QuickActionsSection = () => {
  const handleActivateAutoSave = () => {
    // Logic to activate AutoSave
  };

  const handleActivateAutoInvest = () => {
    // Logic to activate AutoInvest
  };

  const autoSaveSettings = { active: false }; // Update this based on your state
  const autoInvestSettings = { active: false }; // Update this based on your state
  const kycStatus = 'Not yet started'; // Update this based on your state
  const currentStage = { text: 'Surplus' }; // Update this based on your state

  return (
    <section>
      <Section style={{ marginBottom: -3, marginTop: -3 }}>QUICK ACTIONS</Section>
      <div className="flex flex-col gap-2 mt-2 font-karla">
        <button
          className={`flex items-center p-2 border rounded-lg ${autoSaveSettings.active ? 'bg-gray-200' : 'bg-white'} transition-all duration-300 transform hover:scale-105 hover:bg-[#DCD1FF]`}
          onClick={handleActivateAutoSave}
          disabled={autoSaveSettings.active}
        >
          <IonIcon icon={carOutline} className={`text-xl ${autoSaveSettings.active ? 'text-green-500' : 'text-black'}`} />
          <span className="ml-3 flex-1 text-left text-sm">
            {autoSaveSettings.active ? 'AutoSave is ON' : 'Turn ON AutoSave'}
          </span>
          {autoSaveSettings.active && <IonIcon icon={checkmarkCircleOutline} className="text-xl text-green-500" />}
        </button>

        <button
          className={`flex items-center p-2 border rounded-lg ${autoInvestSettings.active ? 'bg-gray-200' : 'bg-white'} transition-all duration-300 transform hover:scale-105 hover:bg-[#DCD1FF]`}
          onClick={handleActivateAutoInvest}
          disabled={autoInvestSettings.active}
        >
          <IonIcon icon={carSportOutline} className={`text-xl ${autoInvestSettings.active ? 'text-green-500' : 'text-black'}`} />
          <span className="ml-3 flex-1 text-left text-sm">
            {autoInvestSettings.active ? 'AutoInvest is ON' : 'Turn ON AutoInvest'}
          </span>
          {autoInvestSettings.active && <IonIcon icon={checkmarkCircleOutline} className="text-xl text-green-500" />}
        </button>

        <button
          className="flex items-center p-2 border rounded-lg bg-white transition-all duration-300 transform hover:scale-105 hover:bg-[#DCD1FF]"
        >
          <IonIcon icon={personAddOutline} className="text-xl text-black" />
          <span className="ml-3 flex-1 text-left text-sm">Refer and Earn</span>
          <span className="text-xs text-gray-600">₦1000 EACH</span>
        </button>

        {/* Add more buttons as needed */}
      </div>
    </section>
  );
};

export default QuickActionsSection;
