import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center mt-10 gap-6">
      <h1 className="text-2xl font-bold">Home page</h1>

      <div className="flex gap-4">
        <Link
          to="/hoc-demo"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          HOC Demo
        </Link>

        <Link
          to="/render-props-demo"
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Render Props Demo
        </Link>
      </div>
    </div>
  );
}
