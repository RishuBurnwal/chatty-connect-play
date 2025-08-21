import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NetworkIcon, TrendingUp, Globe, Activity, AlertTriangle } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Generate real-time network data
const generateNetworkData = () => {
  const now = new Date();
  return Array.from({ length: 20 }, (_, i) => ({
    time: new Date(now.getTime() - (19 - i) * 5000).toLocaleTimeString(),
    requests: Math.floor(Math.random() * 500) + 100,
    suspicious: Math.floor(Math.random() * 50),
  }));
};

const topIPs = [
  { ip: "203.45.67.89", country: "China", requests: 2450, status: "Suspicious", flagged: true },
  { ip: "192.168.1.100", country: "Unknown", requests: 1890, status: "Normal", flagged: false },
  { ip: "45.123.67.12", country: "Russia", requests: 1654, status: "Blocked", flagged: true },
  { ip: "78.90.123.45", country: "Iran", requests: 1432, status: "Suspicious", flagged: true },
  { ip: "156.78.90.123", country: "USA", requests: 1234, status: "Normal", flagged: false },
  { ip: "89.45.123.67", country: "Germany", requests: 987, status: "Normal", flagged: false },
  { ip: "123.45.67.89", country: "India", requests: 765, status: "Monitored", flagged: false },
  { ip: "67.89.123.45", country: "Brazil", requests: 543, status: "Normal", flagged: false },
];

export default function NetworkMonitor() {
  const [networkData, setNetworkData] = useState(generateNetworkData());
  const [currentRPS, setCurrentRPS] = useState(324);

  useEffect(() => {
    const interval = setInterval(() => {
      setNetworkData(prev => {
        const newData = [...prev.slice(1)];
        const newPoint = {
          time: new Date().toLocaleTimeString(),
          requests: Math.floor(Math.random() * 500) + 100,
          suspicious: Math.floor(Math.random() * 50),
        };
        newData.push(newPoint);
        setCurrentRPS(newPoint.requests);
        return newData;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Blocked': return 'destructive';
      case 'Suspicious': return 'default';
      case 'Monitored': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <NetworkIcon className="h-8 w-8 text-primary" />
            Network Monitor
          </h1>
          <p className="text-muted-foreground">Real-time network traffic analysis and monitoring</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold font-mono text-primary">{currentRPS} RPS</div>
          <div className="text-sm text-muted-foreground">Current Traffic</div>
        </div>
      </div>

      {/* Network Chart */}
      <Card className="cyber-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Real-time Network Requests
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={networkData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="time" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                }}
              />
              <Line 
                type="monotone" 
                dataKey="requests" 
                stroke="#22c55e" 
                strokeWidth={2} 
                name="Total Requests"
                dot={false}
              />
              <Line 
                type="monotone" 
                dataKey="suspicious" 
                stroke="#ef4444" 
                strokeWidth={2} 
                name="Suspicious"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Top IPs Table */}
      <Card className="cyber-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-accent" />
            Top Request Sources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border bg-muted/5">
            <div className="grid grid-cols-5 gap-4 p-4 border-b border-border font-medium text-sm text-muted-foreground">
              <div>IP Address</div>
              <div>Country</div>
              <div>Requests/Hour</div>
              <div>Status</div>
              <div>Actions</div>
            </div>
            <div className="max-h-96 overflow-auto scrollbar-cyber">
              {topIPs.map((ip, index) => (
                <div 
                  key={ip.ip} 
                  className={`grid grid-cols-5 gap-4 p-4 border-b border-border/50 transition-all duration-200 hover:bg-muted/10 ${
                    ip.flagged ? 'bg-destructive/5' : ''
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm">{ip.ip}</span>
                    {ip.flagged && (
                      <AlertTriangle className="h-4 w-4 text-destructive" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Globe className="h-3 w-3" />
                    {ip.country}
                  </div>
                  <div className="font-mono text-sm">
                    {ip.requests.toLocaleString()}
                  </div>
                  <div>
                    <Badge variant={getStatusVariant(ip.status)} className="text-xs">
                      {ip.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1">
                    <Activity className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {ip.flagged ? 'Monitoring' : 'Normal'}
                    </span>
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