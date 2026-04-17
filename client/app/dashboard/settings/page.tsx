'use client';

import { useAuthStore } from '@/lib/store/authStore';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { ProfileSettings } from '@/components/settings/profile-settings';
import { SecuritySettings } from '@/components/settings/security-settings';
import { NotificationSettings } from '@/components/settings/notification-settings';
import { AppearanceSettings } from '@/components/settings/appearance-settings';
import { Sidebar } from '@/components/dashboard/sidebar';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { AlertCircle } from 'lucide-react';

export default function SettingsPage() {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout? You will be redirected to the home page.')) {
      logout();
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />

      <div className="flex-1 flex flex-col md:ml-0">
        <DashboardHeader onCreateNote={() => {}} />

        <main className="flex-1 px-4 sm:px-8 py-8 md:pt-12">
          <div className="max-w-4xl">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground">Settings</h1>
              <p className="text-muted-foreground mt-2">
                Manage your account, security, and preferences
              </p>
            </div>

            {/* Settings Sections */}
            <div className="space-y-6 mb-8">
              {/* Profile Settings */}
              <ProfileSettings
                initialName={user?.name || ''}
                initialEmail={user?.email || ''}
              />

              {/* Security Settings */}
              <SecuritySettings />

              {/* Notification Settings */}
              <NotificationSettings />

              {/* Appearance Settings */}
              <AppearanceSettings />
            </div>

            {/* Danger Zone */}
            <Card className="p-6 border-destructive/20 bg-destructive/5">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-destructive/10 rounded-lg">
                  <AlertCircle className="w-6 h-6 text-destructive" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-destructive mb-2">Danger Zone</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    These actions are permanent and cannot be undone. Proceed with caution.
                  </p>
                  <div className="space-y-2">
                    <div>
                      <h4 className="font-medium text-foreground text-sm mb-2">Logout</h4>
                      <p className="text-xs text-muted-foreground mb-3">
                        Sign out of your account on this device.
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-destructive border-destructive/50 hover:bg-destructive/10"
                        onClick={handleLogout}
                      >
                        Logout
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
