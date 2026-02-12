import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const Contact = () => (
  <div className="container py-10">
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-2 text-center font-heading text-2xl font-bold">Contact Us</h1>
      <p className="mb-8 text-center text-muted-foreground">Reach the Municipal Agriculture Office for inquiries</p>

      <div className="grid gap-4 sm:grid-cols-2">
        {[
          { icon: MapPin, title: 'Office Address', desc: 'Municipal Agriculture Office, Municipal Hall, Dimataling, Zamboanga del Sur' },
          { icon: Phone, title: 'Phone', desc: '(062) 000-0000' },
          { icon: Mail, title: 'Email', desc: 'agriculture@dimataling.gov.ph' },
          { icon: Clock, title: 'Office Hours', desc: 'Monday – Friday, 8:00 AM – 5:00 PM' },
        ].map((c, i) => (
          <div key={i} className="flex gap-4 rounded-lg border bg-card p-5 shadow-sm">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <c.icon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold">{c.title}</h3>
              <p className="text-sm text-muted-foreground">{c.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Contact;
