import { Link } from 'react-router-dom';
import { Shield, FileText, Search, Users, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroBg from '@/assets/hero-bg.jpg';

const features = [
  { icon: FileText, title: 'Easy Application', desc: 'Submit your animal insurance application online with a simple form.' },
  { icon: Search, title: 'Track Status', desc: 'Monitor your application status anytime using your reference number.' },
  { icon: Shield, title: 'Protected Livestock', desc: 'Insure your carabao, cattle, goats, swine, and poultry.' },
  { icon: Users, title: 'LGU Managed', desc: 'Processed and approved by the Municipal Agriculture Office.' },
];

const steps = [
  'Prepare your documents and animal photos',
  'Fill out the online insurance application form',
  'Receive your reference number after submission',
  'Track your application until approval',
];

const Index = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[520px] overflow-hidden">
        <img src={heroBg} alt="Philippine agriculture landscape" className="absolute inset-0 h-full w-full object-cover" />
        <div className="hero-overlay absolute inset-0" />
        <div className="container relative z-10 flex min-h-[520px] flex-col items-center justify-center py-20 text-center">
          <span className="mb-4 inline-block rounded-full border border-primary-foreground/30 bg-primary-foreground/10 px-4 py-1.5 text-sm font-medium text-primary-foreground">
            Municipality of Dimataling
          </span>
          <h1 className="mb-4 max-w-3xl font-heading text-3xl font-bold leading-tight text-primary-foreground sm:text-4xl md:text-5xl">
            Agriculture Animal Insurance Processing System
          </h1>
          <p className="mb-8 max-w-xl text-lg text-primary-foreground/85">
            Protecting the livelihood of Dimataling's farmers through accessible and efficient animal insurance services.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90">
              <Link to="/apply">
                Apply Now <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20">
              <Link to="/track">Track Application</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container py-16">
        <h2 className="mb-2 text-center font-heading text-2xl font-bold">How We Help Farmers</h2>
        <p className="mb-10 text-center text-muted-foreground">Simple, transparent, and accessible insurance for your livestock</p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(f => (
            <div key={f.title} className="stat-card group text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-1 font-heading text-lg font-bold">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Steps */}
      <section className="bg-muted py-16">
        <div className="container">
          <h2 className="mb-8 text-center font-heading text-2xl font-bold">How to Apply</h2>
          <div className="mx-auto max-w-lg space-y-4">
            {steps.map((s, i) => (
              <div key={i} className="flex items-start gap-4 rounded-lg bg-card p-4 shadow-sm">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {i + 1}
                </div>
                <p className="pt-1 text-sm font-medium">{s}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button asChild size="lg">
              <Link to="/requirements">View Full Requirements</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container py-16 text-center">
        <CheckCircle className="mx-auto mb-4 h-10 w-10 text-success" />
        <h2 className="mb-2 font-heading text-2xl font-bold">Ready to Protect Your Livestock?</h2>
        <p className="mb-6 text-muted-foreground">Start your insurance application today — it's free and easy.</p>
        <Button asChild size="lg" className="gap-2">
          <Link to="/apply">Get Started <ArrowRight className="h-4 w-4" /></Link>
        </Button>
      </section>
    </div>
  );
};

export default Index;
