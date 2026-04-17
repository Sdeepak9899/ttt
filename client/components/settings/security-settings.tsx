'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock, CheckCircle } from 'lucide-react';
import { useAuthStore } from '@/lib/store/authStore';

export function SecuritySettings() {
  const { updatePassword, isLoading } = useAuthStore();
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: '',
  });
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [localError, setLocalError] = useState('');

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
    setLocalError('');
  };

  const handlePasswordSubmit = async () => {
    if (passwordData.new !== passwordData.confirm) {
      setLocalError('Passwords do not match');
      return;
    }
    if (passwordData.new.length < 8) {
      setLocalError('Password must be at least 8 characters long');
      return;
    }
    
    setLocalError('');
    try {
      await updatePassword({
        oldPassword: passwordData.current,
        newPassword: passwordData.new
      });
      setSaveSuccess(true);
      setPasswordData({ current: '', new: '', confirm: '' });
      setShowPasswordForm(false);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: any) {
      setLocalError(err.message || 'Failed to update password');
    }
  };

  const handleToggle2FA = async () => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    setTwoFactorEnabled(!twoFactorEnabled);
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Lock className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Security Settings</h3>
          <p className="text-sm text-muted-foreground">Manage your account security</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Password Section */}
        <div className="border-b border-border pb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="font-medium text-foreground">Change Password</h4>
              <p className="text-sm text-muted-foreground">
                Update your password regularly to keep your account secure
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowPasswordForm(!showPasswordForm)}
            >
              {showPasswordForm ? 'Cancel' : 'Change Password'}
            </Button>
          </div>

          {showPasswordForm && (
            <div className="bg-muted p-4 rounded-lg space-y-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Current Password
                </label>
                <Input
                  type="password"
                  name="current"
                  value={passwordData.current}
                  onChange={handlePasswordChange}
                  placeholder="Enter current password"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  New Password
                </label>
                <Input
                  type="password"
                  name="new"
                  value={passwordData.new}
                  onChange={handlePasswordChange}
                  placeholder="Enter new password (min. 8 characters)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Confirm Password
                </label>
                <Input
                  type="password"
                  name="confirm"
                  value={passwordData.confirm}
                  onChange={handlePasswordChange}
                  placeholder="Confirm new password"
                />
              </div>

              {localError && (
                <p className="text-sm text-destructive">{localError}</p>
              )}

              <Button
                onClick={handlePasswordSubmit}
                disabled={isLoading}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {isLoading ? 'Updating...' : 'Update Password'}
              </Button>
            </div>
          )}
        </div>

        {/* Two-Factor Authentication */}
        <div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-foreground flex items-center gap-2">
                Two-Factor Authentication
                {twoFactorEnabled && (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                )}
              </h4>
              <p className="text-sm text-muted-foreground mt-1">
                {twoFactorEnabled
                  ? 'Your account is protected with two-factor authentication'
                  : 'Add an extra layer of security to your account'}
              </p>
            </div>
            <Button
              variant={twoFactorEnabled ? 'outline' : 'default'}
              size="sm"
              onClick={handleToggle2FA}
            >
              {twoFactorEnabled ? 'Disable' : 'Enable'}
            </Button>
          </div>
        </div>

        {saveSuccess && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
            Security settings updated successfully!
          </div>
        )}
      </div>
    </Card>
  );
}
