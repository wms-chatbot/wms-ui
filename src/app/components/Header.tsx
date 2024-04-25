import Link from 'next/link';
import { FaRobot } from 'react-icons/fa';

const Header = () => {
return (

<header className="bg-black py-4"> <div className="container mx-auto flex items-center justify-between px-4"> <div className="text-red-600 text-xl font-bold">
部品問い合わせシステム

</div> <div> <Link href="/chatbot" className="text-white hover:text-red-600 flex items-center"> <FaRobot className="mr-2" /> <span className="border-b-2 border-transparent hover:border-red-600 transition-colors duration-200">
Chatbot
</span> </Link> </div> </div> </header>

);
};

export default Header;
