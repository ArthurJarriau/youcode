import { Button } from "@/components/ui/button";
import { getAuthSession } from "@/lib/auth";
import { LoginButton } from "./LoginButton";
import { LoggedInButton } from "./LoggedInButton";

export interface AuthButtonProps {

}
export const AuthButton = async (props: AuthButtonProps) => {
    const session = await getAuthSession();
    const user = session?.user;
    if (!user) {
        return <LoginButton/>;
    }
    return(
        <LoggedInButton user={user}/>
    )
};