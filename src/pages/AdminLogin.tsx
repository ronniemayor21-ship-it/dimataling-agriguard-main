import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { adminLogin, registerAdmin } from '@/lib/store';
import { Lock, UserPlus } from 'lucide-react';
import { showAlert, showSuccess, showError } from '@/lib/alerts';

const AdminLogin = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      showAlert('Missing Fields', 'Please enter both username and password.', 'warning');
      return;
    }
    const result = adminLogin(username, password);
    if (result) {
      showSuccess('Welcome!', `Logged in as ${result.fullName}`).then(() => {
        navigate('/admin');
      });
    } else {
      showError('Login Failed', 'Invalid username or password. Please try again.');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !username || !password || !confirmPassword) {
      showAlert('Missing Fields', 'Please fill in all fields.', 'warning');
      return;
    }
    if (password !== confirmPassword) {
      showError('Password Mismatch', 'Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      showAlert('Weak Password', 'Password must be at least 6 characters.', 'warning');
      return;
    }
    const result = registerAdmin(username, password, fullName);
    if (result.success) {
      showSuccess('Account Created!', 'You can now log in with your credentials.').then(() => {
        setIsRegister(false);
        setPassword('');
        setConfirmPassword('');
        setFullName('');
      });
    } else {
      showError('Registration Failed', result.message);
    }
  };

  return (
    <div className="container flex min-h-[60vh] items-center justify-center py-10">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            {isRegister ? <UserPlus className="h-7 w-7 text-primary" /> : <Lock className="h-7 w-7 text-primary" />}
          </div>
          <h1 className="font-heading text-2xl font-bold">{isRegister ? 'Create Admin Account' : 'Admin Login'}</h1>
          <p className="text-sm text-muted-foreground">{isRegister ? 'Register a new admin account' : 'Authorized personnel only'}</p>
        </div>

        {!isRegister ? (
          <form onSubmit={handleLogin} className="space-y-4 rounded-lg border bg-card p-6 shadow-sm">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input id="username" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="pw">Password</Label>
              <Input id="pw" type="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <Button type="submit" className="w-full">Sign In</Button>
            <div className="text-center">
              <button type="button" onClick={() => setIsRegister(true)} className="text-sm text-primary underline-offset-4 hover:underline">
                Create an admin account
              </button>
            </div>
            <p className="text-center text-xs text-muted-foreground">Default: admin / admin123</p>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4 rounded-lg border bg-card p-6 shadow-sm">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" placeholder="Enter full name" value={fullName} onChange={e => setFullName(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="regUser">Username</Label>
              <Input id="regUser" placeholder="Choose a username" value={username} onChange={e => setUsername(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="regPw">Password</Label>
              <Input id="regPw" type="password" placeholder="Create password (min 6 chars)" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="regConfirm">Confirm Password</Label>
              <Input id="regConfirm" type="password" placeholder="Confirm password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
            </div>
            <Button type="submit" className="w-full">Create Account</Button>
            <div className="text-center">
              <button type="button" onClick={() => setIsRegister(false)} className="text-sm text-primary underline-offset-4 hover:underline">
                Back to login
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminLogin;
