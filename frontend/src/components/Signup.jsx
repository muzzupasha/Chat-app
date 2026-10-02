import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios'

// These names match the fields expected by the backend register controller.
const initialForm = {
  fullName: '',
  userName: '',
  password: '',
  confirmPassword: '',
  gender: '',
};
 


function Signup() {
  const navigate = useNavigate() // navigate

  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    // Using the input name lets one handler update every form field.
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
    setSubmitted(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
   try {
     // Keep this validation here so mismatched passwords never reach the API.
    if (form.password !== form.confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }
    setSubmitted(true);
    
    // Send form to POST /api/v1/user/register when the API request is connected.
    const res = await axios.post('http://localhost:5000/api/v1/user/register', form,{
      headers:{
        'Content-Type':'application/json'
      },
      withCredentials:true
    })
    if (res.data.success) {
      toast.success(res.data.message);
      setForm(initialForm);
      setSubmitted(false);
      navigate('/login');
    }
    console.log('Signup payload:', res);

   } catch (error) {
     toast.error(error.response?.data?.message || 'Unable to create your account.');
   }
  };

  return (
    <main className="h-full min-h-0 w-full overflow-y-auto bg-slate-50 px-4 py-6 text-slate-900 sm:px-8 sm:py-10">
      <div className="mx-auto flex min-h-full max-w-6xl items-center justify-center sm:min-h-[calc(100vh-5rem)]">
        <section className="grid w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_24px_70px_-35px_rgba(15,23,42,0.35)] lg:grid-cols-[0.82fr_1.18fr]">
          <div className="hidden bg-slate-900 p-12 text-white lg:flex lg:flex-col lg:justify-between">
            <div>
              <div className="mb-16 flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-400 text-sm font-bold text-slate-950">C</span>
                <span className="text-sm font-semibold tracking-[0.18em] text-slate-200">CHATAPP</span>
              </div>
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-cyan-300">A better way to connect</p>
              <h1 className="max-w-sm text-4xl font-semibold leading-tight tracking-tight">Good conversations start here.</h1>
              <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">Create your account and keep the people who matter within reach.</p>
            </div>
            <p className="text-xs text-slate-500">Private, simple, and made for real conversations.</p>
          </div>

          <div className="p-6 sm:p-10 lg:p-12">
            <div className="mb-8 flex items-start justify-between gap-4">
              <div>
                <p className="mb-2 text-sm font-medium text-cyan-600 lg:hidden">CHATAPP</p>
                <h2 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">Create your account</h2>
                <p className="mt-2 text-sm text-slate-500">It only takes a minute to get started.</p>
              </div>
              <Link className="text-sm font-medium text-slate-500 transition hover:text-slate-950" to="/">
                Home
              </Link>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="fullName">Full name</label>
                <input className="h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10" id="fullName" name="fullName" onChange={handleChange} placeholder="Enter your full name" required type="text" value={form.fullName} />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="userName">Username</label>
                <input className="h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10" id="userName" name="userName" onChange={handleChange} placeholder="Choose a username" required type="text" value={form.userName} />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="password">Password</label>
                  <input className="h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10" id="password" name="password" onChange={handleChange} placeholder="Create a password" required type="password" value={form.password} />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="confirmPassword">Confirm password</label>
                  <input className="h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10" id="confirmPassword" name="confirmPassword" onChange={handleChange} placeholder="Repeat your password" required type="password" value={form.confirmPassword} />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="gender">Gender</label>
                <select className="h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10" id="gender" name="gender" onChange={handleChange} required value={form.gender}>
                  <option disabled value="">Select your gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <button className="h-12 w-full rounded-lg bg-slate-900 px-5 text-sm font-semibold text-white transition hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-500/20" type="submit">Create account</button>
            </form>

            <p className="mt-8 text-center text-sm text-slate-500">
              Already have an account?{' '}
              <Link className="font-semibold text-cyan-700 transition hover:text-cyan-900" to="/login">Log in</Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Signup;