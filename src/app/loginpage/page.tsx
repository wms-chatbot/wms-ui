import { login as Login } from "@/app/components/Login";

export default function LoginPage() {
    return (
      <div className="overflow-x-hidden">
        <header className="flex items-center justify-center p-5 bg-white absolute w-full shadow-lg">
          <div className="text-xl font-semibold text-black">部品問い合わせシステム</div>
        </header>
        <Login/>
      </div>
    );
  }
