"use client";

declare global {
  interface Window {
    unlayer: any;
  }
}

import React, { useEffect, useRef, useState } from "react";
import Modal from "@/components/modal";
import SendEmailModal from "./sendEmailModal"; // Import the new SendEmailModal component
import { closeOutline, trashOutline } from "ionicons/icons";
import {
  PrimaryButton,
  SecondaryButton,
} from "@/components/Buttons/MainButtons";
import { CircularProgress } from "@mui/material";

import axios from "axios";
import CustomSnackbar from "@/components/snackbar"; // Import Snackbar component for notifications

declare global {
  interface Window {
    unlayer: any;
  }
}

interface UnlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: {
    id: string; // Ensure id is a string
    title: string;
    lastUpdate: string;
    designHTML: string;
  }) => void;
  onSend: () => void;
  title: string;
  editorHtml?: string;
}

const UnlayerModal: React.FC<UnlayerModalProps> = ({
  isOpen,
  onClose,
  onSave,
  onSend,
  title,
  editorHtml,
}) => {
  const [isEditorLoaded, setIsEditorLoaded] = useState(false);
  const [isConfirmCloseOpen, setIsConfirmCloseOpen] = useState(false);
  const [isSendEmailModalOpen, setIsSendEmailModalOpen] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);
  const [unlayerHtmlContent, setUnlayerHtmlContent] = useState<string>("");
  const [isSaving, setIsSaving] = useState(false);
  // const [editorHtml, setEditorHtml] = useState<string>(initialHtml || "");

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  useEffect(() => {
    if (isOpen && !isEditorLoaded) {
      const script = document.createElement("script");
      script.src = "https://editor.unlayer.com/embed.js";
      script.async = true;
      script.onload = () => {
        setIsEditorLoaded(true);
        console.log("Script loaded, editor ready");
      };
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [isOpen, isEditorLoaded]);

  console.log("saved design outside useEffectytttttttttt", editorHtml);

  useEffect(() => {
    console.log("Before running useEffect, current values:");
    console.log("isOpen:", isOpen);
    console.log("isEditorLoaded:", isEditorLoaded);
    console.log("editorHtml:", editorHtml);
    console.log("editorRef.current:", editorRef.current);

    if (isOpen && isEditorLoaded && editorRef.current) {
      const windowHeight = window.innerHeight;
      const editorHeight = windowHeight * 0.8;

      console.log("Editor isOpen:", isOpen);
      console.log("Editor isEditorLoaded:", isEditorLoaded);
      console.log("Editor editorHtml content:", editorHtml);

      if (window.unlayer) {
        window.unlayer.init(
          {
            appearance: { theme: "dark" },
            loader: {
              html: '<div class="custom-spinner"></div>',
              css: ".custom-spinner { color: red; }",
            },
            id: "editor",
            projectId: 229117,
            displayMode: "email",
            width: "100%",
            height: `${editorHeight}px`,
            minHeight: "80vh",
          },
          () => {
            console.log(
              "Unlayer editor initialized, attempting to load design."
            );
            if (editorHtml) {
              console.log("Loading design into editor:", editorHtml);
              window.unlayer.loadDesign(JSON.parse(editorHtml)); // Load JSON design
            } else {
              console.warn("No editorHtml found to load into editor.");
            }
          }
        );
      } else {
        console.error("Unlayer is not available.");
      }
    }
  }, [isOpen, isEditorLoaded, editorHtml]);

  const handleSaveAndExit = async () => {
    setIsSaving(true);
    try {
      await handleSaveDesign();
    } catch (error) {
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveDesign = async () => {
    setIsSaving(true);
    try {
      window.unlayer.saveDesign(async (design: any) => {
        console.log("Design saved:", design); // Log saved design

        const lastUpdate = new Date().toISOString();

        window.unlayer.exportHtml(async (data: any) => {
          const { html } = data;
          console.log("Exported HTML:", html); // Log exported HTML

          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/save-template/`,
            {
              title: title,
              designBody: design,
              designHTML: html,
              lastUpdate: lastUpdate,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (response.status === 200) {
            const savedTemplate = response.data;
            console.log("Template saved successfully:", savedTemplate); // Log saved template

            setSnackbarMessage("Template saved successfully!");
            setSnackbarSeverity("success");
            setSnackbarOpen(true);

            onSave({
              id: savedTemplate.id,
              title: title,
              lastUpdate: lastUpdate,
              designHTML: html,
            });

            onClose(); // Close the modal only after successful save
          } else {
            throw new Error("Failed to save template");
          }
        });
      });
    } catch (error) {
      console.error("Error saving template:", error);
      setSnackbarMessage("Error saving template. Please try again.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSendEmail = () => {
    window.unlayer.exportHtml((data: any) => {
      const { html } = data;
      console.log("HTML content for sending email:", html); // Log HTML content
      setUnlayerHtmlContent(html);
      setIsSendEmailModalOpen(true);
    });
  };

  const handleConfirmClose = () => {
    setIsConfirmCloseOpen(true); // Open confirmation modal
  };

  const handleCancelClose = () => {
    setIsConfirmCloseOpen(false); // Close confirmation modal
  };

  const handleConfirmCancel = () => {
    setIsConfirmCloseOpen(false);
    onClose();
  };

  const handleSendEmailModalClose = () => {
    setIsSendEmailModalOpen(false);
  };

  const handleSend = (subject: string, recipients: string[]) => {
    setIsSendEmailModalOpen(false);
  };

  return (
    <>
      <div
        className={`fixed inset-0 flex items-center justify-center z-50 ${
          isOpen ? "" : "hidden"
        }`}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      >
        <div
          className="bg-white rounded-lg shadow-lg w-full h-full"
          style={{ width: "95%", height: "95%" }}
        >
          <div
            className="flex justify-between items-center p-2 border-b border-gray-200"
            style={{ paddingBottom: -5, marginBottom: -12 }}
          >
            <h2 className="md:text-2xl text-xl uppercase tracking-tight text-purple1 font-proxima font-bold text-left ml-5">
              {title}
            </h2>
            <div
              className="flex items-center space-x-2 mr-3"
              style={{ marginBottom: -5 }}
            >
              <PrimaryButton
                className="rounded-lg px-4 py-2 mr-3 font-product-sans uppercase font-bold text-sm"
                onClick={handleSendEmail} // Trigger sendEmailModal
                background="#4C28BC"
                hoverBackgroundColor="#351265"
                color="#fff"
                hoverColor="#fff"
              >
                Send Email
              </PrimaryButton>
              <PrimaryButton
                className="rounded-lg px-4 py-2 mr-5 font-product-sans uppercase font-bold text-sm"
                onClick={handleSaveAndExit}
                background="#4C28BC"
                hoverBackgroundColor="#351265"
                color="#fff"
                hoverColor="#fff"
                style={{ marginRight: 5 }}
              >
                {isSaving ? (
                  <>
                    <CircularProgress
                      size={24}
                      color="inherit"
                      style={{ marginRight: 8 }}
                    />
                    Saving...
                  </>
                ) : (
                  "Save This Design"
                )}
              </PrimaryButton>

              <button
                onClick={handleConfirmClose}
                className="text-gray-500 ml-5 hover:text-gray-700"
                style={{ marginLeft: 15 }}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  style={{ marginBottom: 10 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div
            id="editor"
            ref={editorRef}
            style={{ width: "100%", height: "calc(100% - 4rem)" }}
          />
        </div>
      </div>

      <Modal
        isOpen={isConfirmCloseOpen}
        onClose={handleCancelClose}
        header="Confirm Close"
        body="Are you sure you want to close this editor? Any unsaved changes will be lost."
        buttonText="Yes, Close"
        onButtonClick={handleConfirmCancel}
        modalIcon={trashOutline}
        iconColor="brown"
        zIndex={200}
      ></Modal>

      <SendEmailModal
        isOpen={isSendEmailModalOpen}
        onClose={handleSendEmailModalClose}
        onSend={handleSend}
        htmlContent={unlayerHtmlContent} // Ensure this is passed correctly
      />
      <CustomSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        handleClose={() => setSnackbarOpen(false)}
      />
    </>
  );
};

export default UnlayerModal;
