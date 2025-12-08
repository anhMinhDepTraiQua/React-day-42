import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom"; // ✅ Sửa import này
import loginSchema from "../../schemas/loginSchema";
import { useLoginMutation } from "../../services/auth";

export default function Login() {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const onSubmit = async (data) => {
    try {
      await login(data).unwrap();
      navigate("/home");
    } catch (error) {
      const errorMessage = error?.data?.message || "Đăng nhập thất bại!";
      alert(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto p-4 space-y-4 bg-white rounded shadow-md w-full"
      >
        <h2 className="text-xl font-bold text-center">Đăng nhập</h2>

        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            {...register("email")}
            className="w-full border px-3 py-2 rounded"
            disabled={isLoading}
          />
          <p className="text-red-500 text-sm">{errors.email?.message}</p>
        </div>

        <div>
          <label className="block mb-1">Mật khẩu</label>
          <input
            type="password"
            {...register("password")}
            className="w-full border px-3 py-2 rounded"
            disabled={isLoading}
          />
          <p className="text-red-500 text-sm">{errors.password?.message}</p>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded cursor-pointer disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>

        <p className="text-center">
          Chưa có tài khoản?{" "}
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="text-blue-600 cursor-pointer underline"
          >
            Đăng ký
          </button>
        </p>
      </form>
    </div>
  );
}