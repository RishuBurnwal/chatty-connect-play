import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Database, 
  Upload, 
  FileText, 
  Brain, 
  CheckCircle, 
  Clock,
  TrendingUp 
} from "lucide-react";

const trainingFiles = [
  {
    name: "network_logs_2024.pcap",
    size: "2.3 GB",
    uploaded: "2024-01-15",
    status: "Processed",
    samples: 45678
  },
  {
    name: "ddos_attack_samples.log",
    size: "890 MB",
    uploaded: "2024-01-10",
    status: "Processed",
    samples: 23456
  },
  {
    name: "legitimate_traffic.pcap",
    size: "1.8 GB",
    uploaded: "2024-01-08",
    status: "Processing",
    samples: 34567
  },
  {
    name: "malware_signatures.dat",
    size: "456 MB",
    uploaded: "2024-01-05",
    status: "Processed",
    samples: 12345
  },
];

export default function TrainingData() {
  const [isTraining, setIsTraining] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [modelAccuracy] = useState(97.2);
  const [lastTraining] = useState("2024-01-15 14:30:00");

  const handleTrainModel = () => {
    setIsTraining(true);
    setTrainingProgress(0);
    
    const interval = setInterval(() => {
      setTrainingProgress(prev => {
        if (prev >= 100) {
          setIsTraining(false);
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 10;
      });
    }, 500);
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Processed': return 'default';
      case 'Processing': return 'secondary';
      case 'Failed': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Database className="h-8 w-8 text-primary" />
            Training Data Management
          </h1>
          <p className="text-muted-foreground">Manage datasets and train AI models for threat detection</p>
        </div>
      </div>

      {/* Model Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="cyber-border bg-gradient-cyber">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Brain className="h-8 w-8 text-primary" />
              <div>
                <div className="text-2xl font-bold font-mono">{modelAccuracy}%</div>
                <div className="text-sm text-muted-foreground">Model Accuracy</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="cyber-border">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-accent" />
              <div>
                <div className="text-lg font-mono">{lastTraining}</div>
                <div className="text-sm text-muted-foreground">Last Training</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="cyber-border">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-success" />
              <div>
                <div className="text-2xl font-bold font-mono">116,046</div>
                <div className="text-sm text-muted-foreground">Training Samples</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upload Section */}
      <Card className="cyber-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-primary" />
            Upload Training Data
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
            <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium mb-2">Drag & drop files here</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Support for .pcap, .log, .csv, and .json files
            </p>
            <Button variant="outline">
              Browse Files
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Training Control */}
      <Card className="cyber-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            Model Training
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isTraining ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Training in progress...</span>
                <span className="text-sm text-muted-foreground">{Math.round(trainingProgress)}%</span>
              </div>
              <Progress value={trainingProgress} className="h-2" />
              <p className="text-sm text-muted-foreground">
                Processing training data and optimizing model parameters...
              </p>
            </div>
          ) : (
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/20 border border-border/50">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-success" />
                <div>
                  <div className="font-medium">Model Ready for Training</div>
                  <div className="text-sm text-muted-foreground">
                    116,046 samples available • Last trained {lastTraining}
                  </div>
                </div>
              </div>
              <Button onClick={handleTrainModel} className="bg-gradient-primary">
                Train Model
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Training Files */}
      <Card className="cyber-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-accent" />
            Training Dataset
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border bg-muted/5">
            <div className="grid grid-cols-5 gap-4 p-4 border-b border-border font-medium text-sm text-muted-foreground">
              <div>Filename</div>
              <div>Size</div>
              <div>Uploaded</div>
              <div>Status</div>
              <div>Samples</div>
            </div>
            <div className="max-h-96 overflow-auto scrollbar-cyber">
              {trainingFiles.map((file, index) => (
                <div 
                  key={file.name} 
                  className="grid grid-cols-5 gap-4 p-4 border-b border-border/50 transition-all duration-200 hover:bg-muted/10"
                >
                  <div className="font-mono text-sm truncate" title={file.name}>
                    {file.name}
                  </div>
                  <div className="text-sm text-muted-foreground">{file.size}</div>
                  <div className="text-sm text-muted-foreground">{file.uploaded}</div>
                  <div>
                    <Badge variant={getStatusVariant(file.status)} className="text-xs">
                      {file.status}
                    </Badge>
                  </div>
                  <div className="font-mono text-sm">{file.samples.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}