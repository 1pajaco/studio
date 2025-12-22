import { useUser } from "@/hooks/use-user";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { redirect } from "next/navigation";
import ProfileClientPage from "@/components/profile/profile-client-page";
import RentedBooks from "@/components/profile/rented-books";

export default function ProfilePage() {
    // In a real app with server-side auth, you'd get the user here.
    // For this mock, we let the client component handle the redirect.
  
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <ProfileClientPage>
        {(user) => {
           const initials = user.username?.split(" ").map((n) => n[0]).join("") || "?";
           return (
            <>
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">My Profile</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center gap-6">
                         <Avatar className="h-20 w-20">
                            <AvatarImage src={`https://avatar.vercel.sh/${user.email}.png`} alt={user.username} />
                            <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
                        </Avatar>
                        <div className="grid gap-1.5">
                            <p className="text-2xl font-bold">{user.username}</p>
                            <p className="text-muted-foreground">{user.email}</p>
                            <p className="text-sm font-medium text-primary capitalize">{user.role} User</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">My Rented Books</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <RentedBooks rentedBooks={user.rentedBooks} />
                    </CardContent>
                </Card>
            </>
           )
        }}
      </ProfileClientPage>
    </div>
  );
}
