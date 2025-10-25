---
sidebar_position: 3
---

# Multi-language Support

Tududi provides comprehensive multi-language support powered by i18next.

## Supported Languages

Tududi currently supports the following languages:

- English (en)
- Spanish (es)
- French (fr)
- German (de)
- And more...

Check the `frontend/locales/` directory for the complete list.

## Changing Language

### User Interface

1. Click your profile icon
2. Select "Settings"
3. Go to "Language & Region"
4. Choose your preferred language
5. Click "Save"

The interface will update immediately.

### Browser Language Detection

Tududi automatically detects your browser language on first visit:

```javascript
// Automatic detection
i18next.use(LanguageDetector)
```

Override this by manually selecting a language in settings.

## Adding a New Language

### 1. Create Language Files

Create a new directory under `frontend/locales/`:

```bash
mkdir frontend/locales/ja  # For Japanese
```

### 2. Copy Translation Files

Copy the English translation files as a starting point:

```bash
cp -r frontend/locales/en/* frontend/locales/ja/
```

### 3. Translate Content

Edit the JSON files in your new language directory:

```json
// frontend/locales/ja/common.json
{
  "app.name": "Tududi",
  "app.tagline": "タスク管理システム",
  "navigation.home": "ホーム",
  "navigation.tasks": "タスク",
  "navigation.projects": "プロジェクト"
}
```

### 4. Update Configuration

Add your language to the i18next configuration:

```typescript
// frontend/i18n.ts
i18next.init({
  lng: 'en',
  fallbackLng: 'en',
  supportedLngs: ['en', 'es', 'fr', 'de', 'ja'], // Add your language
  // ...
});
```

### 5. Add Language Selector

The language will automatically appear in the language selector.

## Translation Files Structure

```
frontend/locales/
├── en/
│   ├── common.json        # Common UI elements
│   ├── tasks.json         # Task-related strings
│   ├── projects.json      # Project-related strings
│   ├── settings.json      # Settings page
│   └── errors.json        # Error messages
├── es/
│   ├── common.json
│   ├── tasks.json
│   └── ...
└── fr/
    └── ...
```

## Using Translations in Code

### In React Components

```tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('tasks.title')}</h1>
      <p>{t('tasks.description', { count: 5 })}</p>
    </div>
  );
}
```

### With Parameters

```json
{
  "tasks.completed": "You have completed {{count}} tasks"
}
```

```tsx
t('tasks.completed', { count: 10 })
// Output: "You have completed 10 tasks"
```

### Pluralization

```json
{
  "tasks.count_one": "{{count}} task",
  "tasks.count_other": "{{count}} tasks"
}
```

```tsx
t('tasks.count', { count: 1 })  // "1 task"
t('tasks.count', { count: 5 })  // "5 tasks"
```

## Translation Management

### Checking for Missing Translations

Use the built-in script to find missing translations:

```bash
npm run translations:check
```

This will show which keys are missing in each language.

### Syncing Translations

Sync translations across all languages:

```bash
# Sync all languages
npm run translations:sync-all

# Dry run to see what would change
npm run translations:dry-run

# Export missing translations
npm run translations:export
```

### Translation Guidelines

When translating:

1. **Keep context in mind**: Some words change meaning based on context
2. **Preserve formatting**: Keep HTML tags and variables intact
3. **Test in UI**: See how translations look in the actual interface
4. **Use native speakers**: Get help from native speakers when possible
5. **Be consistent**: Use the same terms throughout

## Regional Settings

### Date and Time Formats

Tududi automatically formats dates based on locale:

```typescript
// en-US: 12/31/2023
// en-GB: 31/12/2023
// de-DE: 31.12.2023
// ja-JP: 2023/12/31
```

### Number Formats

Numbers are formatted according to locale:

```typescript
// en-US: 1,234.56
// de-DE: 1.234,56
// fr-FR: 1 234,56
```

### Timezone Support

Set your timezone in settings:

1. Settings → Language & Region
2. Select timezone
3. All dates will display in your timezone

## Right-to-Left (RTL) Languages

Support for RTL languages (Arabic, Hebrew) is planned for future releases.

## Contributing Translations

Help translate Tududi:

1. Fork the repository
2. Add or improve translations
3. Test your changes
4. Submit a pull request

See [Contributing Guide](https://github.com/tududi/tududi/blob/main/CONTRIBUTING.md) for details.

## Next Steps

- [Telegram Integration](/docs/features/telegram-integration) - Use Tududi via Telegram
- [API Reference](/docs/api/overview) - Integrate with Tududi
