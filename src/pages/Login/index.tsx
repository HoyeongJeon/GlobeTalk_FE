import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const toSignUp = (e: FormEvent) => {
    e.preventDefault();
    navigate("/signup");
  };

  return (
    <>
      <main className="flex flex-col items-center justify-center h-screen some-element">
        <h1 className="mt-5 text-3xl font-bold text-gray-700">로그인</h1>
        <div className="w-full px-3 mt-5">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            이메일
          </label>
          <input
            type="email"
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="email"
            placeholder="이메일을 입력해주세요."
          />
        </div>
        <div className="w-full px-3 mt-5">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            비밀번호
          </label>
          <input
            type="password"
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="password"
            placeholder="비밀번호를 입력해주세요."
          />
        </div>
        <div className="w-full flex flex-nowrap justify-center gap-10">
          <button className="w-[100px] px-4 py-2 mt-5 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline">
            로그인
          </button>
          <button
            className=" w-[100px] px-4 py-2 mt-5 font-bold text-gray-700 bg-gray-300 rounded hover:bg-gray-500 focus:outline-none focus:shadow-outline"
            type="button"
            onClick={toSignUp}
          >
            회원가입
          </button>
        </div>
        <p>
          <a href="/forgot-password" className="text-blue-500">
            비밀번호 찾기
          </a>
        </p>
      </main>
    </>
  );
}
