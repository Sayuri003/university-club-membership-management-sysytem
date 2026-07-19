import AuthLayout from "../../components/auth/AuthLayout";
import LoginForm from "../../components/auth/LoginForm";

function Login() {
  return (
    <PageWrapper>
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
    </PageWrapper>


  );
}

export default Login;