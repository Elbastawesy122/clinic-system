import { AuthLayout } from "@/components/Auth/AuthLayout";
import { CardVerifyEmail } from "@/components/Auth/CardVerifyEmail";

export default function CheckEmailPage() {
  return (
    <AuthLayout>
      <CardVerifyEmail />
    </AuthLayout>
  );
}