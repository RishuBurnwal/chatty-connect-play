import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Brain, Zap, Activity, AlertTriangle, Shield, Clock } from "lucide-react";

const detectionLogs = [
  { 
    timestamp: new Date(Date.now() - 2000), 
    sourceIP: "203.45.67.89", 
    requestCount: 1250, 
    riskLevel: "Critical", 
    actionTaken: "IP Blocked" 
  },
  { 
    timestamp: new Date(Date.now() - 15000), 
    sourceIP: "192.168.1.100", 
    requestCount: 890, 
    riskLevel: "High", 
    actionTaken: "Rate Limited" 
  },
  { 
    timestamp: new Date(Date.now() - 45000), 
    sourceIP: "45.123.67.12", 
    requestCount: 654, 
    riskLevel: "High", 
    actionTaken: "IP Blocked" 
  },
  { 
    timestamp: new Date(Date.now() - 72000), 
    sourceIP: "78.90.123.45", 
    requestCount: 432, 
    riskLevel: "Medium", 
    actionTaken: "Monitored" 
  },
  { 
    timestamp: new Date(Date.now() - 120000), 
    sourceIP: "156.78.90.123", 
    requestCount: 234, 
    riskLevel: "Low", 
    actionTaken: "Allowed" 
  },
];

export default function AIAgent() {
  const [aiEnabled, setAiEnabled] = useState(true);
  const [logs, setLogs] = useState(detectionLogs);

  const getRiskBadgeVariant = (risk: string) => {
    switch (risk) {
      case 'Critical': return 'destructive';
      case 'High': return 'default';
      case 'Medium': return 'secondary';
      default: return 'outline';
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'IP Blocked': return 'text-destructive';
      case 'Rate Limited': return 'text-warning';
      case 'Monitored': return 'text-accent';
      default: return 'text-success';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Brain className="h-8 w-8 text-primary" />
            AI Detection Agent
          </h1>
          <p className="text-muted-foreground">Advanced threat detection powered by machine learning</p>
        </div>
      </div>

      {/* AI Control Panel */}
      <Card className="cyber-border bg-gradient-cyber">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              AI Agent Control
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">Status:</span>
              <div className={`flex items-center gap-2 ${aiEnabled ? 'text-success' : 'text-muted-foreground'}`}>
                <div className={`w-2 h-2 rounded-full ${aiEnabled ? 'bg-success animate-pulse' : 'bg-muted-foreground'}`} />
                {aiEnabled ? 'Active' : 'Disabled'}
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/20 border border-border/50">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-primary" />
              <div>
                <h3 className="font-medium">AI Threat Detection</h3>
                <p className="text-sm text-muted-foreground">Real-time analysis of network traffic patterns</p>
              </div>
            </div>
            <Switch 
              checked={aiEnabled} 
              onCheckedChange={setAiEnabled}
              className="data-[state=checked]:bg-primary"
            />
          </div>

          {aiEnabled && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-lg bg-primary/10 border border-primary/20">
                <Activity className="h-6 w-6 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold font-mono">97.2%</div>
                <div className="text-sm text-muted-foreground">Accuracy Rate</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-success/10 border border-success/20">
                <Shield className="h-6 w-6 text-success mx-auto mb-2" />
                <div className="text-2xl font-bold font-mono">1,234</div>
                <div className="text-sm text-muted-foreground">Threats Blocked</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-accent/10 border border-accent/20">
                <Clock className="h-6 w-6 text-accent mx-auto mb-2" />
                <div className="text-2xl font-bold font-mono">2.3ms</div>
                <div className="text-sm text-muted-foreground">Response Time</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Detection Logs */}
      <Card className="cyber-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-warning" />
            Live Detection Log
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border bg-muted/5">
            <div className="grid grid-cols-5 gap-4 p-4 border-b border-border font-medium text-sm text-muted-foreground">
              <div>Timestamp</div>
              <div>Source IP</div>
              <div>Request Count</div>
              <div>Risk Level</div>
              <div>Action Taken</div>
            </div>
            <div className="max-h-96 overflow-auto scrollbar-cyber">
              {logs.map((log, index) => (
                <div 
                  key={index} 
                  className={`grid grid-cols-5 gap-4 p-4 border-b border-border/50 transition-all duration-200 hover:bg-muted/10 ${
                    index === 0 ? 'bg-primary/5 animate-fade-in' : ''
                  }`}
                >
                  <div className="font-mono text-sm text-muted-foreground">
                    {log.timestamp.toLocaleTimeString()}
                  </div>
                  <div className="font-mono text-sm">{log.sourceIP}</div>
                  <div className="font-mono text-sm">{log.requestCount.toLocaleString()}</div>
                  <div>
                    <Badge variant={getRiskBadgeVariant(log.riskLevel)} className="text-xs">
                      {log.riskLevel}
                    </Badge>
                  </div>
                  <div className={`text-sm font-medium ${getActionColor(log.actionTaken)}`}>
                    {log.actionTaken}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}