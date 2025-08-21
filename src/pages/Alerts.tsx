import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Shield, Clock, CheckCircle, X } from "lucide-react";

const alerts = [
  {
    id: 1,
    title: "High-volume DDoS attack detected",
    description: "Massive traffic spike from multiple IPs targeting web server",
    severity: "Critical",
    timestamp: new Date(Date.now() - 2 * 60 * 1000),
    source: "203.45.67.89, 45.123.67.12",
    status: "Active",
    acknowledged: false
  },
  {
    id: 2,
    title: "Suspicious login attempts",
    description: "Multiple failed login attempts from different geographic locations",
    severity: "High",
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    source: "Multiple IPs",
    status: "Investigating",
    acknowledged: false
  },
  {
    id: 3,
    title: "Rate limiting triggered",
    description: "Automatic rate limiting activated for suspicious traffic patterns",
    severity: "Medium",
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    source: "78.90.123.45",
    status: "Mitigated",
    acknowledged: true
  },
  {
    id: 4,
    title: "AI model updated",
    description: "Machine learning model retrained with new threat patterns",
    severity: "Info",
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    source: "System",
    status: "Completed",
    acknowledged: true
  },
  {
    id: 5,
    title: "Malware signature detected",
    description: "Known malware pattern identified in network traffic",
    severity: "High",
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
    source: "156.78.90.123",
    status: "Blocked",
    acknowledged: true
  },
];

export default function Alerts() {
  const getSeverityVariant = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'destructive';
      case 'High': return 'default';
      case 'Medium': return 'secondary';
      default: return 'outline';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'Critical': return <AlertTriangle className="h-4 w-4" />;
      case 'High': return <AlertTriangle className="h-4 w-4" />;
      case 'Medium': return <Shield className="h-4 w-4" />;
      default: return <CheckCircle className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'text-destructive';
      case 'Investigating': return 'text-warning';
      case 'Mitigated': return 'text-accent';
      case 'Blocked': return 'text-primary';
      default: return 'text-success';
    }
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} min ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} hours ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)} days ago`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <AlertTriangle className="h-8 w-8 text-warning" />
            Security Alerts
          </h1>
          <p className="text-muted-foreground">Monitor and respond to security incidents</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">Mark All Read</Button>
          <Button className="bg-gradient-primary">Configure Alerts</Button>
        </div>
      </div>

      {/* Alert Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="cyber-border bg-destructive/10">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-destructive">2</div>
            <div className="text-sm text-muted-foreground">Critical</div>
          </CardContent>
        </Card>
        <Card className="cyber-border bg-warning/10">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-warning">3</div>
            <div className="text-sm text-muted-foreground">High</div>
          </CardContent>
        </Card>
        <Card className="cyber-border bg-accent/10">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-accent">1</div>
            <div className="text-sm text-muted-foreground">Medium</div>
          </CardContent>
        </Card>
        <Card className="cyber-border bg-success/10">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-success">8</div>
            <div className="text-sm text-muted-foreground">Resolved</div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts List */}
      <Card className="cyber-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-accent" />
            Recent Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div 
                key={alert.id}
                className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${
                  alert.acknowledged 
                    ? 'border-border/50 bg-muted/20' 
                    : 'border-destructive/30 bg-destructive/5 shadow-threat'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className={`mt-1 ${alert.acknowledged ? 'text-muted-foreground' : ''}`}>
                      {getSeverityIcon(alert.severity)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className={`font-medium ${alert.acknowledged ? 'text-muted-foreground' : ''}`}>
                          {alert.title}
                        </h3>
                        <Badge variant={getSeverityVariant(alert.severity)} className="text-xs">
                          {alert.severity}
                        </Badge>
                        <span className={`text-sm font-medium ${getStatusColor(alert.status)}`}>
                          {alert.status}
                        </span>
                      </div>
                      <p className={`text-sm mb-2 ${alert.acknowledged ? 'text-muted-foreground' : ''}`}>
                        {alert.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatTimeAgo(alert.timestamp)}
                        </span>
                        <span>Source: {alert.source}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    {!alert.acknowledged && (
                      <>
                        <Button size="sm" variant="outline" className="h-8 px-3">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Acknowledge
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 px-2 text-muted-foreground">
                          <X className="h-3 w-3" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}