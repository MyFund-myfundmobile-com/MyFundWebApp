import Image from "next/image";
import { Tooltip } from "@mui/material";

const ChatAdmin = () => {
  return (
    <span className="fixed bottom-20 right-20 z-50 flex flex-col items-center">
      <Tooltip
        title="Live Chat Admin"
        placement="top"
        arrow
      >
        <a
          href="http://wa.me/+2349032719396"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-green-500 rounded-full shadow-lg transition-transform duration-300 hover:scale-125 hover:bg-green-600"
          style={{ boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)" }}
        >
          <Image
            src="/images/whatsapp.png"
            alt="WhatsApp"
            className="w-10 h-10"
            width={50}
            height={50}
          />
        </a>
      </Tooltip>
    </span>
  );
};

export default ChatAdmin;
