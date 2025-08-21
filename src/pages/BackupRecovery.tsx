import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HardDrive, Download, Upload, Shield } from "lucide-react";

export default function BackupRecovery() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <HardDrive className="h-8 w-8 text-primary" />
          Backup & Recovery
        </h1>
        <p className="text-muted-foreground">System backup and disaster recovery management</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="cyber-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5 text-primary" />
              Create Backup
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full bg-gradient-primary">
              <Shield className="mr-2 h-4 w-4" />
              Backup Current State
            </Button>
          </CardContent>
        </Card>

        <Card className="cyber-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5 text-accent" />
              Restore System
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full">
              Select Restore Point
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}