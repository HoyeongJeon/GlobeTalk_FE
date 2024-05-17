import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Chat() {
  return (
    <>
      <div className="flex flex-col h-screen">
        <Header />
        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          <div className="pb-3.5">
            <h1 className="text-6xl font-bold pb-3.5">Chats</h1>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
