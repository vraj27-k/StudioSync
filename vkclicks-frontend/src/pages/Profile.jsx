import { useState, useEffect } from "react";

export default function Profile({ onSaved }) {
  const token = localStorage.getItem("photographerToken");
  const [fields, setFields] = useState({
    phone_number: "",
    location: "",
    bio: "",
    type_of_photography: "",
    profile_picture: null
  });
  const [msg, setMsg] = useState("");
  const [preview, setPreview] = useState("");

  // Fetch existing profile data if needed
  useEffect(() => {
    if (!token) return;
    fetch("http://localhost:8000/api/photographer/profile/", {
      headers: { Authorization: `Token ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (data.profile_exists === false) return; // first time
        setFields(f => ({ ...f, ...data }));
        if (data.profile_picture)
          setPreview("http://localhost:8000" + data.profile_picture);
      });
  }, [token]);

  function handleChange(e) {
    if (e.target.type === "file") {
      setFields(f => ({ ...f, profile_picture: e.target.files[0] }));
      setPreview(URL.createObjectURL(e.target.files[0]));
    } else {
      setFields(f => ({ ...f, [e.target.name]: e.target.value }));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg("");
    const data = new FormData();
    Object.entries(fields).forEach(([k, v]) => {
      if (v) data.append(k, v);
    });
    const res = await fetch("http://localhost:8000/api/photographer/profile/", {
      method: "POST",
      headers: { Authorization: `Token ${token}` },
      body: data
    });
    if (res.ok) setMsg("Profile saved!");
    else setMsg("Failed to save. Check required fields.");
    onSaved && onSaved();
  }

  return (
    <form onSubmit={handleSubmit} className="container" style={{ maxWidth: 480, paddingTop: 120 }}>
      <h2 className="mb-4">Your Profile</h2>
      {msg && <div className="alert alert-info">{msg}</div>}
      <input name="phone_number" className="form-control mb-2" placeholder="Phone number" value={fields.phone_number} onChange={handleChange} required />
      <input name="location" className="form-control mb-2" placeholder="Location (City/Area)" value={fields.location} onChange={handleChange} />
      <textarea name="bio" className="form-control mb-2" placeholder="Bio" value={fields.bio} onChange={handleChange}></textarea>
      <input name="type_of_photography" className="form-control mb-2" placeholder="Event types: Wedding,Birthday,Event" value={fields.type_of_photography} onChange={handleChange} required />
      <div className="mb-2">
        Profile picture:
        <input type="file" name="profile_picture" accept="image/*" className="form-control mt-1" onChange={handleChange} />
        {preview ? <img src={preview} alt="Preview" style={{ maxWidth: 100, marginTop: 6 }} /> : null}
      </div>
      <button className="btn btn-primary w-100">Save Profile</button>
    </form>
  );
}
