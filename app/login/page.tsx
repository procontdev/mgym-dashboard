"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, Loader2, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        router.push("/dashboard");
        router.refresh(); // Ensure layout reflects auth state
      } else {
        const data = await response.json();
        setError(data.message || "Usuario o contraseña incorrectos");
      }
    } catch (err) {
      setError("Error al conectar con el servidor. Inténtalo de nuevo.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-2">
            MGym <span className="text-primary italic">Admin</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400">Panel de Control Dashboard</p>
        </div>

        <div className="bg-white dark:bg-gray-900 shadow-2xl rounded-2xl border border-gray-100 dark:border-gray-800 p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label 
                htmlFor="username" 
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Usuario
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                  <User size={18} />
                </div>
                <input
                  id="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 dark:border-gray-800 rounded-xl bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all dark:text-white"
                  placeholder="admin"
                />
              </div>
            </div>

            <div>
              <label 
                htmlFor="password" 
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Contraseña
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 dark:border-gray-800 rounded-xl bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all dark:text-white"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-4 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 rounded-xl border border-red-100 dark:border-red-900/50 animate-in fade-in slide-in-from-top-2">
                <AlertCircle size={16} className="shrink-0" />
                <p>{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center py-3.5 px-4 rounded-xl text-white font-semibold bg-gray-900 dark:bg-white dark:text-gray-900 hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={20} />
                  Iniciando sesión...
                </>
              ) : (
                "Acceder al Dashboard"
              )}
            </button>
          </form>
        </div>

        <p className="mt-8 text-center text-sm text-gray-400 dark:text-gray-600">
          &copy; {new Date().getFullYear()} MGym Management. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
}
