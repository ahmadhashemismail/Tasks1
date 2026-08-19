import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAccount, registerAccount } from "../api";

function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("login"); // "login" | "register"
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await loginAccount(loginData);
      if (res.error) {
        setError(res.error);
      } else {
        localStorage.setItem("account", JSON.stringify(res));
        navigate("/");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleRegister(e) {
    e.preventDefault();
    setError("");
    if (registerData.password !== registerData.confirm) {
      setError("incorrect password");
      return;
    }
    setLoading(true);
    try {
      const res = await registerAccount({
        name: registerData.name,
        email: registerData.email,
        password: registerData.password,
      });
      if (res.error) {
        setError(res.error);
      } else {
        setMode("login");
        setError("");
        setLoginData({ email: registerData.email, password: "" });
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-blob auth-blob-1" />
      <div className="auth-blob auth-blob-2" />

      <div className="auth-card">
        <div className="auth-brand">
          <span className="auth-logo">✅</span>
          <h1 className="auth-title">TaskFlow</h1>
          <p className="auth-subtitle">
            {mode === "login"
              ? "Welcome back! Sign in to continue."
              : "Create your free account."}
          </p>
        </div>

        <div className="auth-tabs">
          <button
            type="button"
            className={`auth-tab ${mode === "login" ? "active" : ""}`}
            onClick={() => { setMode("login"); setError(""); }}
          >
            Sign In
          </button>
          <button
            type="button"
            className={`auth-tab ${mode === "register" ? "active" : ""}`}
            onClick={() => { setMode("register"); setError(""); }}
          >
            Create Account
          </button>
        </div>

        {error && <div className="auth-error">{error}</div>}

        {mode === "login" && (
          <form className="auth-form" onSubmit={handleLogin} noValidate>
            <div className="auth-field">
              <label htmlFor="login-email">Email</label>
              <input
                id="login-email"
                type="email"
                placeholder="you@example.com"
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
                required
              />
            </div>
            <div className="auth-field">
              <label htmlFor="login-password">Password</label>
              <input
                id="login-password"
                type="password"
                placeholder="password"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
                required
              />
            </div>
            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? "Signing in…" : "Sign In →"}
            </button>
          </form>
        )}

        {mode === "register" && (
          <form className="auth-form" onSubmit={handleRegister} noValidate>
            <div className="auth-field">
              <label htmlFor="reg-name">Full Name</label>
              <input
                id="reg-name"
                type="text"
                placeholder="your name"
                value={registerData.name}
                onChange={(e) =>
                  setRegisterData({ ...registerData, name: e.target.value })
                }
                required
              />
            </div>
            <div className="auth-field">
              <label htmlFor="reg-email">Email</label>
              <input
                id="reg-email"
                type="email"
                placeholder="you@example.com"
                value={registerData.email}
                onChange={(e) =>
                  setRegisterData({ ...registerData, email: e.target.value })
                }
                required
              />
            </div>
            <div className="auth-field">
              <label htmlFor="reg-password">Password</label>
              <input
                id="reg-password"
                type="password"
                placeholder="password"
                value={registerData.password}
                onChange={(e) =>
                  setRegisterData({ ...registerData, password: e.target.value })
                }
                required
              />
            </div>
            <div className="auth-field">
              <label htmlFor="reg-confirm">Confirm Password</label>
              <input
                id="reg-confirm"
                type="password"
                placeholder="password"
                value={registerData.confirm}
                onChange={(e) =>
                  setRegisterData({ ...registerData, confirm: e.target.value })
                }
                required
              />
            </div>
            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? "Creating account…" : "Create Account →"}
            </button>
          </form>
        )}

        <p className="auth-switch">
          {mode === "login" ? (
            <>
              Don&apos;t have an account?{" "}
              <span
                className="auth-switch-link"
                onClick={() => { setMode("register"); setError(""); }}
              >
                Sign up
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                className="auth-switch-link"
                onClick={() => { setMode("login"); setError(""); }}
              >
                Sign in
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
