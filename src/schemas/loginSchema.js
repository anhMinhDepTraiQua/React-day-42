import * as yup from "yup";


const loginSchema = yup.object().shape({
email: yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
password: yup.string().required("Mật khẩu là bắt buộc"),
});


export default loginSchema;