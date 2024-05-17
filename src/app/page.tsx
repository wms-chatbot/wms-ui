"use client";
import Header from '@/app/components/Header';
import { useState } from 'react';

// Homeコンポーネントの定義
const Home = () => {
  // 状態管理用のフック
  const [partNumber, setPartNumber] = useState('');
  const [partInfo, setPartInfo] = useState(null);
  const [showWarning, setShowWarning] = useState(false);

  // 入力値の変更をハンドル
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPartNumber(e.target.value);
  };

  // フォームの送信をハンドル
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchPartNumber();
  };

  // キーボードイベントをハンドル（Enterキーで検索）
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      searchPartNumber();
    }
  };

  // 部品情報を取得する非同期関数
  const fetchPartInfo = async (partNumber: string) => {
    try {
      const response = await fetch(`http://localhost:5100/v1/parts/${partNumber}`);
      const data = await response.json();
      if (response.ok) {
        setPartInfo(data);
      } else {
        throw new Error(data.message || '部品情報の取得に失敗しました。');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setPartInfo({ error: error.message });
      } else {
        setPartInfo({ error: '予期せぬエラーが発生しました。' });
      }
    }
  };

  // 品番の検索条件をチェックし、条件に合致する場合は情報取得を実行
  const searchPartNumber = () => {
    setShowWarning(false);
    setPartInfo(null);

    if (!/^[a-zA-Z0-9]+$/.test(partNumber) || partNumber.length !== 10) {
      setShowWarning(true);
      return;
    }

    fetchPartInfo(partNumber);
  };
  // 部品情報を表示するテーブルを生成
  const renderPartInfo = (info) => {
    if (!info) return null;
    if (info.error) return <div className="text-red-500 text-center mt-4">{info.error}</div>;

    return (
      <>
      <table className='table-fixed mx-auto mt-5 w-3/4 text-white'>
        <thead>
          <tr>
            <th className="w-1/2">部品名</th>
            <th className="w-1/2">{info.Part.Name}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="w-1/2">最小発注</td>
            <td className="w-1/2">{info.Part.Moq}</td>
          </tr>
          <tr>
            <td className="w-1/2">原価単価</td>
            <td className="w-1/2">{info.Part.CostUnitPrice}</td>
          </tr>
          <tr>
            <td className="w-1/2">契約単価</td>
            <td className="w-1/2">{info.Part.CostUnitPrice}</td>
          </tr>
        </tbody>
      </table>
      </>
    );
  };
  // コンポーネントのレンダリング部分
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
              className="px-4 py-2 w-64 focus:outline-none rounded-l-lg"
            />
            <button
              type="submit"
              className="bg-red-600 text-white px-4 py-2 hover:bg-red-700 focus:outline-none rounded-r-lg"
            >
              検索
            </button>
          </form>
        </div>
        {showWarning && (
          <div className="text-red-500 text-center mt-4">
            品番は半角英数字10桁で入力してください。
          </div>
        )}
        {partInfo && renderPartInfo(partInfo)}
      </main>
    </div>
  );
};

export default Home;
