import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { saveApplication } from '@/lib/store';
import { showAlert } from '@/lib/alerts';
import { FileText, CheckCircle } from 'lucide-react';

const animalTypes = ['Carabao', 'Cattle', 'Goat', 'Swine', 'Poultry (Chicken)', 'Poultry (Duck)', 'Horse', 'Other'];

const Apply = () => {
  const navigate = useNavigate();

  const [submitted, setSubmitted] = useState<string | null>(null);
  const [form, setForm] = useState({
    farmerName: '', address: '', contactNumber: '', animalType: '', numberOfAnimals: '', estimatedValue: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.farmerName || !form.address || !form.contactNumber || !form.animalType || !form.numberOfAnimals || !form.estimatedValue) {
      showAlert('Missing fields', 'Please fill in all required fields.', 'warning');
      return;
    }
    const app = saveApplication({
      farmerName: form.farmerName,
      address: form.address,
      contactNumber: form.contactNumber,
      animalType: form.animalType,
      numberOfAnimals: parseInt(form.numberOfAnimals),
      estimatedValue: parseFloat(form.estimatedValue),
    });
    setSubmitted(app.referenceNumber);
  };

  if (submitted) {
    return (
      <div className="container flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
        <CheckCircle className="mb-4 h-16 w-16 text-success" />
        <h1 className="mb-2 font-heading text-2xl font-bold">Application Submitted!</h1>
        <p className="mb-4 text-muted-foreground">Your insurance application has been received.</p>
        <div className="mb-6 rounded-lg border bg-muted px-6 py-4">
          <p className="text-sm text-muted-foreground">Your Reference Number</p>
          <p className="font-heading text-2xl font-bold text-primary">{submitted}</p>
        </div>
        <p className="mb-6 max-w-md text-sm text-muted-foreground">
          Please save this reference number. You can use it to track your application status.
        </p>
        <div className="flex gap-3">
          <Button onClick={() => navigate('/track')}>Track Application</Button>
          <Button variant="outline" onClick={() => { setSubmitted(null); setForm({ farmerName: '', address: '', contactNumber: '', animalType: '', numberOfAnimals: '', estimatedValue: '' }); }}>
            Submit Another
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-10">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <FileText className="mx-auto mb-3 h-10 w-10 text-primary" />
          <h1 className="font-heading text-2xl font-bold">Apply for Animal Insurance</h1>
          <p className="text-muted-foreground">Fill out the form below to submit your application</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 rounded-lg border bg-card p-6 shadow-sm">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input id="name" placeholder="Juan Dela Cruz" value={form.farmerName} onChange={e => setForm(p => ({ ...p, farmerName: e.target.value }))} />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="address">Complete Address *</Label>
              <Textarea id="address" placeholder="Barangay, Municipality, Province" value={form.address} onChange={e => setForm(p => ({ ...p, address: e.target.value }))} />
            </div>
            <div>
              <Label htmlFor="contact">Contact Number *</Label>
              <Input id="contact" placeholder="09XX-XXX-XXXX" value={form.contactNumber} onChange={e => setForm(p => ({ ...p, contactNumber: e.target.value }))} />
            </div>
            <div>
              <Label htmlFor="animal">Type of Animal *</Label>
              <Select value={form.animalType} onValueChange={v => setForm(p => ({ ...p, animalType: v }))}>
                <SelectTrigger><SelectValue placeholder="Select animal type" /></SelectTrigger>
                <SelectContent>
                  {animalTypes.map(a => <SelectItem key={a} value={a}>{a}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="count">Number of Animals *</Label>
              <Input id="count" type="number" min="1" placeholder="1" value={form.numberOfAnimals} onChange={e => setForm(p => ({ ...p, numberOfAnimals: e.target.value }))} />
            </div>
            <div>
              <Label htmlFor="value">Estimated Value (₱) *</Label>
              <Input id="value" type="number" min="0" placeholder="50000" value={form.estimatedValue} onChange={e => setForm(p => ({ ...p, estimatedValue: e.target.value }))} />
            </div>
          </div>

          <div className="rounded-md border border-dashed bg-muted/50 p-6 text-center">
            <p className="text-sm text-muted-foreground">
              📎 Photo and document uploads will be available in a future update. Please bring physical copies to the Municipal Agriculture Office.
            </p>
          </div>

          <Button type="submit" size="lg" className="w-full">Submit Application</Button>
        </form>
      </div>
    </div>
  );
};

export default Apply;
