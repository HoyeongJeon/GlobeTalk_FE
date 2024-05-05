import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { countries } from "@/utils/countries";
import { languages } from "@/utils/languages";
import Swal from "sweetalert2";
import axios from "axios";

export default function Signup() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    nickname: "",
    major: "",
    introduce: "",
    country: "",
    state: "",
    language: "",
    password: "",
    passwordConfirm: "",
  });

  const [imageUrl, setImageUrl] = useState<string | null | File>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // 파일 업로드 핸들러

  // const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files && e.target.files[0];

  //   if (file) {
  //     const fileReader = new FileReader();
  //     fileReader.onload = (ev) => {
  //       if (ev.target?.result) {
  //         setSelectedFile()
  //       }
  //     };
  //   }
  // };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const fileReader = new FileReader();
      fileReader.onload = (ev) => {
        if (ev.target?.result) {
          setImageUrl(ev.target.result as string);
        }
      };
      fileReader.readAsDataURL(file);
    } else {
      setSelectedFile(null);
      setImageUrl(null);
    }
  };

  const handleChange = (e: FormEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.currentTarget;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const toLogin = (e: FormEvent) => {
    e.preventDefault();
    navigate("/login");
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (inputs.password !== inputs.passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      setInputs({
        ...inputs,
        password: "",
        passwordConfirm: "",
      });
    }

    if (inputs.email.split("@")[1] !== "dankook.ac.kr") {
      Swal.fire({
        icon: "error",
        title: "이메일 형식이 잘못되었습니다.",
        text: "다시 입력해주세요.",
      });
    }

    const formData = new FormData();
    formData.append("email", inputs.email);
    formData.append("nickname", inputs.nickname);
    formData.append("major", inputs.major);
    formData.append("introduce", inputs.introduce);
    formData.append("country", inputs.country);
    formData.append("state", inputs.state);
    formData.append("language", inputs.language);
    formData.append("password", inputs.password);
    formData.append("passwordConfirm", inputs.passwordConfirm);

    if (selectedFile) {
      formData.append("imageUrl", selectedFile);
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_HOST}:${
          import.meta.env.VITE_SERVER_PORT
        }/auth/signup`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );
      if (res.status === 201) {
        Swal.fire({
          icon: "success",
          title: "회원가입이 완료되었습니다.",
          text: "로그인 페이지로 이동합니다.",
        });

        navigate("/login");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const { data } = error.response;
        Swal.fire({
          icon: "error",
          title: "회원가입 실패",
          text: data.message,
        });
      }
    }
  };

  return (
    <>
      <main className="flex flex-col items-center justify-center h-screen some-element">
        <h1 className="mt-5 text-3xl font-bold text-gray-700">회원가입</h1>
        <form className="p-5 bg-white rounded shadow-lg w-1/2 grid place-items-center">
          <div className="w-10/12 px-3 mt-5 mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Email
            </label>
            <input
              name="email"
              type="email"
              className="w-10/12 px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="email"
              placeholder="12341234@dankook.ac.kr"
              onChange={handleChange}
            />
          </div>
          <div className="w-10/12 px-3 mt-5">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Nickname
            </label>
            <input
              name="nickname"
              type="text"
              className="w-10/12 px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="nickname"
              placeholder="닉네임을 입력해주세요."
              onChange={handleChange}
            />
          </div>
          <div className="w-10/12 px-3 mt-5">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="imageUrl"
            >
              Profile Image
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-10/12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              id="imageUrl"
              type="file"
              name="imageUrl"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          <div className="w-10/12 px-3 mt-5">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Major
            </label>
            <input
              name="major"
              type="text"
              className="w-10/12 px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="major"
              placeholder="전공을 입력해주세요."
              onChange={handleChange}
            />
          </div>
          <div className="w-10/12 px-3 mt-5">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Introduce
            </label>
            <input
              name="introduce"
              type="text"
              className="w-10/12 px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="introduce"
              placeholder="자기소개를 입력해주세요."
              onChange={handleChange}
            />
          </div>
          <div className="w-10/12 px-3 mt-5">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              State
            </label>
            <select
              name="state"
              id="state"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-10/12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
              onChange={handleChange}
            >
              <option selected>Choose your state</option>
              <option value="exchange">Exachange</option>
              <option value="normal">Normal</option>
            </select>
          </div>
          <div className="w-10/12 px-3 mt-5">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Country
            </label>
            <select
              name="country"
              id="countries"
              className="text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-10/12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={handleChange}
            >
              <option selected>Choose a country</option>
              {countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name} | {country.flag}
                </option>
              ))}
            </select>
          </div>

          <div className="w-10/12 px-3 mt-5">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Languages
            </label>
            <select
              name="language"
              id="language"
              className="text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-10/12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={handleChange}
            >
              <option selected>Choose a Languages</option>
              {languages.map((language) => (
                <option key={language.code} value={language.code}>
                  {language.name} | {language.flag}
                </option>
              ))}
            </select>
          </div>

          <div className="w-10/12 px-3 mt-5">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Password
            </label>
            <input
              name="password"
              type="password"
              className="w-10/12 px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="password"
              placeholder="비밀번호를 입력해주세요."
              onChange={handleChange}
            />
          </div>
          <div className="w-10/12 px-3 mt-5">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Password Confirm
            </label>
            <input
              name="passwordConfirm"
              type="password"
              className="w-10/12 px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="password-confirm"
              placeholder="비밀번호를 다시 입력해주세요."
              onChange={handleChange}
            />
          </div>
          <div className="w-full flex flex-nowrap justify-center gap-10">
            <button
              className="w-[100px] px-4 py-2 mt-5 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
              onClick={toLogin}
            >
              Cancel
            </button>
            <button
              className=" w-[100px] px-4 py-2 mt-5 font-bold text-gray-700 bg-gray-300 rounded hover:bg-gray-500 focus:outline-none focus:shadow-outline"
              type="button"
              onClick={onSubmit}
            >
              Submit
            </button>
          </div>
          <div className="w-full flex flex-nowrap justify-center gap-10">
            <p className="block text-sm text-gray-500">
              Don't you have DKU Gmail Account?
            </p>
          </div>
          <div className="w-full flex flex-nowrap justify-center gap-10">
            <a href="" className="text-blue-500 text-sm ">
              Gmail 만들러 가기!
            </a>
          </div>
        </form>
      </main>
    </>
  );
}
