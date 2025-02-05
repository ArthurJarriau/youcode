"use client";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";
import { useMutation } from "@tanstack/react-query";
import {   LogOut } from "lucide-react";
import {  signOut } from "next-auth/react";

export const LogoutButton = () => {
    const mutation = useMutation({
        mutationFn: async () => 
             signOut(),
             
    });
    return (
        
        <Button variant="outline" size="sm" onClick={() => mutation.mutate()} className="flex items-center gap-2">
            {mutation.isPending ? (
            <Loader size={12}/>
            ): <LogOut size={12} />}
            Logout
        </Button>
    );
}