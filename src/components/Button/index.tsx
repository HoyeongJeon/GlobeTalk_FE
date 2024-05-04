interface ButtonProps {
  content: string;
  onClick: () => void;
}

export default function Button({ content, onClick }: ButtonProps) {
  return (
    <>
      <button
        className="w-[100px] px-4 py-2 mt-5 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
        type="button"
        onClick={onClick}
      >
        {content}
      </button>
    </>
  );
}
