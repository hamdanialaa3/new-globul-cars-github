# Security Rules - Bulgarian Car Marketplace

## Overview
This document outlines the comprehensive security rules implemented for the Bulgarian Car Marketplace, including Firestore Security Rules and Firebase Storage Security Rules.

## Firestore Security Rules

### Key Features
- **Authentication Required**: All data access requires authenticated users
- **Role-Based Access Control**: Admin users have elevated permissions
- **Data Validation**: Input validation for all data types
- **Rate Limiting**: Prevents abuse with write rate limits
- **Field-Level Security**: Sensitive fields are protected from unauthorized updates

### Collections Protected

#### Users Collection (`/users/{userId}`)
- **Read**: Owner or admin
- **Write**: Owner or admin
- **Validation**: Email format, required fields
- **Protected Fields**: `email`, `createdAt`, `lastLogin`

#### Cars Collection (`/cars/{carId}`)
- **Read**: All authenticated users
- **Write**: Owner or admin
- **Validation**: Price limits (0-10M BGN), required fields
- **Protected Fields**: `sellerId`, `createdAt`

#### Messages Collection (`/messages/{messageId}`)
- **Read/Write**: Message participants or admin
- **Validation**: Text length (1-1000 chars), required fields

#### Other Collections
- **Favorites**: User-specific access
- **Reviews**: Authenticated users with rating validation (1-5)
- **Files**: Owner or admin access
- **Admin Logs**: Admin-only access

## Firebase Storage Security Rules

### File Organization
```
bucket/
├── cars/{carId}/           # Car images
├── users/{userId}/         # User files
│   ├── profile/           # Profile pictures
│   └── documents/         # ID, license documents
├── messages/{messageId}/   # Chat attachments
├── admin/                  # Admin files
├── public/                 # Public assets
├── temp/                   # Temporary files
├── backups/                # Backup files
└── thumbnails/             # Auto-generated thumbnails
```

### Security Features
- **File Type Validation**: Only allowed file types (images, PDFs, docs)
- **Size Limits**: Max file sizes per type
- **Access Control**: Owner or admin permissions
- **Path-Based Security**: Different rules for different directories

## Deployment Instructions

### 1. Deploy Firestore Rules
```bash
firebase deploy --only firestore:rules
```

### 2. Deploy Storage Rules
```bash
firebase deploy --only storage
```

### 3. Test Rules Locally
```bash
firebase emulators:start --only firestore,storage
```

## Testing Security Rules

### Unit Tests
Create test files to validate your security rules:

```javascript
// firestore.test.js
const firebase = require('@firebase/testing');

const authedApp = firebase.initializeTestApp({
  projectId: 'your-project-id',
  auth: { uid: 'user123', email: 'user@example.com' }
});

describe('Firestore Security Rules', () => {
  it('should allow authenticated users to read cars', async () => {
    const db = authedApp.firestore();
    await firebase.assertSucceeds(
      db.collection('cars').doc('car123').get()
    );
  });

  it('should deny unauthenticated users', async () => {
    const db = firebase.initializeTestApp({
      projectId: 'your-project-id'
    }).firestore();

    await firebase.assertFails(
      db.collection('cars').doc('car123').get()
    );
  });
});
```

### Integration Tests
Test with your application code to ensure rules work in practice.

## Monitoring and Maintenance

### Regular Checks
1. **Review Access Logs**: Monitor Firebase Console for unusual access patterns
2. **Update Admin List**: Keep admin email list current
3. **Rule Updates**: Update rules as application evolves
4. **Performance**: Monitor rule evaluation performance

### Security Best Practices
- **Principle of Least Privilege**: Grant minimum required permissions
- **Defense in Depth**: Multiple layers of security
- **Regular Audits**: Periodic security rule reviews
- **Incident Response**: Plan for security incidents

## Troubleshooting

### Common Issues

#### "Missing or insufficient permissions"
- Check if user is authenticated
- Verify user has required permissions
- Check if data validation is passing

#### "Resource exhausted"
- Rate limiting may be triggered
- Wait before retrying operations

#### "Invalid data"
- Check field validation rules
- Ensure required fields are present
- Verify data types match expectations

### Debug Mode
Enable debug logging in Firebase Console to see rule evaluation details.

## Emergency Procedures

### Lock Down Access
If security breach is suspected:
1. Update rules to restrict all access
2. Deploy immediately
3. Investigate and fix root cause
4. Gradually restore access

### Backup and Recovery
- Regular backups of security rules
- Version control for all rule changes
- Test restores in staging environment

## Support

For security rule issues:
1. Check Firebase documentation
2. Review this guide
3. Contact development team
4. Create GitHub issue for rule improvements

## Version History

- **v1.0**: Initial security rules implementation
- **v1.1**: Added rate limiting and enhanced validation
- **v1.2**: Improved admin access controls
- **v1.3**: Added comprehensive file type validation