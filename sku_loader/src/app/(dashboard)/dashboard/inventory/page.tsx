import { Suspense } from "react";
import { InventoryTable } from "./components/inventory-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { InventoryProduct } from "@/types";
import { axiosInstance } from "@/lib/axios";

async function getInventoryData(): Promise<InventoryProduct[]> {
    try {
        const { data } = await axiosInstance.get<InventoryProduct[]>('/api/inventory');
        return data;
    } catch (error) {
        console.error('Failed to fetch inventory:', error);
        try {
            const { data } = await axiosInstance.get<InventoryProduct[]>('/api/inventory');
            return data;
        } catch (error) {
            console.error('Failed to fetch inventory after retry', error);
            throw error;
        }
    }
}

export default async function InventoryPage() {
    const inventory = await getInventoryData();

    return (
        <div className="flex flex-col gap-6 p-8">
            {/* Stats Overview */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{inventory.length}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-yellow-600">
                            {inventory.filter(p => p.status === 'low_stock').length}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-600">
                            {inventory.filter(p => p.status === 'out_of_stock').length}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Main Inventory Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Product Inventory</CardTitle>
                </CardHeader>
                <CardContent>
                    <Suspense fallback={<InventoryTableSkeleton />}>
                        <InventoryTable products={inventory} />
                    </Suspense>
                </CardContent>
            </Card>
        </div>
    );
}

function InventoryTableSkeleton() {
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <div className="h-8 w-[300px] bg-muted animate-pulse rounded" />
                <div className="h-8 w-8 bg-muted animate-pulse rounded" />
            </div>
            <div className="border rounded-md">
                <div className="h-[400px] bg-muted animate-pulse" />
            </div>
        </div>
    );
}