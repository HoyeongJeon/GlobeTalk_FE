export default function Login() {
  return (
    <>
      <main className="flex flex-col items-center justify-center h-screen some-element">
        <div className="w-full flex flex-nowrap justify-center gap-10">
          <button className="w-[100px] px-4 py-2 mt-5 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline">
            로그인
          </button>
          <button
            className=" w-[100px] px-4 py-2 mt-5 font-bold text-gray-700 bg-gray-300 rounded hover:bg-gray-500 focus:outline-none focus:shadow-outline"
            type="button"
          >
            회원가입
          </button>
        </div>
      </main>
    </>
  );
}
