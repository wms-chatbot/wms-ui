'use client'
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Link from 'next/link';
import { useState } from "react";

export default function TestLogin(){
    const [password, setPassword] = useState("");
    const [passwordType, setPasswordType] = useState("password");
    return (
        <main className="h-screen w-screen flex justify-center items-center">
            <form className="flex flex-col justify-center items-center border rounded-lg p-5 md:px-7 px-6 shadow ">
                <label className='md:mt-5 md:text-2xl mt-4 text-xl font-bold md:w-64 w-56 text-left'>ログイン</label>

                <label className="md:mt-6 md:w-64 w-56 mt-5 text-left">会社ID</label>
                <input type="text" className="border mt-1 md:mx-11 mx-5 rounded md:w-64 w-56"></input>

                <label className="md:mt-6 md:w-64 mt-4 w-56 text-left">会社パスワード</label>
                {/* <input value={password} type={passwordType} placeholder={"password"} onChange={(e)=>{setPassword(e.target.value);}} className='border mt-1 md:mx-11 rounded md:w-64 w-56'></input> */}
                <div className="relative md:w-64 w-56 mt-1 md:mx-11 border rounded">
                    <input value={password} type={passwordType} placeholder={"password"} onChange={(e)=>{setPassword(e.target.value);}} className=' w-full'></input>
                    {passwordType === "password" && (
                        <VisibilityOffIcon
                        color="action"
                        onClick={() => setPasswordType("text")}
                        className="Password__visual absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                        />
                    )}
                    {passwordType === "text" && (
                        <VisibilityIcon
                        color="action"
                        onClick={() => setPasswordType("password")}
                        className="Password__visual absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                        />
                    )}
                </div>
                <label className="md:mt-6 md:w-64 w-56 mt-4 text-left">ユーザID</label>
                <input type="text" className="border mt-1 md:mx-11 rounded md:w-64 w-56"></input>

                <button className="md:mt-6 mt-6 border rounded-md md:p-3 p-2 bg-slate-900 text-slate-100 hover:bg-slate-700 duration-200 md:w-64 w-56">ログイン</button>
                <Link href={"/passwordchange"} className='md:mt-10 md:mx-11 mt-5 md:text-base text-xs text-black no-underline hover:text-sky-400 hover:underline self-end'>パスワードを忘れた場合</Link>

            </form>
        </main>
    )

}
