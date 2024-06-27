"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Link from 'next/link';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// フィールドのスキーマを zod で定義
const schema = z.object({
    email: z.string().email("正しいメールアドレス形式で入力してください"),
    password: z.string().min(8, "会社パスワードは8文字以上で入力してください").regex(/^[a-zA-Z0-9]+$/, "会社パスワードは英数字のみで入力してください"),
});

// フォームの入力値の型を上述のスキーマから作成
type FormValues = z.infer<typeof schema>;

export const login = () => {
    // const [password, setPassword] = useState("");
    const [passwordType, setPasswordType] = useState("password");
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<FormValues>({
        resolver: zodResolver(schema),
      });

      const onSubmit = (data: FormValues) => {
        console.log(data);
      };
    return (
        <main className="h-screen w-screen flex justify-center items-center bg-slate-50">
            <form className="flex flex-col justify-center items-center border rounded-lg p-5 md:px-7 px-6 shadow bg-white" onSubmit={handleSubmit(onSubmit)}>
                <label className='md:mt-5 md:text-2xl mt-4 text-xl font-bold md:w-64 w-56 text-center'>ログイン</label>

                <label className="md:mt-6 md:w-64 w-56 mt-5 text-left">会社ID</label>
                <input type="email" className="border mt-1 md:mx-11 mx-5 rounded md:w-64 w-56" placeholder="メールアドレス" {...register("email")}></input>
                {errors.email && <span className="text-xs text-red-600">{errors.email.message}</span>}

                <label className="md:mt-6 md:w-64 mt-4 w-56 text-left">パスワード</label>
                <div className="relative md:w-64 w-56 mt-1 md:mx-11 border rounded">
                <input
                        type={passwordType}
                        placeholder="パスワード"
                        className='w-full'
                        {...register("password", { required: true })} // 修正
                        pattern="[a-zA-Z0-9]*" // 追加: 半角英数字のみ許可
                    ></input>
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
                {errors.password && <span className="text-xs text-red-600">{errors.password.message}</span>}

                <button className="md:mt-6 mt-6 border rounded-md md:p-3 p-2 bg-blue-700 text-slate-100 hover:bg-blue-500 duration-200 md:w-64 w-56">ログイン</button>
                <Link href={"/passwordchange"} className='md:mt-10 md:mx-11 mt-5 md:text-base text-xs text-black no-underline hover:text-sky-400 hover:underline self-end'>パスワードを忘れた場合</Link>

            </form>
        </main>
    )
}
