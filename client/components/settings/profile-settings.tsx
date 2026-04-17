'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Save, User } from 'lucide-react';
import { useAuthStore } from '@/lib/store/authStore';

interface ProfileSettingsProps {
  initialName: string;
  initialEmail: string;
}

export function ProfileSettings({ initialName, initialEmail }: ProfileSettingsProps) {
  const { updateProfile } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [localError, setLocalError] = useState('');
  const [formData, setFormData] = useState({
    name: initialName,
    email: initialEmail,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setLocalError('');
  };

  const handleSave = async () => {
    if (!formData.name.trim()) return;

    setIsSaving(true);
    setLocalError('');
    try {
      await updateProfile({ name: formData.name });
      setSaveSuccess(true);
      setIsEditing(false);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: any) {
      setLocalError(err.message || 'Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: initialName,
      email: initialEmail,
    });
    setIsEditing(false);
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary/10 rounded-lg">
          <User className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Profile Information</h3>
          <p className="text-sm text-muted-foreground">Update your personal details</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="disabled:bg-muted"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Email Address
          </label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            disabled
            className="disabled:bg-muted"
            placeholder="your.email@example.com"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Email address cannot be changed
          </p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex flex-col">
            {saveSuccess && (
              <p className="text-sm text-green-600">Changes saved successfully!</p>
            )}
            {localError && (
              <p className="text-sm text-destructive">{localError}</p>
            )}
            {!saveSuccess && !localError && !isEditing && (
              <p className="text-sm text-muted-foreground">No unsaved changes</p>
            )}
          </div>

          <div className="flex gap-2">
            {isEditing && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCancel}
                  disabled={isSaving}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleSave}
                  disabled={isSaving}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
              </>
            )}
            {!isEditing && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
