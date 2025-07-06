# 🚀 Quick Dependency Management Guide

## ⚡ Quick Commands

### Check Dependencies
```bash
npm run deps-outdated    # Check for outdated packages
npm run deps-check       # Check for available updates
npm run audit           # Check for security issues
```

### Update Dependencies
```bash
npm run update-deps-interactive  # Interactive update (recommended)
npm run update-deps-script       # Automated update script
npm run update-deps              # Update within current ranges
```

### Maintenance
```bash
npm run clean           # Clean install
npm run audit-fix       # Fix security issues
npm run format          # Format code
npm run lint            # Lint code
```

## 🎯 Recommended Workflow

### Monthly Maintenance
1. `npm run deps-outdated` - Check what's outdated
2. `npm run audit` - Check security
3. `npm run update-deps-interactive` - Update safely
4. `npm run dev` - Test the app
5. `npm run build` - Test the build

### Weekly Security Check
1. `npm run audit` - Check for vulnerabilities
2. `npm run audit-fix` - Fix if possible
3. `npm run dev` - Quick test

## 📋 What's New

✅ **Added npm-check-updates** - Interactive dependency updates  
✅ **Added Prettier** - Code formatting  
✅ **Added security scripts** - Automated security checks  
✅ **Added update script** - Automated update process  
✅ **Added documentation** - Comprehensive guides  

## 🔧 Files Added

- `.prettierrc` - Prettier configuration
- `.prettierignore` - Files to ignore
- `DEPENDENCIES.md` - Detailed guide
- `scripts/update-deps.sh` - Update automation script

## 🎉 You're All Set!

Your project now has a professional dependency management system that will make future updates much easier and safer! 