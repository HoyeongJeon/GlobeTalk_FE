import { useStore } from "@/stores/store";
import axios, { AxiosError } from "axios";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Login() {
  const { setIsLoggedIn } = useStore((state) => state);
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const onChange = (e: FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const toSignUp = (e: FormEvent) => {
    e.preventDefault();
    navigate("/signup");
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (inputs.email.length === 0 || inputs.password.length === 0) {
      Swal.fire({
        icon: "error",
        title: "이메일과 비밀번호를 입력해주세요.",
        text: "이메일과 비밀번호를 입력해주세요.",
      });
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_HOST}:${
          import.meta.env.VITE_SERVER_PORT
        }/auth/login`,
        inputs,
        {
          withCredentials: true,
        }
      );
      const {
        data: { accessToken, refreshToken },
      } = res;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      setIsLoggedIn(true);
      navigate("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400) {
          Swal.fire({
            icon: "error",
            title: "이메일과 비밀번호를 확인해주세요.",
            text: "이메일과 비밀번호를 확인해주세요.",
          });
        }
      }
      console.error(error);
    }
  };

  return (
    <>
      <main className="flex flex-col items-center justify-center h-screen some-element">
        <h1 className="mt-5 text-3xl font-bold text-gray-700">로그인</h1>
        <form className="p-5 bg-white rounded shadow-lg w-1/2">
          <div className="w-full px-3 mt-5">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              이메일
            </label>
            <input
              name="email"
              type="email"
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="email"
              placeholder="이메일을 입력해주세요."
              onChange={onChange}
            />
          </div>
          <div className="w-full px-3 mt-5">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              비밀번호
            </label>
            <input
              name="password"
              type="password"
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="password"
              placeholder="비밀번호를 입력해주세요."
              onChange={onChange}
            />
          </div>
          <div className="w-full flex flex-nowrap justify-center gap-10">
            <button
              className="w-[100px] px-4 py-2 mt-5 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
              type="button"
              onClick={onSubmit}
            >
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
        </form>
      </main>
    </>
  );
}
