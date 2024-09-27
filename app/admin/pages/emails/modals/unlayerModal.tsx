"use client";

declare global {
  interface Window {
    unlayer: any;
  }
}

import React, { useEffect, useRef, useState } from "react";
import Modal from "@/app/components/modal";
import SendEmailModal from "./sendEmailModal"; // Import the new SendEmailModal component
import { closeOutline, trashOutline } from "ionicons/icons";
import {
  PrimaryButton,
  SecondaryButton,
} from "@/app/components/Buttons/MainButtons";
import { CircularProgress } from "@mui/material";

import axios from "axios";
import CustomSnackbar from "@/app/components/snackbar"; // Import Snackbar component for notifications

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
  editorJson?: string;
  editMode: boolean; // Add this prop
}

const UnlayerModal: React.FC<UnlayerModalProps> = ({
  isOpen,
  onClose,
  onSave,
  onSend,
  title,
  editorHtml,
  editorJson,
  editMode, // Make sure editMode is received here
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
  const designRef = useRef<string | null>(null);

  useEffect(() => {
    if (isOpen && !isEditorLoaded) {
      const script = document.createElement("script");
      script.src = "https://editor.unlayer.com/embed.js";
      script.async = true;
      script.onload = () => {
        setIsEditorLoaded(true);
        console.log("Script loaded, editor ready");
      };
      script.onerror = () => {
        console.error("Error loading Unlayer script");
      };
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [isOpen, isEditorLoaded]);

  console.log("saved design outside useEffectytttttttttt", editorHtml);
  useEffect(() => {
    if (isOpen && isEditorLoaded && editorRef.current) {
      const windowHeight = window.innerHeight;
      const editorHeight = windowHeight * 0.8;

      // Initialize the Unlayer editor
      window.unlayer.init({
        appearance: {
          theme: "dark",
        },
        id: "editor",
        projectId: 229117,
        displayMode: "email",
        width: "100%",
        height: `${editorHeight}px`,
      });

      // Register callback to load the design after the editor is fully loaded
      window.unlayer.registerCallback("editor:ready", function () {
        console.log("Unlayer editor is ready");

        if (editMode && editorJson) {
          try {
            console.log("Raw Editor JSON:", editorJson); // Log the raw JSON for debugging
            const trimmedJson = editorJson.trim(); // Trim any leading/trailing whitespace

            // Ensure editorJson is parsed as a valid JSON object
            const parsedDesign =
              typeof trimmedJson === "string"
                ? JSON.parse(trimmedJson)
                : trimmedJson;

            console.log(
              "Loading parsed JSON design into editor:",
              parsedDesign
            );
            window.unlayer.loadDesign(parsedDesign);
          } catch (error) {
            console.error("Error parsing editorJson or loading design:", error);
            console.log("Problematic JSON:", editorJson); // Log the problematic JSON
            // Optionally load a default design or handle the error
            window.unlayer.loadDesign(); // Load default design if parsing fails
          }
        } else if (editMode && editorHtml) {
          console.log("Falling back to loading HTML content.");
          window.unlayer.loadDesign(); // Load default design
          window.unlayer.registerCallback("design:loaded", function () {
            const editorElement = document.getElementById("editor");
            if (editorElement) {
              editorElement.innerHTML = editorHtml;
            }
          });
        } else {
          console.log("Creating a new template in the editor.");
          window.unlayer.loadDesign(); // Load default design
        }
      });

      // Add event listener for design updates
      window.unlayer.addEventListener("design:updated", function () {
        window.unlayer.exportHtml(function (data: {
          design: any;
          html: string;
        }) {
          const { design, html } = data;
          console.log("Design updated, exporting JSON:", design);
          console.log("Design updated, exporting HTML:", html);
          setUnlayerHtmlContent(html);
          designRef.current = html;
        });
      });
    }
  }, [isOpen, isEditorLoaded, editMode, editorJson, editorHtml]);

  const handleSaveDesign = async () => {
    setIsSaving(true);
    try {
      window.unlayer.saveDesign(async (design: any) => {
        if (!design) {
          console.error("No design data available.");
          throw new Error("No design data available to save.");
        }
        console.log("Design saved as JSON:", design); // Log saved design (JSON)

        const lastUpdate = new Date().toISOString();

        // Export the HTML version of the design
        window.unlayer.exportHtml(async (data: any) => {
          const { html } = data;
          if (!html) {
            console.error("No HTML content generated.");
            throw new Error("No HTML content generated.");
          }
          console.log("Exported HTML version:", html); // Log exported HTML

          // Sending both the JSON and HTML to the backend
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/save-template/`,
            {
              title: title,
              designBody: design, // JSON version
              designHTML: html, // HTML version
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
            setSnackbarMessage("Failed to save template. Please try again.");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
          }
        });
      });
    } catch (error) {
      console.error("Error saving template:", error); // Log any error
      setSnackbarMessage("Error saving template. Please try again.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setIsSaving(false); // Ensure isSaving is false after the operation
    }
  };

  const handleUpdateDesign = async () => {
    setIsSaving(true);
    try {
      window.unlayer.saveDesign(async (design: any) => {
        const lastUpdate = new Date().toISOString();

        window.unlayer.exportHtml(async (data: any) => {
          const { html } = data;

          const response = await axios.put(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/update-template/`,
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
            const updatedTemplate = response.data;
            setSnackbarMessage("Template updated successfully!");
            setSnackbarSeverity("success");
            setSnackbarOpen(true);

            // Callback to onSave with both JSON and HTML version
            onSave({
              id: updatedTemplate.id,
              title: title,
              lastUpdate: lastUpdate,
              designHTML: html,
            });

            onClose(); // Close modal after successful update
          } else {
            throw new Error("Failed to update template");
          }
        });
      });
    } catch (error) {
      console.error("Error updating template:", error);
      setSnackbarMessage("Error updating template. Please try again.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setIsSaving(false); // Ensure isSaving is false after the operation
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
                onClick={editMode ? handleUpdateDesign : handleSaveDesign}
                background="#4C28BC"
                hoverBackgroundColor="#351265"
                color="#fff"
                hoverColor="#fff"
                style={{ marginRight: 5 }}
              >
                {isSaving ? (
                  <>
                    <CircularProgress
                      size={20}
                      color="inherit"
                      style={{ marginRight: 8 }}
                    />
                    {editMode ? "Updating..." : "Saving..."}
                  </>
                ) : editMode ? (
                  "Update This Design"
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
