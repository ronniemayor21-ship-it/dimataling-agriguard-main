import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { findByReference } from '@/lib/store';
import { Application } from '@/lib/types';
import { Search, Clock, CheckCircle, XCircle } from 'lucide-react';
import { showAlert } from '@/lib/alerts';

const statusConfig = {
  pending: { label: 'Pending Review', icon: Clock, className: 'govt-badge-pending' },
  approved: { label: 'Approved', icon: CheckCircle, className: 'govt-badge-approved' },
  rejected: { label: 'Rejected', icon: XCircle, className: 'govt-badge-rejected' },
};

const Track = () => {
  const [ref, setRef] = useState('');
  const [result, setResult] = useState<Application | null | undefined>(undefined);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ref.trim()) {
      showAlert('Input Required', 'Please enter a reference number.', 'warning');
      return;
    }
    const found = findByReference(ref.trim());
    setResult(found ?? null);
  };

  return (
    <div className="container py-10">
      <div className="mx-auto max-w-lg">
        <div className="mb-8 text-center">
          <Search className="mx-auto mb-3 h-10 w-10 text-primary" />
          <h1 className="font-heading text-2xl font-bold">Track Your Application</h1>
          <p className="text-muted-foreground">Enter your reference number to check the status</p>
        </div>

        <form onSubmit={handleSearch} className="mb-8 flex gap-2">
          <div className="flex-1">
            <Label htmlFor="ref" className="sr-only">Reference Number</Label>
            <Input id="ref" placeholder="e.g. DAA-2506-ABC12" value={ref} onChange={e => setRef(e.target.value)} />
          </div>
          <Button type="submit">Search</Button>
        </form>

        {result === null && (
          <div className="rounded-lg border bg-card p-6 text-center">
            <XCircle className="mx-auto mb-2 h-8 w-8 text-destructive" />
            <p className="font-medium">No application found</p>
            <p className="text-sm text-muted-foreground">Please check your reference number and try again.</p>
          </div>
        )}

        {result && (
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-heading text-lg font-bold">{result.referenceNumber}</h2>
              <span className={statusConfig[result.status].className}>
                {(() => { const Icon = statusConfig[result.status].icon; return <Icon className="h-3.5 w-3.5" />; })()}
                {statusConfig[result.status].label}
              </span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Farmer</span><span className="font-medium">{result.farmerName}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Animal</span><span className="font-medium">{result.animalType} × {result.numberOfAnimals}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Value</span><span className="font-medium">₱{result.estimatedValue.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Submitted</span><span className="font-medium">{new Date(result.submittedAt).toLocaleDateString()}</span></div>
              {result.notes && <div className="mt-3 rounded bg-muted p-3 text-muted-foreground">{result.notes}</div>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Track;
