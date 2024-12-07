"use client";

import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { MoreHorizontal, Search, RefreshCw } from "lucide-react";

import { InventoryProduct } from "@/types";
import { axiosInstance } from "@/lib/axios";

import { 
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { 
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
 } from "@/components/ui/dropdown-menu";

import { 
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

interface InventoryTableProps {
    products: InventoryProduct[];
}

export function InventoryTable({ products: initialProducts }: InventoryTableProps ) {
    const [products, setProducts] = useState(initialProducts);
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [updatingInventory, setUpdatingInventory] = useState<string | null>(null);
    const [removingProduct, setRemovingProduct] = useState<string | null>(null);
    const { toast } = useToast();

    const filteredProducts = products.filter(
        product => 
            product.name.toLowerCase().includes(search.toLowerCase()) ||
            product.sku.toLowerCase().includes(search.toLowerCase())
    );

    const updateInventory = async (sku: string, size: string, quantity: number) => {
        setUpdatingInventory(`${sku}-${size}`);
        try {
            await axiosInstance.put('/api/update-inventory', {
                sku,
                size,
                quantity,
            });
        

            const updatedProducts = products.map(product => {
                if (product.sku === sku) {
                    return {
                        ...product,
                        inventory: product.inventory.map(inv => inv.size === size ? { ...inv, quantity } : inv),
                        lastUpdated: new Date().toISOString(),
                    };
                }
                return product;
            });

            setProducts(updatedProducts);
            toast({
                title: "Inventory Updated",
                description: `Updated ${size} size for SKU: ${sku}`,
            });
        } catch (error) {
            console.error('Failed to update inventory:', error);
            toast({
                variant: "destructive",
                title: "Update Failed",
                description: error instanceof Error ? error.message : "Failed to update inventory",
            });
        } finally {
            setUpdatingInventory(null);
        }
    };

    const refreshInventory = async () => {
        setIsLoading(true);
        try {
            const { data } = await axiosInstance.get('/api/inventory');
            setProducts(data);
            toast({
                title: "Success",
                description: "Inventory refreshed",
            });
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to refresh inventory",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleRemoveProduct = async (sku: string) => {
        setRemovingProduct(sku);
        try {
            await axiosInstance.delete('/api/remove-product', {
                data: { sku }
            });
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Removal Failed",
                description: error instanceof Error ? error.message: "Failed to remove product"
            });
        } finally {
            setRemovingProduct(null);
        }
    };

    const LoadingSkeleton = () => (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>SKU</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Inventory</TableHead>
                        <TableHead>Last Updated</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {[1, 2, 3, 4, 5].map((index) => (
                        <TableRow key={index}>
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <Skeleton className="h-12 w-12 rounded" />
                                    <div>
                                        <Skeleton className="h-4 w-[200px]" />
                                        <Skeleton className="h-3 w-[150px] mt-2" />
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                            <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
                            <TableCell><Skeleton className="h-6 w-[100px]" /></TableCell>
                            <TableCell><Skeleton className="h-8 w-[100px]" /></TableCell>
                            <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                            <TableCell><Skeleton className="h-8 w-8" /></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Search className="w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-[300px]"
                    />
                </div>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={refreshInventory}
                    disabled={isLoading}
                >
                    <RefreshCw className="h-4 w-4" />
                </Button>
            </div>

            {isLoading ? (
                <LoadingSkeleton />
            ) : (
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Product</TableHead>
                                <TableHead>SKU</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Inventory</TableHead>
                                <TableHead>Last Updated</TableHead>
                                <TableHead className="w-[50px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredProducts.map((product) => (
                                <TableRow key={product.sku}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={product.imageURL}
                                                alt={product.name}
                                                className="h-12 w-12 rounded object-cover"
                                            />
                                            <div>
                                                <div className="font-medium">{product.name}</div>
                                                <div className="text-sm text-muted-foreground">
                                                    {product.branding}
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>{product.sku}</TableCell>
                                    <TableCell>${product.price?.toFixed(2)}</TableCell>
                                    <TableCell>
                                        <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                                            ${product.status === 'in_stock' ? 'bg-green-100 text-green-800' :
                                            product.status === 'low_stock' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-red-100 text-red-800'}`}>
                                            {product.status.replace('_', ' ')}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="ghost" size="sm">
                                                    View Sizes
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Inventory - {product.name}</DialogTitle>
                                                </DialogHeader>
                                                <div className="grid gap-4">
                                                    {product.inventory?.map((inv) => (
                                                        <div key={inv.size} className="flex items-center justify-between">
                                                            <span>Size {inv.size}</span>
                                                            <div className="flex items-center gap-2">
                                                                <Input
                                                                    type="number"
                                                                    value={inv.quantity}
                                                                    onChange={(e) => updateInventory(
                                                                        product.sku,
                                                                        inv.size,
                                                                        Number(e.target.value)
                                                                    )}
                                                                    className="w-20"
                                                                    min={0}
                                                                    disabled={updatingInventory === `${product.sku}-${inv.size}`}
                                                                />
                                                                <span className="text-sm text-muted-foreground">units</span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </DialogContent>
                                        </Dialog>
                                    </TableCell>
                                    <TableCell>{new Date(product.lastUpdated).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem 
                                                    onSelect={() => window.location.href = `/sku-input/edit/${product.sku}`}
                                                >
                                                    Edit Details
                                                </DropdownMenuItem>
                                                <DropdownMenuItem 
                                                    className="text-red-600"
                                                    onSelect={() => handleRemoveProduct(product.sku)}
                                                    disabled={removingProduct === product.sku}
                                                >
                                                    {removingProduct === product.sku ? 'Removing...' : 'Remove Product'}
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    );
}

