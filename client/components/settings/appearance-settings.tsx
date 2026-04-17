'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Palette, Check, Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from '@/lib/theme-context';

interface ThemeOption {
  id: 'light' | 'dark' | 'auto';
  name: string;
  description: string;
  icon: React.ReactNode;
}

export function AppearanceSettings() {
  const { theme, setTheme, isDark } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState<string>(theme);
  const [fontSize, setFontSize] = useState<string>('medium');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setSelectedTheme(theme);
  }, [theme]);

  const themeOptions: ThemeOption[] = [
    {
      id: 'light',
      name: 'Light',
      description: 'Clean and bright interface',
      icon: <Sun className="w-5 h-5" />,
    },
    {
      id: 'dark',
      name: 'Dark',
      description: 'Easy on the eyes in low light',
      icon: <Moon className="w-5 h-5" />,
    },
    {
      id: 'auto',
      name: 'System',
      description: 'Match your device settings',
      icon: <Monitor className="w-5 h-5" />,
    },
  ];

  const fontSizeOptions = [
    { id: 'small', label: 'Small', preview: 'text-sm' },
    { id: 'medium', label: 'Medium', preview: 'text-base' },
    { id: 'large', label: 'Large', preview: 'text-lg' },
  ];

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'auto') => {
    setSelectedTheme(newTheme);
    setTheme(newTheme);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleSaveAppearance = async () => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  if (!mounted) {
    return null;
  }

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Palette className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Appearance</h3>
          <p className="text-sm text-muted-foreground">Customize how the app looks</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Theme Selection */}
        <div>
          <h4 className="font-medium text-foreground mb-4">Theme</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {themeOptions.map((themeOption) => (
              <button
                key={themeOption.id}
                onClick={() => handleThemeChange(themeOption.id)}
                className={`relative p-4 rounded-lg border-2 transition flex flex-col items-start gap-3 ${
                  selectedTheme === themeOption.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-start justify-between w-full">
                  <div className="text-primary">{themeOption.icon}</div>
                  {selectedTheme === themeOption.id && (
                    <Check className="w-5 h-5 text-primary" />
                  )}
                </div>
                <div className="text-left">
                  <h5 className="font-medium text-foreground">{themeOption.name}</h5>
                  <p className="text-sm text-muted-foreground">{themeOption.description}</p>
                </div>
              </button>
            ))}
          </div>
          {selectedTheme === 'auto' && (
            <p className="text-sm text-muted-foreground mt-3">
              Currently using {isDark ? 'dark' : 'light'} mode based on your system settings.
            </p>
          )}
        </div>

        {/* Font Size Selection */}
        <div className="border-t border-border pt-6">
          <h4 className="font-medium text-foreground mb-4">Font Size</h4>
          <div className="space-y-3">
            {fontSizeOptions.map((option) => (
              <label
                key={option.id}
                className="flex items-center gap-3 p-3 rounded-lg border border-border cursor-pointer hover:bg-muted transition"
              >
                <input
                  type="radio"
                  name="fontSize"
                  value={option.id}
                  checked={fontSize === option.id}
                  onChange={(e) => setFontSize(e.target.value)}
                  className="w-4 h-4 accent-primary"
                />
                <div className="flex-1">
                  <span className="font-medium text-foreground">{option.label}</span>
                  <span className={`block ${option.preview} text-muted-foreground`}>
                    The quick brown fox jumps over the lazy dog
                  </span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Save Button */}
        {saveSuccess && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
            Appearance settings saved successfully!
          </div>
        )}

        <div className="flex justify-end pt-4 border-t border-border">
          <Button
            onClick={handleSaveAppearance}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Save Preferences
          </Button>
        </div>
      </div>
    </Card>
  );
}
