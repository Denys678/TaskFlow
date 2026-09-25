import Link from "next/link";
import { LoginForm } from "@/features/auth/LoginForm";

export default function Login() {
    return (
        <section className="flex min-h-screen flex-col items-center justify-center gap-6">
            <LoginForm />
            <Link href="/register">Don't have an account? Register</Link>
        </section>
    )
}