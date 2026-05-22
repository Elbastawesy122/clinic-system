import { AuthLayout } from "@/components/Auth/AuthLayout";
import { CardForgotPassword } from "@/components/Auth/CardForgotPassword";

export default function ResetPasswordPage() {
  return (
    <AuthLayout>
      <CardForgotPassword />
    </AuthLayout>
  );
}