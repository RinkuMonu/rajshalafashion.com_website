import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/919680034960"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 bg-green-500 text-white rounded-full p-4 shadow-lg transition-all hover:scale-105 hover:bg-green-600 z-50"
    >
      <FaWhatsapp size={30} />
    </a>
  );
};

export default WhatsAppButton;
