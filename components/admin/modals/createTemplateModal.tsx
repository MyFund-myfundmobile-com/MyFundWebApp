"use client";

import React, { useEffect, useRef } from "react";
import { createOutline } from "ionicons/icons";
import Modal from "@/components/modal";

interface TemplateCard {
  title: string;
}
interface CreateTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: () => void;
  onTitleChange: (title: string) => void;
  title: string;
  onCreateTemplateDesign: () => void;
  templateCards: TemplateCard[]; //
}

const CreateTemplateModal: React.FC<CreateTemplateModalProps> = ({
  isOpen,
  onClose,
  onCreate,
  onTitleChange,
  title,
  onCreateTemplateDesign,
  templateCards,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const isDuplicate = templateCards.some(
    (card: TemplateCard) => card.title.toLowerCase() === title.toLowerCase()
  );

  // Disable the button if the title is too short or duplicate
  const isButtonDisabled = title.length < 3 || isDuplicate;

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !isButtonDisabled) {
      onCreate();
      onCreateTemplateDesign();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      header="Enter Design Title"
      body={
        <div className="flex flex-col">
          <input
            type="text"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="Enter title (at least 3 characters)..."
            className="p-2 border border-gray-300 rounded"
            ref={inputRef}
            onKeyPress={handleKeyPress}
          />
        </div>
      }
      buttonText="Continue to Editor"
      onButtonClick={() => {
        onCreate();
        onCreateTemplateDesign(); // Trigger opening of UnlayerModal
      }}
      modalIcon={createOutline}
      iconColor="#4C28BC"
      buttonDisabled={isButtonDisabled}
      zIndex={100}
    />
  );
};

export default CreateTemplateModal;
