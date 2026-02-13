import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    CloudSun,
    Droplets,
    Sprout,
    TrendingUp,
    DollarSign,
    Calendar,
    AlertCircle,
    Plus
} from 'lucide-react';
import { showInput, showSuccess } from '@/lib/alerts';

const FarmerDashboard = () => {
    const [crops, setCrops] = useState([
        { id: 1, name: 'Rice Field A', stage: 'Vegetative', status: 'Healthy', plantedDate: '2024-01-15' },
        { id: 2, name: 'Corn Patch', stage: 'Flowering', status: 'Needs Water', plantedDate: '2024-02-01' },
        { id: 3, name: 'Vegetable Garden', stage: 'Harvesting', status: 'Healthy', plantedDate: '2023-12-10' },
    ]);

    const [date] = useState(new Date());

    const handleAddCrop = async () => {
        const result = await showInput('Add New Crop', 'Enter crop name:', 'e.g., Rice Field B');
        if (result.isConfirmed && result.value) {
            const newCrop = {
                id: crops.length + 1,
                name: result.value,
                stage: 'Seeding',
                status: 'Healthy',
                plantedDate: new Date().toISOString().split('T')[0]
            };
            setCrops([...crops, newCrop]);
            showSuccess('Crop Added', `${result.value} has been added to your dashboard.`);
        }
    };

    return (
        <div className="container py-8 space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="font-heading text-3xl font-bold text-primary">Farmer Dashboard</h1>
                    <p className="text-muted-foreground">Welcome back, Farmer Juan! Here's what's happening on your farm.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button className="gap-2">
                        <Plus className="h-4 w-4" /> Log Activity
                    </Button>
                    <div className="flex items-center gap-2 bg-muted px-3 py-1 rounded-md text-sm font-medium">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {date.toLocaleDateString()}
                    </div>
                </div>
            </div>

            {/* Weather & Quick Stats */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-slate-900 border-blue-200 dark:border-blue-800">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                            <CloudSun className="h-4 w-4 text-blue-500" /> Weather
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">28°C</div>
                        <p className="text-xs text-muted-foreground">Partly Cloudy</p>
                        <div className="mt-2 text-xs flex items-center gap-2">
                            <Droplets className="h-3 w-3 text-blue-400" /> 65% Humidity
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                            <Sprout className="h-4 w-4 text-green-500" /> Active Crops
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{crops.length}</div>
                        <p className="text-xs text-muted-foreground">Fields under cultivation</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-emerald-500" /> Monthly Income
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₱45,200</div>
                        <p className="text-xs text-emerald-600 flex items-center gap-1">
                            +12% <span className="text-muted-foreground">from last month</span>
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                            <AlertCircle className="h-4 w-4 text-amber-500" /> Alerts
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">2</div>
                        <p className="text-xs text-muted-foreground">Requires attention</p>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content Tabs */}
            <Tabs defaultValue="crops" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="crops">My Crops</TabsTrigger>
                    <TabsTrigger value="schedule">Schedule</TabsTrigger>
                    <TabsTrigger value="finance">Finances</TabsTrigger>
                </TabsList>

                <TabsContent value="crops" className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold">Crop Status</h2>
                        <Button variant="outline" size="sm" onClick={handleAddCrop} className="gap-2">
                            <Plus className="h-4 w-4" /> Add Crop
                        </Button>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {crops.map((crop) => (
                            <Card key={crop.id} className="overflow-hidden">
                                <div className="h-2 bg-primary/20">
                                    <div
                                        className={`h-full ${crop.status === 'Healthy' ? 'bg-green-500' : 'bg-amber-500'}`}
                                        style={{ width: '100%' }}
                                    />
                                </div>
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <CardTitle>{crop.name}</CardTitle>
                                        <Badge variant={crop.status === 'Healthy' ? 'secondary' : 'destructive'} className="ml-2">
                                            {crop.status}
                                        </Badge>
                                    </div>
                                    <CardDescription>Planted: {crop.plantedDate}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Stage</span>
                                            <span className="font-medium">{crop.stage}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Est. Harvest</span>
                                            <span className="font-medium">2 Months</span>
                                        </div>
                                        <Button className="w-full mt-4" variant="outline" size="sm">View Details</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="schedule">
                    <Card>
                        <CardHeader>
                            <CardTitle>Upcoming Tasks</CardTitle>
                            <CardDescription>Your farming schedule for the week.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {[
                                    { task: 'Fertilizer Application', date: 'Tomorrow, 8:00 AM', field: 'Rice Field A' },
                                    { task: 'Pest Inspection', date: 'Feb 15, 2024', field: 'Corn Patch' },
                                    { task: 'Harvest Preparation', date: 'Feb 20, 2024', field: 'Vegetable Garden' },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                                <Calendar className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <p className="font-medium">{item.task}</p>
                                                <p className="text-xs text-muted-foreground">{item.field}</p>
                                            </div>
                                        </div>
                                        <div className="text-sm font-medium text-muted-foreground">{item.date}</div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="finance">
                    <Card>
                        <CardHeader>
                            <CardTitle>Financial Overview</CardTitle>
                            <CardDescription>Income and expenses tracking.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[200px] flex items-center justify-center border rounded-md bg-muted/50">
                                <p className="text-muted-foreground">Financial charts integration coming soon...</p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default FarmerDashboard;
