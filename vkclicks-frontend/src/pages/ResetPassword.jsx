import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ResetPassword() {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setErr(""); setMsg(""); setLoading(true);
    const new_password = e.target.new_password.value;
    const confirm = e.target.confirm.value;

    if (new_password !== confirm) {
      setErr("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/api/auth/reset/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid, token, new_password })
      });
      if (res.ok) {
        setMsg("Password updated! You can now log in.");
        setTimeout(() => navigate("/login"), 1800);
      } else {
        const data = await res.json();
        setErr(data.detail || "Reset failed. Try the link again.");
      }
    } catch {
      setErr("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container" style={{ paddingTop: 120, maxWidth: 480 }}>
      <h2 className="mb-4 text-center">Set a New Password</h2>
      {msg && <div className="alert alert-success">{msg}</div>}
      {err && <div className="alert alert-danger">{err}</div>}
      {!msg && (
        <form onSubmit={handleSubmit}>
          <input
            name="new_password"
            type="password"
            className="form-control mb-3"
            placeholder="New password"
            minLength={6}
            required
          />
          <input
            name="confirm"
            type="password"
            className="form-control mb-4"
            placeholder="Confirm new password"
            minLength={6}
            required
          />
          <button className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Changing password..." : "Set New Password"}
          </button>
        </form>
      )}
    </div>
  );
}
