import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader } from "@/components/ui/loader";
import { LogoutButton } from "@/features/auth/LogoutButton";
import { getAuthSession } from "@/lib/auth";
import { useMutation } from "@tanstack/react-query";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default async function  Page() {
    const session = await getAuthSession();
    if (!session) {
        throw new Error('Not authenticated');
    }
    return (
        <Card className="max-w-lg m-auto mt-4">
            <CardHeader className="flex flex-row gap-4 space-y-0">
                <Avatar className="h-12 w-12">
                    <AvatarFallback>
                        {session.user.email?.[0]}
                    </AvatarFallback>
                    {session.user.image && (
                        <AvatarImage src={session.user.image} alt={session.user.name || ""} />
                    )}
                </Avatar>
                <div className="flex flex-col gap-1">
                    <CardTitle>
                        {session.user.email}
                    </CardTitle>
                    <CardDescription>
                        {session.user.name}
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
                <Link href="/account/settings" className={buttonVariants({variant: 'outline',size: 'lg'})}>
                    Settings
                </Link>
                <Link href="/admin" className={buttonVariants({variant: 'outline',size: 'lg'})}>
                    Admin
                </Link>
            </CardContent>
            <CardFooter className="flex flex-row-reverse">
                <LogoutButton />
            </CardFooter>
        </Card>
    );
}