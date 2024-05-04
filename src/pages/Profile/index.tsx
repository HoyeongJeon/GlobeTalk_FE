import Footer from "@/components/Footer";

export default function Profile() {
  return (
    <>
      <div className="flex flex-col h-screen">
        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          <div className="pb-3.5">
            <h1 className="text-6xl font-bold pb-3.5">Profile</h1>
          </div>
          <div className="relative">
            <div className="w-80 h-80 flex justify-center">
              <img
                className="object-cover object-center shadow-lg rounded-lg"
                src="https://unsplash.it/400/400"
              />
              <div className="p-4 mx-auto h-80">
                <p className="text-3xl font-normal tracking-normal text-gray-800 tk-brandon-grotesque">
                  닉네임
                </p>
                <p className="text-3xl font-normal tracking-normal text-gray-800 tk-brandon-grotesque">
                  일반 / 교환
                </p>
                <p className="text-3xl font-normal tracking-normal text-gray-800 tk-brandon-grotesque">
                  학과
                </p>
                <p className="text-3xl font-normal tracking-normal text-gray-800 tk-brandon-grotesque">
                  출신 국가
                </p>

                <p className="text-3xl font-normal tracking-normal text-gray-800 tk-brandon-grotesque">
                  자기소개
                </p>

                <div className="w-full flex flex-nowrap justify-center gap-10">
                  <button
                    className="w-[100px] px-4 py-2 mt-5 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                    type="button"
                  >
                    Cancel
                  </button>
                  <button
                    className=" w-[100px] px-4 py-2 mt-5 font-bold text-gray-700 bg-gray-300 rounded hover:bg-gray-500 focus:outline-none focus:shadow-outline"
                    type="button"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
