import { zodResolver } from "@hookform/resolvers/zod";
import { Boxes } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import { api } from "../api/client";
import { Button } from "../components/ui/Button";
import { useAuthStore } from "../store/auth-store";

const loginSchema = z.object({
  username: z.string().min(1, "Ingresa tu usuario"),
  password: z.string().min(1, "Ingresa tu contrasena")
});

type LoginForm = z.infer<typeof loginSchema>;

export function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  async function onSubmit(values: LoginForm) {
    try {
      const { data } = await api.post("/auth/login/", values);
      login(data);
      navigate("/");
    } catch {
      setError("root", { message: "Usuario o contrasena incorrectos." });
    }
  }

  return (
    <main className="grid min-h-screen bg-cloud px-4 py-8 dark:bg-slate-950 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="hidden place-items-center rounded-lg bg-ink p-12 text-white dark:bg-slate-900 lg:grid">
        <div className="max-w-xl">
          <Boxes size={44} aria-hidden="true" />
          <h1 className="mt-8 text-5xl font-semibold tracking-normal">Nexus Inventory System</h1>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            Gestiona productos, proveedores, stock y movimientos desde una consola moderna para equipos operativos.
          </p>
        </div>
      </section>

      <section className="flex items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-8 shadow-panel dark:border-slate-800 dark:bg-slate-900"
        >
          <p className="text-sm font-semibold uppercase text-accent">Bienvenido</p>
          <h2 className="mt-2 text-2xl font-semibold">Iniciar sesion</h2>

          <label className="mt-6 block text-sm font-medium">
            Usuario
            <input
              className="mt-2 h-11 w-full rounded-md border border-slate-200 px-3 outline-none ring-accent focus:ring-2 dark:border-slate-700 dark:bg-slate-950"
              {...register("username")}
            />
            {errors.username && <span className="mt-1 block text-sm text-rose-600">{errors.username.message}</span>}
          </label>

          <label className="mt-4 block text-sm font-medium">
            Contrasena
            <input
              type="password"
              className="mt-2 h-11 w-full rounded-md border border-slate-200 px-3 outline-none ring-accent focus:ring-2 dark:border-slate-700 dark:bg-slate-950"
              {...register("password")}
            />
            {errors.password && <span className="mt-1 block text-sm text-rose-600">{errors.password.message}</span>}
          </label>

          {errors.root && <p className="mt-4 rounded-md bg-rose-50 px-3 py-2 text-sm text-rose-700">{errors.root.message}</p>}

          <Button className="mt-6 w-full" disabled={isSubmitting}>
            {isSubmitting ? "Validando..." : "Entrar"}
          </Button>
        </form>
      </section>
    </main>
  );
}
