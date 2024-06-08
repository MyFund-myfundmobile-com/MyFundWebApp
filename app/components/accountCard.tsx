import React, { useState, useEffect } from 'react';
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
  style?: React.CSSProperties;
}

const AccountCard: React.FC<AccountCardProps> = ({ icon, label, rate, currency, amount, buttonText, buttonIcon, style }) => {
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
    'trending-up-outline': <IoTrendingUpOutline size={16} className="mr-1" />,
    'home-outline': <IoHomeOutline size={16} className="mr-1" />,
  };

  // Fallback to MUI if Ionicons is not available
  if (!iconComponents[icon]) {
    iconComponents[icon] = icon === 'save-outline' ? <MuiSave className="text-gray-500 mr-2" /> : <MuiWallet className="text-gray-500 mr-2" />;
  }

  if (!buttonIconComponents[buttonIcon]) {
    buttonIconComponents[buttonIcon] = buttonIcon === 'save-outline' ? <MuiSave className="mr-1" /> : <MuiWallet className="mr-1" />;
  }

  // Set amount color based on the label
  let amountColor = 'text-white'; // Default color
  switch (label) {
    case 'SAVINGS':
      amountColor = 'text-white';
      break;
    case 'INVESTMENTS':
      amountColor = 'text-yellow-400';
      break;
    case 'PROPERTIES':
      amountColor = 'text-yellow-400';
      break;
    case 'WALLET':
      amountColor = 'text-[#43FF8E]';
      break;
    default:
      break;
  }

  const [showAmount, setShowAmount] = useState<boolean>(false);

  useEffect(() => {
    // Delay showing the amount to create a fade-in effect
    const timeout = setTimeout(() => {
      setShowAmount(true);
    }, 500); // Adjust the delay as needed

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="relative flex-grow min-w-[250px] max-w-[300px] bg-cover rounded-lg p-4 flex flex-col justify-between" style={{ ...style, backgroundImage: 'url(/images/icb2.png)', height: '160px' }}>
      <div className={`overflow-hidden ${showAmount ? 'opacity-100 transition-opacity duration-500' : 'opacity-0'}`}>
        <div className="flex items-center mb-2">
          {iconComponents[icon]}
          <span className="text-sm text-gray-400 font-karla">{label} {"  "}<span className="text-green" style={{ color: '#43FF8E' }}>@{rate}</span></span>
        </div>
        <div className="flex items-baseline overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="text-sm text-gray-400 font-karla tracking-tighter" style={{ alignSelf: 'flex-start', marginTop: 7 }}>{currency}</span>
          <span className={`text-6xl font-karla tracking-tighter ${amountColor}`} style={{ letterSpacing: -4, whiteSpace: 'nowrap' }}>{whole}</span>
          {decimal && <span className="text-lg text-gray-400 font-karla tracking-tighter">.{decimal}</span>}
        </div>
      </div>
      <button className="absolute bottom-3 right-3 flex items-center bg-purple-400 text-white rounded-md py-1 px-2 font-productSans whitespace-nowrap transition-all duration-300 transform hover:scale-105 hover:bg-purple-500">
        {buttonIconComponents[buttonIcon]}
        <span className="text-sm">{buttonText}</span>
      </button>
    </div>
  );
};

export default AccountCard;
