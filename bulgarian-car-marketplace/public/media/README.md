# Bulgarian Car Marketplace - Media Folder Structure

This document explains the media folder structure in the Bulgarian car marketplace project.

## Folder Structure

```
public/media/
├── images/
│   ├── cars/              # Car images
│   ├── users/             # User images
│   ├── logos/             # Logos
│   ├── ads/               # Advertisement images
│   ├── avatars/           # Profile pictures
│   ├── backgrounds/       # Background images
│   ├── features/          # Feature images
│   ├── icons/             # Icons
│   └── thumbnails/        # Thumbnail images
│       ├── cars/          # Car thumbnail images
│       └── users/         # User thumbnail images
├── videos/
│   ├── cars/              # Car videos
│   ├── ads/               # Advertisement videos
│   ├── tutorials/         # Tutorial videos
│   └── thumbnails/        # Video thumbnails
├── audio/
│   ├── ads/               # Audio files for advertisements
│   ├── tutorials/         # Audio files for tutorials
│   ├── notifications/     # Audio files for notifications
│   └── background/        # Audio files for background music
├── documents/             # Documents
├── temp/                  # Temporary files
├── archive/               # Archive
├── backup/                # Backup
└── archives/              # Compressed files
    ├── cars/              # Car archives
    ├── documents/         # Document archives
    ├── backup/            # Backup archives
    ├── images/            # Image archives
    ├── videos/            # Video archives
    ├── audio/             # Audio archives
    ├── temp/              # Temporary files archives
    ├── archive/           # Archive archives
    ├── ads/               # Advertisement archives
    ├── tutorials/         # Tutorial archives
    ├── features/          # Feature archives
    ├── icons/             # Icon archives
    ├── logos/             # Logo archives
    ├── avatars/           # Profile picture archives
    ├── backgrounds/       # Background image archives
    ├── notifications/     # Notification archives
    ├── background/        # Background music archives
    └── thumbnails/        # Thumbnail archives
        ├── cars/          # Car thumbnail archives
        ├── users/         # User thumbnail archives
        ├── videos/        # Video thumbnail archives
        ├── audio/         # Audio thumbnail archives
        ├── documents/     # Document thumbnail archives
        ├── ads/           # Advertisement thumbnail archives
        ├── tutorials/     # Tutorial thumbnail archives
        ├── features/      # Feature thumbnail archives
        ├── icons/         # Icon thumbnail archives
        ├── logos/         # Logo thumbnail archives
        ├── avatars/       # Profile picture thumbnail archives
        ├── backgrounds/   # Background image thumbnail archives
        └── notifications/ # Notification thumbnail archives
```

## Usage

### File Storage
- Use appropriate folders for each file type
- Keep thumbnail images in the `thumbnails` folder
- Use `temp` folder for temporary files
- Move old files to `archive` folder

### Firebase Storage
- These folders can be linked to Firebase Storage service
- Use the same structure in the cloud
- Automatically optimize images when uploading

### Git and .gitignore
- `.gitignore` files have been created in appropriate folders to ignore large files
- `.gitkeep` files have been created to ensure empty folders are tracked
- Do not add large files to Git

### Security
- Do not store sensitive files in the public folder
- Use Firebase Storage for private files
- Check files before uploading

## Notes
- This structure has been created to better organize media files
- Supports future expansion
- Compatible with Firebase Storage
- Supports backup and archiving
- Protected from accidentally adding large files to Git