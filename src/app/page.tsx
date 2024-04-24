"use client";
import { useState } from 'react';
import Header from '@/app/components/Header';
import { useRouter } from 'next/navigation';

const Home = () => {
  const [partNumber, setPartNumber] = useState('');
  const [partInfo, setPartInfo] = useState('');
  const [showWarning, setShowWarning] = useState(false);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPartNumber(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchPartNumber();
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      searchPartNumber();
    }
  };

  const searchPartNumber = () => {
    if (!/^[a-zA-Z0-9]+$/.test(partNumber)) {
      setShowWarning(true);
      setPartInfo('');
      return;
    }

    if (partNumber.length !== 10) {
      setShowWarning(true);
      setPartInfo('');
      return;
    }

    setShowWarning(false);
    // ここで部品情報を取得するAPIを呼び出すなどの処理を行う
    // 例えば、APIから取得した部品情報を`partInfo`状態に設定する
    setPartInfo('部品情報を表示する');
  };

  return (
    <div className="bg-gradient-to-r from-gray-700 via-gray-900 to-black min-h-screen">
      <Header />
      <main className="container mx-auto mt-8">
        <div className="flex justify-center">
          <form onSubmit={handleSubmit} className="border border-black rounded-l-md flex items-center">
            <input
              type="text"
              placeholder="品番を入力"
              value={partNumber}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              className="px-4 py-2 w-64 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-red-600 text-white px-4 py-2 hover:bg-red-700 focus:outline-none"
            >
              検索
            </button>
          </form>
        </div>
        {showWarning && (
          <div className="text-red-500 text-center mt-4">
            品番は英語か数字で10桁で入力してください。
          </div>
        )}
        {partInfo && (
          <div className="text-white text-center mt-4">{partInfo}</div>
        )}
      </main>
    </div>
  );
};

export default Home;