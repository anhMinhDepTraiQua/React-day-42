import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../schemas/registerSchema.js";
import { useRegisterMutation } from "../../services/auth";
import { useNavigate } from "react-router";

export default function Register() {
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(registerSchema) });

  const onSubmit = async (data) => {
    try {
      await registerUser(data).unwrap();
      alert("Đăng ký thành công!");
      navigate("/login");
    } catch (error) {
      alert(error?.data?.message || "Đăng ký thất bại");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white rounded-lg shadow-md p-8 space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Đăng ký tài khoản
        </h2>

        {/* Fullname */}
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
            Họ tên
          </label>
          <input
            type="text"
            id="fullName"
            {...register("fullName")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
          />
          <p className="text-red-500 text-sm mt-1">{errors.fullName?.message}</p>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
          />
          <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Mật khẩu
          </label>
          <input
            type="password"
            id="password"
            {...register("password")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
          />
          <p className="text-red-500 text-sm mt-1">{errors.password?.message}</p>
        </div>

        {/* Confirm Password */}
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Xác nhận mật khẩu
          </label>
          <input
            type="password"
            id="confirmPassword"
            {...register("confirmPassword")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
          />
          <p className="text-red-500 text-sm mt-1">{errors.confirmPassword?.message}</p>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {isLoading ? "Đang đăng ký..." : "Đăng ký"}
        </button>

        <p className="text-center text-sm text-gray-600">
          Đã có tài khoản? <a href="/login" className="text-blue-600">Đăng nhập</a>
        </p>
      </form>
    </div>
  );
}
