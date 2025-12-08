import * as Yup from "yup";

export const registerSchema = Yup.object({
  fullName: Yup.string()
    .trim()
    .required("Họ tên là bắt buộc")
    .min(3, "Họ tên phải có ít nhất 3 ký tự"),

  email: Yup.string()
    .required("Email là bắt buộc")
    .email("Email không hợp lệ"),

  password: Yup.string()
    .required("Mật khẩu là bắt buộc")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),

  confirmPassword: Yup.string()
    .required("Vui lòng nhập lại mật khẩu")
    .oneOf([Yup.ref("password")], "Mật khẩu nhập lại không khớp"),
});
