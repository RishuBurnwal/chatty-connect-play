import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Search, Download, Filter, Clock } from "lucide-react";

const logEntries = [
  {
    timestamp: new Date(Date.now() - 2 * 60 * 1000),
    level: "ERROR",
    source: "203.45.67.89",
    event: "DDoS Attack",
    action: "IP_BLOCKED",
    details: "High-volume traffic detected, automatic blocking activated"
  },
  {
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    level: "WARN",
    source: "78.90.123.45",
    event: "Suspicious Activity",
    action: "RATE_LIMITED",
    details: "Unusual request pattern detected, rate limiting applied"
  },
  {
    timestamp: new Date(Date.now() - 8 * 60 * 1000),
    level: "INFO",
    source: "System",
    event: "Model Update",
    action: "COMPLETED",
    details: "AI model retrained successfully, accuracy improved to 97.2%"
  },
  {
    timestamp: new Date(Date.now() - 12 * 60 * 1000),
    level: "ERROR",
    source: "45.123.67.12",
    event: "Malware Detection",
    action: "QUARANTINED",
    details: "Known malware signature detected in payload"
  },
  {
    timestamp: new Date(Date.now() - 18 * 60 * 1000),
    level: "WARN",
    source: "156.78.90.123",
    event: "Brute Force",
    action: "MONITORED",
    details: "Multiple failed authentication attempts detected"
  },
  {
    timestamp: new Date(Date.now() - 25 * 60 * 1000),
    level: "INFO",
    source: "192.168.1.100",
    event: "Connection Established",
    action: "ALLOWED",
    details: "Normal traffic pattern, connection permitted"
  },
  {
    timestamp: new Date(Date.now() - 35 * 60 * 1000),
    level: "ERROR",
    source: "89.45.123.67",
    event: "SQL Injection",
    action: "BLOCKED",
    details: "SQL injection attempt detected and blocked"
  },
  {
    timestamp: new Date(Date.now() - 42 * 60 * 1000),
    level: "WARN",
    source: "123.45.67.89",
    event: "Anomaly Detected",
    action: "FLAGGED",
    details: "Unusual traffic pattern requires investigation"
  },
];

export default function Logs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");
  const [filteredLogs, setFilteredLogs] = useState(logEntries);

  const getLevelVariant = (level: string) => {
    switch (level) {
      case 'ERROR': return 'destructive';
      case 'WARN': return 'default';
      case 'INFO': return 'secondary';
      default: return 'outline';
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'IP_BLOCKED':
      case 'BLOCKED':
      case 'QUARANTINED': return 'text-destructive';
      case 'RATE_LIMITED':
      case 'MONITORED':
      case 'FLAGGED': return 'text-warning';
      case 'COMPLETED': return 'text-success';
      default: return 'text-accent';
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    return timestamp.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    filterLogs(value, levelFilter);
  };

  const handleLevelFilter = (level: string) => {
    setLevelFilter(level);
    filterLogs(searchTerm, level);
  };

  const filterLogs = (search: string, level: string) => {
    let filtered = logEntries;

    if (level !== 'all') {
      filtered = filtered.filter(log => log.level === level);
    }

    if (search) {
      filtered = filtered.filter(log =>
        log.source.toLowerCase().includes(search.toLowerCase()) ||
        log.event.toLowerCase().includes(search.toLowerCase()) ||
        log.action.toLowerCase().includes(search.toLowerCase()) ||
        log.details.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredLogs(filtered);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <FileText className="h-8 w-8 text-primary" />
            Security Logs
          </h1>
          <p className="text-muted-foreground">Monitor system events and security incidents</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="cyber-border">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search logs by IP, event, action, or details..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={levelFilter} onValueChange={handleLevelFilter}>
              <SelectTrigger className="w-40">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="ERROR">Error</SelectItem>
                <SelectItem value="WARN">Warning</SelectItem>
                <SelectItem value="INFO">Info</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Log Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="cyber-border">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-destructive">{logEntries.filter(l => l.level === 'ERROR').length}</div>
            <div className="text-sm text-muted-foreground">Errors</div>
          </CardContent>
        </Card>
        <Card className="cyber-border">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-warning">{logEntries.filter(l => l.level === 'WARN').length}</div>
            <div className="text-sm text-muted-foreground">Warnings</div>
          </CardContent>
        </Card>
        <Card className="cyber-border">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-accent">{logEntries.filter(l => l.level === 'INFO').length}</div>
            <div className="text-sm text-muted-foreground">Info</div>
          </CardContent>
        </Card>
        <Card className="cyber-border">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{filteredLogs.length}</div>
            <div className="text-sm text-muted-foreground">Filtered</div>
          </CardContent>
        </Card>
      </div>

      {/* Logs Table */}
      <Card className="cyber-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-accent" />
            Log Entries ({filteredLogs.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border bg-muted/5">
            <div className="grid grid-cols-6 gap-4 p-4 border-b border-border font-medium text-sm text-muted-foreground">
              <div>Timestamp</div>
              <div>Level</div>
              <div>Source</div>
              <div>Event</div>
              <div>Action</div>
              <div>Details</div>
            </div>
            <div className="max-h-96 overflow-auto scrollbar-cyber">
              {filteredLogs.map((log, index) => (
                <div 
                  key={index} 
                  className="grid grid-cols-6 gap-4 p-4 border-b border-border/50 transition-all duration-200 hover:bg-muted/10 text-sm"
                >
                  <div className="font-mono text-xs text-muted-foreground">
                    {formatTimestamp(log.timestamp)}
                  </div>
                  <div>
                    <Badge variant={getLevelVariant(log.level)} className="text-xs">
                      {log.level}
                    </Badge>
                  </div>
                  <div className="font-mono text-xs">{log.source}</div>
                  <div className="font-medium">{log.event}</div>
                  <div className={`font-medium ${getActionColor(log.action)}`}>
                    {log.action}
                  </div>
                  <div className="text-muted-foreground truncate" title={log.details}>
                    {log.details}
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