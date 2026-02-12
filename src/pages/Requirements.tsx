import { CheckCircle, FileText, Camera, MapPin } from 'lucide-react';

const requirements = [
  { icon: FileText, title: 'Valid ID', desc: 'Government-issued ID (National ID, PhilSys, Voter\'s ID, or Barangay Certificate)' },
  { icon: FileText, title: 'Barangay Clearance', desc: 'Clearance from your Barangay certifying you are a resident and farmer' },
  { icon: Camera, title: 'Animal Photos', desc: 'Clear photos of the animal(s) to be insured — front, side, and any distinguishing marks' },
  { icon: FileText, title: 'Proof of Ownership', desc: 'Certificate of ownership, purchase receipt, or sworn affidavit of ownership' },
  { icon: MapPin, title: 'Farm Location', desc: 'Complete address including barangay, sitio/purok, and landmarks' },
  { icon: FileText, title: 'Animal Health Certificate', desc: 'Certificate from a licensed veterinarian or Municipal Veterinary Office (if available)' },
];

const Requirements = () => (
  <div className="container py-10">
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-2 text-center font-heading text-2xl font-bold">Requirements</h1>
      <p className="mb-8 text-center text-muted-foreground">Prepare the following before applying for animal insurance</p>

      <div className="space-y-4">
        {requirements.map((r, i) => (
          <div key={i} className="flex gap-4 rounded-lg border bg-card p-5 shadow-sm">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <r.icon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold">{r.title}</h3>
              <p className="text-sm text-muted-foreground">{r.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-lg border bg-muted p-5">
        <div className="flex items-start gap-3">
          <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-success" />
          <div>
            <h4 className="font-heading font-bold">Note</h4>
            <p className="text-sm text-muted-foreground">
              Bring original copies to the Municipal Agriculture Office for verification. Applications are subject to inspection and approval by the MAO staff.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Requirements;
