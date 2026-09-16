import { RegistrationForm } from "@/components/RegistrationForm";
import { Navbar } from "@/components/Navbar";

export default function RegisterPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center pt-24 pb-12 px-6">
        <RegistrationForm />
      </main>
    </>
  );
}
