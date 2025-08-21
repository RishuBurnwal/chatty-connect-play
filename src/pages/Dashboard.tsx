import { useState, useEffect } from "react";
import { StatCard } from "@/components/dashboard/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Activity,
  Shield,
  AlertTriangle,
  Zap,
  Globe,
  Clock,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

// Mock data
const trafficData = [
  { time: '00:00', requests: 120, threats: 5 },
  { time: '04:00', requests: 80, threats: 2 },
  { time: '08:00', requests: 200, threats: 15 },
  { time: '12:00', requests: 350, threats: 25 },
  { time: '16:00', requests: 280, threats: 18 },
  { time: '20:00', requests: 180, threats: 8 },
];

const threatTypes = [
  { name: 'DDoS Flood', value: 35, color: '#ef4444' },
  { name: 'SQL Injection', value: 25, color: '#f97316' },
  { name: 'XSS Attack', value: 20, color: '#eab308' },
  { name: 'Brute Force', value: 15, color: '#22c55e' },
  { name: 'Other', value: 5, color: '#06b6d4' },
];

const topAttackers = [
  { ip: '192.168.1.100', country: 'Unknown', requests: 1250, risk: 'High' },
  { ip: '203.45.67.89', country: 'China', requests: 890, risk: 'Critical' },
  { ip: '45.123.67.12', country: 'Russia', requests: 654, risk: 'High' },
  { ip: '78.90.123.45', country: 'Iran', requests: 432, risk: 'Medium' },
];

export default function Dashboard() {
  const [activeConnections, setActiveConnections] = useState(1247);
  const [systemStatus, setSystemStatus] = useState('Active');

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveConnections(prev => prev + Math.floor(Math.random() * 20 - 10));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Security Dashboard</h1>
          <p className="text-muted-foreground">Real-time DDoS protection and threat analysis</p>
        </div>
        <div className="flex items-center gap-3">
          <Button className="bg-gradient-primary hover:bg-primary/90">
            <Shield className="mr-2 h-4 w-4" />
            Enable Protection
          </Button>
          <Button variant="outline">Export Report</Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Active Connections"
          value={activeConnections.toLocaleString()}
          change={{ value: 12, type: 'increase' }}
          icon={Activity}
        />
        <StatCard
          title="Threats Blocked Today"
          value="1,234"
          change={{ value: 8, type: 'increase' }}
          icon={Shield}
          className="threat-pulse"
        />
        <StatCard
          title="Blocked IPs"
          value="89"
          change={{ value: 3, type: 'decrease' }}
          icon={AlertTriangle}
        />
        <StatCard
          title="System Status"
          value={systemStatus}
          icon={Zap}
          className="cyber-glow"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Chart */}
        <Card className="cyber-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Network Traffic
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trafficData}>
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
                <Line type="monotone" dataKey="requests" stroke="#22c55e" strokeWidth={2} />
                <Line type="monotone" dataKey="threats" stroke="#ef4444" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Threat Types */}
        <Card className="cyber-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Attack Types
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={threatTypes}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {threatTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity and Top Attackers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Attackers */}
        <Card className="cyber-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-warning" />
              Top Threat Sources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topAttackers.map((attacker, index) => (
                <div key={attacker.ip} className="flex items-center justify-between p-3 rounded-lg bg-muted/20 border border-border/50">
                  <div className="flex items-center gap-3">
                    <div className="text-sm font-mono text-muted-foreground">#{index + 1}</div>
                    <div>
                      <div className="font-mono text-sm">{attacker.ip}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <Globe className="h-3 w-3" />
                        {attacker.country}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-sm">{attacker.requests} req/h</div>
                    <Badge 
                      variant={attacker.risk === 'Critical' ? 'destructive' : attacker.risk === 'High' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {attacker.risk}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Alerts */}
        <Card className="cyber-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-accent" />
              Recent Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 rounded-lg border border-destructive/20 bg-destructive/5">
                <AlertTriangle className="h-4 w-4 text-destructive mt-1" />
                <div className="flex-1">
                  <div className="text-sm font-medium">High-volume DDoS detected</div>
                  <div className="text-xs text-muted-foreground">Source: 203.45.67.89 • 2 min ago</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 rounded-lg border border-warning/20 bg-warning/5">
                <AlertTriangle className="h-4 w-4 text-warning mt-1" />
                <div className="flex-1">
                  <div className="text-sm font-medium">Suspicious login attempts</div>
                  <div className="text-xs text-muted-foreground">Multiple IPs • 5 min ago</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 rounded-lg border border-primary/20 bg-primary/5">
                <Shield className="h-4 w-4 text-primary mt-1" />
                <div className="flex-1">
                  <div className="text-sm font-medium">AI model updated</div>
                  <div className="text-xs text-muted-foreground">Accuracy improved to 97.2% • 15 min ago</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}