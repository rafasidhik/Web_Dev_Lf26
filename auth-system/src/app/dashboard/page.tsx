
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";
import LogoutButton from "./logout-button";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  const user = token ? await verifyToken(token) : null;

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="dashboard-container">
      <section className="dashboard-card">
        <p className="dashboard-label">AUTHIFY DASHBOARD</p>
        <h1>Welcome!</h1>
        <p>You are successfully logged in.</p>

        <div className="user-info">
          <span>Logged in as</span>
          <strong>{user.email}</strong>
        </div>

        <LogoutButton />
      </section>
    </main>
  );
}
