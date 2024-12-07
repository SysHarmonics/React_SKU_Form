import { Button } from "@/components/ui/button";
import { UserButton, SignedOut, SignedIn } from "@clerk/nextjs";
import Link from "next/link";

const SetupPage = () => {
    return (
        <div className="p-4">
            <div className="flex items-center justify-between">
                <div>
                    <SignedOut>
                        <Button>Sign In</Button>
                    </SignedOut>
                    <SignedIn>
                        <div className="flex items-center gap-4">
                            <Link href="/dashboard/inventory">
                                <Button>Go to Inventory</Button>
                            </Link>
                            <UserButton afterSignOutUrl="/" />
                        </div>
                    </SignedIn>
                </div>
            </div>
        </div>
    );
}

export default SetupPage;