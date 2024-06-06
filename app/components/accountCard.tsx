import React from 'react';
import { IoSaveOutline, IoWalletOutline, IoTrendingUpOutline, IoHomeOutline } from 'react-icons/io5';
import { Save as MuiSave, AccountBalanceWallet as MuiWallet } from '@mui/icons-material';

interface AccountCardProps {
  icon: 'save-outline' | 'wallet-outline' | 'trending-up-outline' | 'home-outline';
  label: string;
  rate: string;
  currency: string;
  amount: string;
  buttonText: string;
  buttonIcon: 'save-outline' | 'wallet-outline' | 'trending-up-outline' | 'home-outline';
}

const AccountCard: React.FC<AccountCardProps> = ({ icon, label, rate, currency, amount, buttonText, buttonIcon }) => {
  const [whole, decimal] = amount.split('.');

  const iconComponents: Record<string, JSX.Element> = {
    'save-outline': <IoSaveOutline size={16} className="text-gray-500 mr-2" />,
    'wallet-outline': <IoWalletOutline size={16} className="text-gray-500 mr-2" />,
    'trending-up-outline': <IoTrendingUpOutline size={16} className="text-gray-500 mr-2" />,
    'home-outline': <IoHomeOutline size={16} className="text-gray-500 mr-2" />,
  };

  const buttonIconComponents: Record<string, JSX.Element> = {
    'save-outline': <IoSaveOutline size={16} className="mr-1" />,
    'wallet-outline': <IoWalletOutline size={16} className="mr-1" />,
  };

  // Fallback to MUI if Ionicons is not available
  if (!iconComponents[icon]) {
    iconComponents[icon] = icon === 'save-outline' ? <MuiSave className="text-gray-500 mr-2" /> : <MuiWallet className="text-gray-500 mr-2" />;
  }

  if (!buttonIconComponents[buttonIcon]) {
    buttonIconComponents[buttonIcon] = buttonIcon === 'save-outline' ? <MuiSave className="mr-1" /> : <MuiWallet className="mr-1" />;
  }

  return (
    <div className="relative w-full sm:w-full md:w-1/2 lg:w-1/4 bg-cover rounded-lg p-4 flex flex-col justify-between" style={{ backgroundImage: 'url(/images/icb2.png)', height: '160px' }}>
      <div>
        <div className="flex items-center mb-2">
          {iconComponents[icon]}
          <span className="text-sm text-gray-400 font-karla">{label} <span className="text-green" style={{color: '#43FF8E'}}>@{rate}</span></span>
        </div>
        <div className="flex items-baseline">
          <span className="text-sm text-gray-500 font-karla tracking-tighter" style={{ alignSelf: 'flex-start', marginTop: 7 }}>{currency}</span>
          <span className="text-6xl font-karla text-white tracking-tighter" style={{letterSpacing: -4}}>{whole}</span>
          {decimal && <span className="text-lg text-gray-500 font-karla tracking-tighter">.{decimal}</span>}
        </div>
      </div>
      <button className="absolute bottom-3 right-3 flex items-center bg-purple-400 text-white rounded-md py-1 px-2 font-productSans">
        {buttonIconComponents[buttonIcon]}
        <span className="text-sm">{buttonText}</span>
      </button>
    </div>
  );
};

export default AccountCard;
