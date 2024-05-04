import Footer from "@/components/Footer";

export default function Main() {
  return (
    <>
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">Welcome to Next.js</h1>
        <p className="mt-3 text-2xl">Get started by editing</p>
        <a
          href="https://nextjs.org/docs"
          className="text-primary-600 dark:text-primary-400"
        >
          Next.js documentation
        </a>
      </main>
      <Footer />
    </>
  );
}
