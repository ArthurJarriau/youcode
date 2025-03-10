"use client";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alertdialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Loader } from "@/components/ui/loader";
import { useMutation } from "@tanstack/react-query";
import { LogOut, User2, UserCircle  } from "lucide-react";
import { Session } from "next-auth"
import { signOut } from "next-auth/react";
import Link from "next/link";

export type LoggedInButtonProps = {
    user: Session["user"]
}

export const LoggedInButton = (props: LoggedInButtonProps) => {
    const mutation = useMutation({
        mutationFn: async () => 
             signOut(),
             
    });
    return (
        <DropdownMenu>
            <AlertDialog>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                        <Avatar className="h-6 w-6 mr-2">
                            <AvatarFallback>
                                {props.user?.name?.[0]}
                            </AvatarFallback>
                            {props.user?.image && (
                                <AvatarImage src={props.user.image} alt={props.user.name ?? 'user picture'} />
                            )}
                        </Avatar>
                        {props.user?.name}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent >
                    <DropdownMenuItem asChild>
                        <Link href="/account">
                            <User2 size={12} className="mr-2"/>
                                Account
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                        <AlertDialogTrigger asChild>
                                <DropdownMenuItem >
                                    <LogOut size={12} className="mr-2"/>
                                    Logout
                                </DropdownMenuItem>
                        </AlertDialogTrigger>
                        
                    
                    
                </DropdownMenuContent>
                <AlertDialogContent>
                        <AlertDialogHeader >
                            <AlertDialogTitle>
                            Are you sure you want to logout?
                            </AlertDialogTitle>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel asChild>
                                <Button variant="secondary">Cancel</Button>
                            </AlertDialogCancel>
                            <Button variant="destructive" disabled={mutation.isPending} onClick={() => mutation.mutate()}>
                            {mutation.isPending ? (
                            <Loader size={12}/>
                            ): <LogOut size={12} />}
                                Logout
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                
            </AlertDialog>
           
        </DropdownMenu>
    )
}