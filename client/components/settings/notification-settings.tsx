'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';

interface NotificationOption {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

export function NotificationSettings() {
  const [notifications, setNotifications] = useState<NotificationOption[]>([
    {
      id: 'email-updates',
      label: 'Email Notifications',
      description: 'Receive email updates about your notes and activity',
      enabled: true,
    },
    {
      id: 'reminders',
      label: 'Note Reminders',
      description: 'Get reminders for important notes and deadlines',
      enabled: false,
    },
    {
      id: 'sharing',
      label: 'Sharing Notifications',
      description: 'Receive notifications when notes are shared with you',
      enabled: true,
    },
    {
      id: 'weekly',
      label: 'Weekly Digest',
      description: 'Get a weekly summary of your notes and activity',
      enabled: false,
    },
  ]);

  const [saveSuccess, setSaveSuccess] = useState(false);

  const toggleNotification = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, enabled: !notif.enabled } : notif
      )
    );
  };

  const handleSavePreferences = async () => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Bell className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Notification Preferences</h3>
          <p className="text-sm text-muted-foreground">Control how you receive notifications</p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted/80 transition"
          >
            <div className="flex-1">
              <h4 className="font-medium text-foreground">{notif.label}</h4>
              <p className="text-sm text-muted-foreground">{notif.description}</p>
            </div>
            <button
              onClick={() => toggleNotification(notif.id)}
              className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors ${
                notif.enabled ? 'bg-primary' : 'bg-muted-foreground/30'
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                  notif.enabled ? 'translate-x-9' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        ))}
      </div>

      {saveSuccess && (
        <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
          Notification preferences saved successfully!
        </div>
      )}

      <div className="flex justify-end">
        <Button
          onClick={handleSavePreferences}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Save Preferences
        </Button>
      </div>
    </Card>
  );
}
