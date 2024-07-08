"use client";
import React, { useState } from 'react';
import Title from '@/app/components/title';
import Subtitle from '@/app/components/subtitle';
import { IonIcon } from '@ionic/react';
import { helpCircleOutline } from 'ionicons/icons';
import { Box, Button, Collapse, Typography } from '@mui/material';
import FAQs from '@/data/faqs';

const FAQsComponent: React.FC = () => { // Rename local declaration to FAQsComponent
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleExpand = (index: number) => {
    if (expandedIndex === index) {
      setExpandedIndex(null); // Collapse if already expanded
    } else {
      setExpandedIndex(index); // Expand the clicked question
    }
  };

  return (
    <Box className="px-6 animate-floatIn max-w-full bg-[#F7F5FF]" style={{ padding: '36px', borderRadius: '8px', backgroundColor: 'white' }}>
      <div className="flex justify-between items-center">
        <div>
          <Title style={{ marginTop: -15 }}>FAQs</Title>
          <Subtitle style={{ marginTop: -5 }}>Find answers to frequently asked questions.</Subtitle>
        </div>
        <div className="flex items-center">
          <IonIcon icon={helpCircleOutline} className="text-purple1" style={{ fontSize: '32px' }} />
        </div>
      </div>

      <div className="mt-4 font-karla">
        {FAQs.map((faq, index) => (
          <Box key={index} className="mb-2 font-karla">
           <button
            className={`flex w-full items-center p-2 border rounded-lg transition-all duration-200 transform hover:bg-[#DCD1FF] hover:scale-105 ${expandedIndex === index ? 'bg-purple1 text-white' : 'bg-[#F7F5FF]'} `}
            onClick={() => handleExpand(index)}
            style={{ justifyContent: 'flex-start', textTransform: 'none', fontFamily: 'karla' }}
          >
            {faq.question}
          </button>

            <Collapse in={expandedIndex === index} timeout="auto" unmountOnExit>
              <Box p={2}>
                <Typography className="font-karla">{faq.answer}</Typography>
              </Box>
            </Collapse>
          </Box>
        ))}
      </div>
    </Box>
  );
};

export default FAQsComponent; // Export renamed component
