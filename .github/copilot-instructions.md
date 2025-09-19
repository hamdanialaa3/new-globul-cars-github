# Copilot Instructions for AI Agents

## Project Overview
This codebase integrates a Bulgarian Car Marketplace with Google Cloud services, primarily using Firebase (Auth, Firestore, Storage, Functions, Analytics) and custom service layers. All integration logic is located in the `links/` directory, which contains enhanced wrappers and localization for Bulgarian requirements.

## Key Components
- **`firebase-config.ts`**: Centralizes Firebase initialization and Bulgarian localization (currency, timezone, region). Uses environment variables for secrets. Exports initialized services (`auth`, `db`, `storage`, `functions`).
- **`auth-service.ts`**: Provides a multi-language authentication service, supporting Google and Facebook login, Bulgarian user profiles, and localized error messages. Use the `BulgarianAuthService` class for all auth operations.
- **`messaging-service.ts`**: Implements a car-centric messaging and chat system, supporting comments, questions, offers, reviews, and replies. Use the `BulgarianMessagingService` class for messaging features.
- **`index.ts`**: Entry point for all Firebase integrations. Re-exports services and SDK methods for convenience.

## Developer Workflows
- **Testing**: Use `services-test.ts` for service-level tests and examples. Run tests by executing the file with Node.js or your TypeScript runner.
- **Environment Setup**: Ensure all required Firebase environment variables are set (see `firebase-config.ts`).
- **Localization**: All user-facing features should support Bulgarian and English. Use the `preferredLanguage` property and localization helpers.
- **Emulator Support**: Development can use Firebase emulators for Auth, Firestore, Functions, and Storage. See `firebase-config.ts` for connection logic.

## Patterns & Conventions
- All service classes are prefixed with `Bulgarian` (e.g., `BulgarianAuthService`).
- User objects extend the `BulgarianUser` interface, which includes Bulgarian-specific fields.
- Messaging uses the `CarMessage` and `ChatRoom` interfaces for structure.
- All integration logic is isolated in the `links/` directory for clarity and maintainability.
- Use environment variables for secrets and configuration.

## Integration Points
- **Google Cloud**: Firebase services are the main integration point. Extendable for other GCP APIs as needed.
- **External Auth**: Supports Google and Facebook login via Firebase providers.
- **Localization**: Currency, timezone, and language are set via `BULGARIAN_CONFIG`.

## Example Usage
```typescript
import { BulgarianAuthService } from './links/auth-service';
const authService = new BulgarianAuthService();
await authService.signUp('user@example.com', 'password', { displayName: 'Иван Иванов', preferredLanguage: 'bg' });

import { BulgarianMessagingService } from './links/messaging-service';
const messagingService = new BulgarianMessagingService();
await messagingService.sendCarMessage({ carId: '123', text: 'Колата изглежда страхотно!', language: 'bg' });
```

## References
- See `links/README.md` for detailed documentation and Arabic-language usage notes.
- For new integrations, follow the structure and naming conventions in `links/`.

---
If any section is unclear or incomplete, please provide feedback to improve these instructions.