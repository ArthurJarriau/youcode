import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
    return (
        <div>
            <h1>Admin Page</h1>
            <p>This is an admin page</p>
            <Link href="/admin/courses" className={buttonVariants({variant: 'outline',size: 'lg'})}>
                Courses
            </Link>
        </div>
    )
    }