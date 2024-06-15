import Footer from "@/components/Footer";
import { useProfileStore } from "@/stores/profileStore";
import { languages } from "@/utils/languages";
import axios from "axios";
import { join } from "path";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function ProfileEdit() {
  const { Profile } = useProfileStore((state) => state);
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    nickname: "",
    major: "",
    introduce: "",
    language: "",
  });

  const [imageUrl, setImageUrl] = useState<string | null | File>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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
      alert("이미지가 변경되었습니다.");
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
    const formData = new FormData();
    formData.append(
      "nickname",
      inputs.nickname ? inputs.nickname : Profile.nickname
    );
    formData.append("major", inputs.major ? inputs.major : Profile.major);
    formData.append(
      "introduce",
      inputs.introduce ? inputs.introduce : Profile.introduce
    );
    formData.append(
      "language",
      inputs.language ? inputs.language : Profile.language[0]
    );

    if (selectedFile) {
      formData.append("imageUrl", selectedFile);
    }
    try {
      // axios 요청 시 put 은 form-data와 함께 사용 안되는 이슈.
      const res = await axios.put(
        `${import.meta.env.VITE_SERVER_HOST}:${
          import.meta.env.VITE_SERVER_PORT
        }/users/me`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "프로필 업데이트 완료",
        });

        navigate("/me");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        Swal.fire({
          icon: "error",
          title: "프로필 업데이트 실패",
        });
      }
    }
  };

  return (
    <>
      <div className="flex flex-col h-screen">
        <main className="flex flex-col items-center justify-center h-screen some-element">
          <h1 className="mt-5 text-3xl font-bold text-gray-700">
            Profile Edit
          </h1>
          <form className="p-5 bg-white rounded shadow-lg w-1/2 grid place-items-center">
            <div className="w-10/12 px-3 mt-5">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="nickname"
              >
                Nickname
              </label>
              <input
                name="nickname"
                type="text"
                className="w-10/12 px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="nickname"
                placeholder="닉네임을 입력해주세요."
                defaultValue={Profile.nickname}
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
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="major"
              >
                Major
              </label>
              <input
                name="major"
                type="text"
                className="w-10/12 px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="major"
                placeholder="전공을 입력해주세요."
                defaultValue={Profile.major}
                onChange={handleChange}
              />
            </div>
            <div className="w-10/12 px-3 mt-5">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="introduce"
              >
                Introduce
              </label>
              <input
                name="introduce"
                type="text"
                className="w-10/12 px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="introduce"
                placeholder="자기소개를 입력해주세요."
                defaultValue={Profile.introduce}
                onChange={handleChange}
              />
            </div>

            <div className="w-10/12 px-3 mt-5">
              <label className="block mb-2 text-sm font-bold text-gray-700">
                Languages
              </label>
              <select
                name="language"
                id="language"
                className="text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-10/12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                defaultValue={Profile.language}
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
          </form>
        </main>
        <Footer />
      </div>
    </>
  );
}
