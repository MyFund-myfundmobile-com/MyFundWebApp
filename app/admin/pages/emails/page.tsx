import React, { useState, useEffect } from 'react';
import Title from '@/app/components/title';
import Subtitle from '@/app/components/subtitle';
import Section from '@/app/components/section';
import { Divider, IconButton } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { PrimaryButton } from '@/app/components/Buttons/MainButtons';
import CreateTemplateModal from './modals/createTemplateModal';
import UnlayerModal from './modals/unlayerModal';

interface TemplateCard {
  id: string;
  title: string;
  createdAt: string;
  imageData?: string;
}

const EmailsPage: React.FC = () => {
  const [templateCards, setTemplateCards] = useState<TemplateCard[]>([]);
  const [showMessage, setShowMessage] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTemplateTitle, setNewTemplateTitle] = useState('');
  const [isUnlayerModalOpen, setIsUnlayerModalOpen] = useState(false);
  const [unlayerModalTitle, setUnlayerModalTitle] = useState('');

  useEffect(() => {
    // Fetch templates and update state here
    // Example: setTemplateCards(fetchedTemplates);
  }, []);

  const handleCreateTemplate = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleTemplateTitleChange = (title: string) => {
    setNewTemplateTitle(title);
  };

  const handleCreateTemplateSubmit = () => {
    if (newTemplateTitle.length >= 3) {
      setIsModalOpen(false);
      setUnlayerModalTitle(newTemplateTitle);
      setIsUnlayerModalOpen(true);
      setNewTemplateTitle(''); // Reset the title input
    }
  };

  const handleSaveTemplate = (title: string) => {
    const newTemplate: TemplateCard = {
      id: Math.random().toString(),
      title: title,
      createdAt: new Date().toISOString(),
      imageData: '/images/DrTsquare.png', // Adjusted to match your desired image
    };

    setTemplateCards([...templateCards, newTemplate]);
    setShowMessage(false); // Hide the message when template cards exist
  };

  const handleEditTemplate = (id: string) => {
    // Logic for editing template
  };

  const handleDeleteTemplate = (id: string) => {
    setTemplateCards(templateCards.filter(card => card.id !== id));
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Date updating...';
    }
  };

  return (
    <div className="px-6 max-w-full animate-floatIn">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4 mt-5">
        <div>
          <Title>Emails</Title>
          <Subtitle>Create an email, newsletter or template design you can use later.</Subtitle>
        </div>
        <PrimaryButton
          className="rounded-lg px-4 py-3 font-product-sans uppercase font-bold text-sm"
          onClick={handleCreateTemplate}
          background="#4C28BC"
          hoverBackgroundColor="#351265"
          color="#fff"
          hoverColor="#fff"
          startIcon={<Add />}
        >
          Create Design Template
        </PrimaryButton>
      </div>

      <Divider className="my-4 bg-gray-100" />

      {/* Templates Section */}
      <Section>TEMPLATES</Section>
      <div className="border border-gray-300 p-4 rounded-lg min-h-screen mb-10">
        {showMessage ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-gray-500 italic">
              <Subtitle>You are yet to create a design template.</Subtitle>
            </div>
          </div>
        ) : (
          <div className="grid gap-[20px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {templateCards.map((card) => (
              <div key={card.id} className="relative border bg-purple-100 border-gray-300 rounded-lg overflow-hidden" style={{ width: '250px', height: '300px' }}>
                <img src="/images/tempreview.png" alt="Template Preview" className="w-full h-48 object-cover" />
                <div className="p-4">
                  <Title style={{ fontSize: 22, marginTop: -3 }}>{card.title.toUpperCase()}</Title>
                  <Subtitle style={{ fontSize: 11, color: 'grey' }}>{formatDate(card.createdAt)}</Subtitle>
                </div>
                <div className="absolute bottom-2 right-2 flex space-x-2">
                  <IconButton
                    onClick={() => handleEditTemplate(card.id)}
                    sx={{
                      '&:hover': { backgroundColor: '#DCD1FF' },
                    }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeleteTemplate(card.id)}
                    sx={{
                      color: 'brown',
                      '&:hover': { backgroundColor: '#DCD1FF' },
                    }}
                  >
                    <Delete />
                  </IconButton>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal for creating a new template */}
      <CreateTemplateModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onCreate={handleCreateTemplateSubmit}
        onTitleChange={handleTemplateTitleChange}
        title={newTemplateTitle}
        onCreateTemplateDesign={() => setIsUnlayerModalOpen(true)}
      />

      {/* Unlayer Modal */}
      {isUnlayerModalOpen && (
        <UnlayerModal
          isOpen={isUnlayerModalOpen}
          onClose={() => setIsUnlayerModalOpen(false)}
          onSave={(templateTitle) => handleSaveTemplate(templateTitle)} // Pass the function to save the template
          onSend={() => {
            // Send email logic here if needed
          }}
          title={unlayerModalTitle || 'Create Template'}
        />
      )}
    </div>
  );
};

export default EmailsPage;
