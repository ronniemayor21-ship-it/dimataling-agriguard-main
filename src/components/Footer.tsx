import { Leaf } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-card py-8">
      <div className="container flex flex-col items-center gap-2 text-center text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Leaf className="h-4 w-4 text-primary" />
          <span className="font-heading font-bold text-foreground">DAAIPS</span>
        </div>
        <p>Municipality of Dimataling — Agriculture Animal Insurance Processing System</p>
        <p>© {new Date().getFullYear()} All rights reserved.</p>
      </div>
    </footer>
  );
}
