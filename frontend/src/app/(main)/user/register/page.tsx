import { AuthLayout } from "@/components/Auth/AuthLayout";
import { CardRegister } from "@/components/Auth/CardRegister";


export default function RegisterPage() {
  return (
    <AuthLayout>
      <CardRegister />
    </AuthLayout>
  );
}