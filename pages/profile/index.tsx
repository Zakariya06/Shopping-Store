import UserProfileCard from "@/components/profiles/UserProfileCard";
import { useAuth } from "@/context/authContext"; // Your custom auth hook
import withAuth from "@/hoc/withAuth";
import AppLayout from "@/layout/AppLayout";

function ProfilePage() {
  const { user } = useAuth();

  return (
    <AppLayout>
      <div className="container mx-auto px-4">
        <UserProfileCard
          name={user?.displayName || "User"}
          email={user?.email || "Email not found"}
          photoURL={
            user?.photoURL ||
            "https://ui-avatars.com/api/?name=User&background=random"
          }
        />
      </div>
    </AppLayout>
  );
}

export default ProfilePage;
