import { Application } from './types';

const STORAGE_KEY = 'daaips_applications';
const ADMIN_KEY = 'daaips_admin_auth';
const ADMIN_ACCOUNTS_KEY = 'daaips_admin_accounts';

export interface AdminAccount {
  id: string;
  username: string;
  password: string;
  fullName: string;
  createdAt: string;
}

function generateRef(): string {
  const now = new Date();
  const y = now.getFullYear().toString().slice(2);
  const m = (now.getMonth() + 1).toString().padStart(2, '0');
  const r = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `DAA-${y}${m}-${r}`;
}

export function getApplications(): Application[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveApplication(data: Omit<Application, 'id' | 'referenceNumber' | 'status' | 'submittedAt' | 'updatedAt'>): Application {
  const apps = getApplications();
  const app: Application = {
    ...data,
    id: crypto.randomUUID(),
    referenceNumber: generateRef(),
    status: 'pending',
    submittedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  apps.push(app);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(apps));
  return app;
}

export function updateApplicationStatus(id: string, status: Application['status'], notes?: string): Application | null {
  const apps = getApplications();
  const idx = apps.findIndex(a => a.id === id);
  if (idx === -1) return null;
  apps[idx].status = status;
  apps[idx].updatedAt = new Date().toISOString();
  if (notes) apps[idx].notes = notes;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(apps));
  return apps[idx];
}

export function findByReference(ref: string): Application | undefined {
  return getApplications().find(a => a.referenceNumber.toLowerCase() === ref.toLowerCase());
}

// Admin accounts
function getAdminAccounts(): AdminAccount[] {
  const data = localStorage.getItem(ADMIN_ACCOUNTS_KEY);
  if (!data) {
    // Seed default admin
    const defaultAdmin: AdminAccount = {
      id: 'default',
      username: 'admin',
      password: 'admin123',
      fullName: 'System Administrator',
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem(ADMIN_ACCOUNTS_KEY, JSON.stringify([defaultAdmin]));
    return [defaultAdmin];
  }
  return JSON.parse(data);
}

export function adminLogin(username: string, password: string): AdminAccount | null {
  const accounts = getAdminAccounts();
  const found = accounts.find(a => a.username === username && a.password === password);
  if (found) {
    localStorage.setItem(ADMIN_KEY, JSON.stringify({ id: found.id, username: found.username, fullName: found.fullName }));
    return found;
  }
  return null;
}

export function registerAdmin(username: string, password: string, fullName: string): { success: boolean; message: string } {
  const accounts = getAdminAccounts();
  if (accounts.find(a => a.username === username)) {
    return { success: false, message: 'Username already exists.' };
  }
  const newAdmin: AdminAccount = {
    id: crypto.randomUUID(),
    username,
    password,
    fullName,
    createdAt: new Date().toISOString(),
  };
  accounts.push(newAdmin);
  localStorage.setItem(ADMIN_ACCOUNTS_KEY, JSON.stringify(accounts));
  return { success: true, message: 'Account created successfully!' };
}

export function isAdminLoggedIn(): boolean {
  return localStorage.getItem(ADMIN_KEY) !== null;
}

export function getLoggedInAdmin(): { id: string; username: string; fullName: string } | null {
  const data = localStorage.getItem(ADMIN_KEY);
  return data ? JSON.parse(data) : null;
}

export function adminLogout(): void {
  localStorage.removeItem(ADMIN_KEY);
}
