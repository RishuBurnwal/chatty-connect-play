import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease' | 'neutral';
  };
  icon: LucideIcon;
  trend?: number[];
  className?: string;
}

export function StatCard({ title, value, change, icon: Icon, className }: StatCardProps) {
  return (
    <Card className={cn("cyber-border bg-gradient-cyber", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium">{title}</p>
              <p className="text-2xl font-bold font-mono">{value}</p>
            </div>
          </div>
          
          {change && (
            <div className={cn(
              "text-sm font-medium px-2 py-1 rounded-md",
              change.type === 'increase' && "text-success bg-success/10",
              change.type === 'decrease' && "text-destructive bg-destructive/10",
              change.type === 'neutral' && "text-muted-foreground bg-muted"
            )}>
              {change.type === 'increase' && '+'}
              {change.value}%
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}