import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getApplications, updateApplicationStatus, isAdminLoggedIn, adminLogout, getLoggedInAdmin } from '@/lib/store';
import { Application } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { BarChart3, Clock, CheckCircle, XCircle, FileText, LogOut } from 'lucide-react';
import { showConfirm, showInput, showSuccess } from '@/lib/alerts';

const Admin = () => {
  const navigate = useNavigate();
  const [apps, setApps] = useState<Application[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!isAdminLoggedIn()) { navigate('/admin-login'); return; }
    setApps(getApplications());
  }, [navigate]);

  const refresh = () => setApps(getApplications());

  const handleApprove = async (app: Application) => {
    const result = await showInput('Approve Application', `Approve application for ${app.farmerName}?`, 'Add notes (optional)...');
    if (result.isConfirmed) {
      updateApplicationStatus(app.id, 'approved', result.value);
      showSuccess('Application Approved', `Reference: ${app.referenceNumber}`);
      refresh();
    }
  };

  const handleReject = async (app: Application) => {
    const result = await showInput('Reject Application', `Reject application for ${app.farmerName}?`, 'Reason for rejection...');
    if (result.isConfirmed) {
      updateApplicationStatus(app.id, 'rejected', result.value);
      showSuccess('Application Rejected', `Reference: ${app.referenceNumber}`);
      refresh();
    }
  };

  const handleLogout = async () => {
    const result = await showConfirm('Logout', 'Are you sure you want to log out?', 'Yes, log out');
    if (result.isConfirmed) {
      adminLogout();
      navigate('/admin-login');
    }
  };

  const filtered = apps.filter(a => {
    if (filter !== 'all' && a.status !== filter) return false;
    if (search && !a.farmerName.toLowerCase().includes(search.toLowerCase()) && !a.referenceNumber.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const counts = {
    total: apps.length,
    pending: apps.filter(a => a.status === 'pending').length,
    approved: apps.filter(a => a.status === 'approved').length,
    rejected: apps.filter(a => a.status === 'rejected').length,
  };

  const stats = [
    { label: 'Total', value: counts.total, icon: FileText, color: 'text-primary' },
    { label: 'Pending', value: counts.pending, icon: Clock, color: 'text-warning' },
    { label: 'Approved', value: counts.approved, icon: CheckCircle, color: 'text-success' },
    { label: 'Rejected', value: counts.rejected, icon: XCircle, color: 'text-destructive' },
  ];

  return (
    <div className="container py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground">Welcome, {getLoggedInAdmin()?.fullName || 'Admin'}</p>
        </div>
        <Button variant="outline" size="sm" className="gap-2" onClick={handleLogout}>
          <LogOut className="h-4 w-4" /> Logout
        </Button>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(s => (
          <div key={s.label} className="stat-card flex items-center gap-4">
            <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-muted ${s.color}`}>
              <s.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <Input placeholder="Search name or reference..." value={search} onChange={e => setSearch(e.target.value)} className="sm:max-w-xs" />
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="sm:w-40"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="rounded-lg border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Reference</TableHead>
                <TableHead>Farmer</TableHead>
                <TableHead className="hidden md:table-cell">Animal</TableHead>
                <TableHead className="hidden lg:table-cell">Value</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden sm:table-cell">Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 && (
                <TableRow><TableCell colSpan={7} className="py-8 text-center text-muted-foreground">No applications found</TableCell></TableRow>
              )}
              {filtered.map(a => (
                <TableRow key={a.id}>
                  <TableCell className="font-mono text-xs">{a.referenceNumber}</TableCell>
                  <TableCell className="font-medium">{a.farmerName}</TableCell>
                  <TableCell className="hidden md:table-cell">{a.animalType} × {a.numberOfAnimals}</TableCell>
                  <TableCell className="hidden lg:table-cell">₱{a.estimatedValue.toLocaleString()}</TableCell>
                  <TableCell>
                    <span className={a.status === 'pending' ? 'govt-badge-pending' : a.status === 'approved' ? 'govt-badge-approved' : 'govt-badge-rejected'}>
                      {a.status}
                    </span>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-xs text-muted-foreground">{new Date(a.submittedAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {a.status === 'pending' && (
                      <div className="flex gap-1">
                        <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => handleApprove(a)}>Approve</Button>
                        <Button size="sm" variant="outline" className="h-7 text-xs text-destructive" onClick={() => handleReject(a)}>Reject</Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>


    </div>
  );
};

export default Admin;
