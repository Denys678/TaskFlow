import Link from "next/link";
import { RegisterForm } from "@/features/auth/RegisterForm";

export default function Register() {
    return (
        <section className="flex flex-col min-h-screen items-center justify-center gap-6">
            <RegisterForm />
            <Link href="/login">Already have an account? Login</Link>
        </section>
    );
}