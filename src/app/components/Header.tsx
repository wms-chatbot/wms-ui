"use client"
import Link from 'next/link';
import { FaRobot } from 'react-icons/fa';

const Header = () => {
return (

<header className="bg-black py-4">
    <div className="container mx-auto flex items-center justify-between px-4">
        <div className="fluorescent-color text-xl font-bold">
            部品問い合わせシステム
        </div>
        <div>
            <Link href="http://localhost/chat/NG2S7IvnrWNk9ZiD" className="text-white hover:fluorescent-color flex items-center">
                <FaRobot size={25} className="mr-2" />
                    <span className="text-xl border-b-2 border-transparent hover:border-fluorescent-color transition-colors duration-200">
                        Chatbot
                    </span>
            </Link>
        </div>
    </div>
</header>

);
};

export default Header;


