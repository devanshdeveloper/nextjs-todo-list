export default function Loader({
  height = "100vh",
  width = "100vw",
  text = "",
}) {
  return (
    <div
      className="bg-white absolute z-[100] flex items-center justify-center"
      style={{ height, width }}
    >
      <div className="flex flex-col items-center gap-5">
        <Spinner />
        {text}
      </div>
    </div>
  );
}

export function Spinner() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="animate-spin"
    >
      <path
        d="M23 12C23 18.0751 18.0751 23 12 23"
        stroke="#000"
        strokeWidth="2"
        strokeLinecap="round"
      ></path>
    </svg>
  );
}
