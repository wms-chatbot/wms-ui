import Link from 'next/link';
import { FaRobot } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="bg-black py-4">
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="keiko text-xl font-bold">
          ISZ-LG Inquiry System
        </div>
        <div>
          <Link href="/chatbot" className="text-white hover:keiko flex items-center">
            <FaRobot className="mr-2" />
            <span className="border-b-2 border-transparent transition-colors duration-200">
              Chatbot
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
