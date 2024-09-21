"use client";

import React, { useState, useEffect } from "react";
import Title from "@/components/title";
import Subtitle from "@/components/subtitle";
import Section from "@/components/section";
import { Divider, IconButton } from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import { PrimaryButton } from "@/components/Buttons/MainButtons";
import CreateTemplateModal from "../../../../components/admin/modals/createTemplateModal";
import UnlayerModal from "../../../../components/admin/modals/unlayerModal";
import Image from "next/image";
import Modal from "@/components/modal";
import { closeOutline, trashOutline } from "ionicons/icons";
import { fetchUserInfo, fetchEmailTemplates } from "@/Redux store/actions";
import { AppDispatch } from "@/Redux store/store";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/Redux store/store";
import axios from "axios";
import CustomSnackbar from "@/components/snackbar"; // Import Snackbar component for notifications
import { CircularProgress } from "@mui/material";
import { usePathname, useSearchParams } from "next/navigation";
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
  const [newTemplateTitle, setNewTemplateTitle] = useState("");
  const [isUnlayerModalOpen, setIsUnlayerModalOpen] = useState(false);
  const [unlayerModalTitle, setUnlayerModalTitle] = useState("");

  const [isConfirmCloseOpen, setIsConfirmCloseOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [templateToDelete, setTemplateToDelete] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Add state for loading
  const [isEditLoading, setIsEditLoading] = useState<{
    [key: string]: boolean;
  }>({});

  const [editorHtml, setEditorHtml] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>(); // Use AppDispatch type
  const token = useSelector((state: RootState) => state.auth.token);
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const emailTemplates = useSelector(
    (state: RootState) => state.auth.emailTemplates
  );

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  useEffect(() => {
    if (token) {
      dispatch(fetchEmailTemplates(token));
    }
  }, [dispatch, token]);

  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("isModalOpen")) {
      setIsModalOpen(true);
    }
  }, [searchParams]);

  if (emailTemplates && emailTemplates.length > 0) {
      const transformedTemplates: TemplateCard[] = emailTemplates.map(
        (template) => ({
          id: template.id.toString(),
          title: template.title,
          createdAt: template.last_update || new Date().toISOString(),
        })
      );
      setTemplateCards(transformedTemplates);
      setShowMessage(false);
    } else {
      setShowMessage(true);
    }
  }, [emailTemplates]);

  const handleTemplateTitleChange = (title: string) => {
    const isTitleDuplicate = templateCards.some(
      (card) => card.title.toLowerCase() === title.toLowerCase()
    );

    if (isTitleDuplicate) {
      // Optionally show a warning message or disable the "Continue to Editor" button
      console.log("Duplicate title detected");
    }

    setNewTemplateTitle(title);
  };

  const handleCreateTemplate = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleDeleteClick = (id: string) => {
    setTemplateToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (templateToDelete) {
      setIsLoading(true); // Set loading state
      try {
        const response = await axios.delete(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/delete-template/${templateToDelete}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setTemplateCards(
            templateCards.filter((card) => card.id !== templateToDelete)
          );
          setSnackbarMessage("Template deleted successfully.");
          setSnackbarSeverity("success");
        } else {
          setSnackbarMessage("Failed to delete template. Please try again.");
          setSnackbarSeverity("error");
        }
      } catch (error) {
        setSnackbarMessage(
          "An error occurred while deleting the template. Please try again later."
        );
        setSnackbarSeverity("error");
      } finally {
        setSnackbarOpen(true);
        setIsDeleteModalOpen(false);
        setTemplateToDelete(null);
        setIsLoading(false); // Reset loading state
      }
    }
  }

  const handleCreateTemplateSubmit = () => {
    if (newTemplateTitle.length >= 3) {
      setIsModalOpen(false);
      setUnlayerModalTitle(newTemplateTitle);
      setIsUnlayerModalOpen(true);
      setNewTemplateTitle(""); // Reset the title input
    }
  };

const handleEditTemplate = async (id: string) => {
    setIsEditLoading((prevState) => ({ ...prevState, [id]: true }));

    try {
      console.log("SECOND design before modal opens...:", editorHtml);

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/edit-template/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const template = response.data;
        setUnlayerModalTitle(template.title);
        setIsUnlayerModalOpen(true);
        setEditorHtml(template.design);
        console.log("saved design before modal opens...:", template.design);
      } else {
        setSnackbarMessage("Failed to load template. Please try again.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    } catch (error) {
      setSnackbarMessage("An error occurred while loading the template.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setIsEditLoading((prevState) => ({ ...prevState, [id]: false }));
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Date updating...";
    }
  };

  
  const handleSaveTemplate = (title: string) => {
    const newTemplate: TemplateCard = {
      id: Math.random().toString(),
      title: title,
      createdAt: new Date().toISOString(),
      // imageData: '/images/DrTsquare.png', // Adjusted to match your desired image
    };

    setTemplateCards([...templateCards, newTemplate]);
    setShowMessage(false);
  };

  const handleSaveTemplateFromUnlayer = (templateData: {
    id: string;
    title: string;
    lastUpdate: string;
    designHTML: string;
  }) => {
    handleSaveTemplate(templateData.title);
  };

  return (
    <div className="px-6 max-w-full animate-floatIn">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4 mt-5">
        <div>
          <Title>Emails</Title>
          <Subtitle>
            Create an email, newsletter or template design you can use later.
          </Subtitle>
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
      {templateCards.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-gray-500 italic">
              <Subtitle>You are yet to create a design template.</Subtitle>
            </div>
          </div>
        ) : (
          <div className="grid gap-[20px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {templateCards.map((card) => (
              <div
                key={card.id}
                className="relative border bg-purple-100 border-gray-300 rounded-lg overflow-hidden"
                style={{ width: "250px", height: "300px" }}
              >
                <Image
                  src="/images/tempreview.png"
                  height={720}
                  width={720}
                  alt="Template Preview"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <Title style={{ fontSize: 22, marginTop: -3 }}>
                    {card.title.toUpperCase()}
                  </Title>
                  <Subtitle style={{ fontSize: 11, color: "grey" }}>
                    {formatDate(card.createdAt)}
                  </Subtitle>
                </div>
                <div className="absolute bottom-2 right-2 flex space-x-2">
                  <IconButton
                    onClick={() => handleEditTemplate(card.id)}
                    sx={{
                      "&:hover": { backgroundColor: "#DCD1FF" },
                    }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeleteTemplate(card.id)}
                    sx={{
                      color: "brown",
                      "&:hover": { backgroundColor: "#DCD1FF" },
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
        templateCards={templateCards}
      />

       <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        header="Confirm Delete"
        body="Are you sure you want to delete this template? This action cannot be undone."
        buttonText={
          isLoading ? (
            <div className="flex items-center">
              <CircularProgress
                size={24}
                color="inherit"
                style={{ marginRight: 8 }}
              />
              Deleting...
            </div>
          ) : (
            "Yes, Delete"
          )
        }
        onButtonClick={handleConfirmDelete}
        modalIcon={trashOutline}
        iconColor="brown"
        zIndex={200}
      />

      {/* Unlayer Modal */}
      {isUnlayerModalOpen && (
        <UnlayerModal
          isOpen={isUnlayerModalOpen}
          onClose={() => setIsUnlayerModalOpen(false)}
          onSave={handleSaveTemplateFromUnlayer}
          onSend={() => {}}
          title={unlayerModalTitle || "Create Template"}
          editorHtml={editorHtml} 
        />
      )}
       <CustomSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        handleClose={() => setSnackbarOpen(false)}
      />
    </div>
  );
};

export default EmailsPage;
