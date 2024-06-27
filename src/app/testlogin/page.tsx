import Link from 'next/link';

export default function TestLogin(){

    return (
        <main className="h-screen w-screen flex justify-center items-center">
            <form className="flex flex-col justify-center items-center border rounded-md p-5 shadow md:w-7/12 md:h-4/6">
                <label className='ml-11 mr-20 my-11 text-2xl font-bold'>ログイン</label>

                <label className="mx-11 mt-10">メールアドレス</label>
                <input type="email" className="border mt-1 mx-11 rounded"></input>

                <label className="mx-11 mt-10">パスワード</label>
                <input type="password" className="border mt-1 mx-11 rounded"></input>

                <button className="mx-11 mt-10 border rounded-md p-3 bg-slate-900 text-slate-100 hover:bg-slate-700 duration-200">ログイン</button>
                <Link href={"/passwordchange"} className='mt-10 mx-11 text-black no-underline hover:text-sky-400 hover:underline self-end'>パスワードを忘れた場合</Link>

            </form>
        </main>
    )

}
