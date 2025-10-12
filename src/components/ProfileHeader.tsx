import { UserResource } from "@clerk/types";
import CornerElements from "./CornerElements";

const ProfileHeader = ({ user }: { user: UserResource | null | undefined }) => {
  if (!user) return null;

  return (
    <div className="relative mb-10 p-6 bg-background/40 backdrop-blur-md border border-border/50 rounded-2xl shadow-lg overflow-hidden">
      {/* Decorative corners */}
      <CornerElements />

      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        {/* Profile Picture */}
        <div className="relative">
          {user.imageUrl ? (
            <div className="relative w-28 h-28 overflow-hidden rounded-2xl border border-border/30 shadow-inner">
              <img
                src={user.imageUrl}
                alt={user.fullName || "Profile"}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center shadow-inner">
              <span className="text-4xl font-bold text-primary">
                {user.fullName?.charAt(0) || "U"}
              </span>
            </div>
          )}
          {/* Online Status */}
          <div className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-green-500 border-2 border-background shadow-md animate-pulse" />
        </div>

        {/* User Info */}
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              {user.fullName}
            </h1>

            <div className="flex items-center gap-2 bg-cyber-terminal-bg/70 backdrop-blur-sm border border-border rounded-lg px-3 py-1 shadow-md">
              <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></div>
              <p className="text-xs font-mono text-primary">USER ACTIVE</p>
            </div>
          </div>

          <div className="h-px w-full bg-gradient-to-r from-primary/30 via-secondary/20 to-primary/30 opacity-50 my-3"></div>

          <p className="text-sm text-muted-foreground font-mono">
            {user.primaryEmailAddress?.emailAddress}
          </p>
        </div>
      </div>

      {/* Optional subtle glow overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 blur-2xl animate-pulse" />
      </div>
    </div>
  );
};

export default ProfileHeader;
