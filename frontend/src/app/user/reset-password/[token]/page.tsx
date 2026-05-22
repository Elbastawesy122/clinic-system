import { AuthLayout } from "@/components/Auth/AuthLayout";
import { CardResetPassword } from "@/components/Auth/CardResetPassword";

export default function ResetPasswordPage() {
  return (
    <AuthLayout>
      <CardResetPassword />
    </AuthLayout>
  );
}