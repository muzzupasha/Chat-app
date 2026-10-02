import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link , useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../redux/userSlice';
import { api } from '../utils/api';

// These names match the fields expected by the backend login controller.
const initialForm = {
  userName: '',
  password: '',
};

function Login() { 
  const navigate = useNavigate(); // Hook
  const dispatch = useDispatch();

  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
 
  const handleChange = (event) => {
    const { name, value } = event.target;
    // The input name determines which value is updated in the form object.
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
    setSubmitted(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Send form to POST /api/v1/user/login when the API request is connected.
       try {
    setSubmitted(true);
    
    // Send form to POST /api/v1/user/register when the API request is connected.
    const res = await api.post('/api/v1/user/login', form,{
      headers:{
        'Content-Type':'application/json'
      },
      withCredentials:true
    })
 
    navigate('/');
    dispatch(setAuthUser(res.data))

   } catch (error) {
    toast.error(error.response?.data?.message || 'Unable to login your account.')
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
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-cyan-300">Your conversations, waiting</p>
              <h1 className="max-w-sm text-4xl font-semibold leading-tight tracking-tight">Welcome back.</h1>
              <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">Pick up where you left off and stay close to the people who matter.</p>
            </div>
            <p className="text-xs text-slate-500">Private, simple, and made for real conversations.</p>
          </div>

          <div className="p-6 sm:p-10 lg:p-12">
            <div className="mb-8 flex items-start justify-between gap-4">
              <div>
                <p className="mb-2 text-sm font-medium text-cyan-600 lg:hidden">CHATAPP</p>
                <h2 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">Log in to your account</h2>
                <p className="mt-2 text-sm text-slate-500">Welcome back. Enter your details to continue.</p>
              </div>
              <Link className="text-sm font-medium text-slate-500 transition hover:text-slate-950" to="/">
                Home
              </Link>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="userName">Username</label>
                <input autoComplete="username" className="h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10" id="userName" name="userName" onChange={handleChange} placeholder="Enter your username" required type="text" value={form.userName} />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between gap-4">
                  <label className="block text-sm font-medium text-slate-700" htmlFor="password">Password</label>
                  <button className="text-xs font-medium text-cyan-700 transition hover:text-cyan-900" type="button">Forgot password?</button>
                </div>
                <input autoComplete="current-password" className="h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10" id="password" name="password" onChange={handleChange} placeholder="Enter your password" required type="password" value={form.password} />
              </div>

              {submitted && <p className="text-sm font-medium text-emerald-600" role="status">Your login details are ready to send.</p>}

              <button className="h-12 w-full rounded-lg bg-slate-900 px-5 text-sm font-semibold text-white transition hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-500/20" type="submit">Log in</button>
            </form>

            <p className="mt-8 text-center text-sm text-slate-500">
              Don't have an account?{' '}
              <Link className="font-semibold text-cyan-700 transition hover:text-cyan-900" to="/signup">Create an account</Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Login;