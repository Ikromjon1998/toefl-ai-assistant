# Dependency Management Guide

This document explains how to manage dependencies in the TOEFL AI Assistant project.

## 📦 Available Scripts

### Update Dependencies
```bash
# Check for outdated dependencies
npm run deps-outdated

# Check for available updates (without installing)
npm run deps-check

# Update all dependencies to latest versions (interactive)
npm run update-deps-interactive

# Update dependencies within current version ranges
npm run update-deps
```

### Security & Maintenance
```bash
# Check for security vulnerabilities
npm run audit

# Fix security vulnerabilities automatically
npm run audit-fix

# Clean install (remove node_modules and reinstall)
npm run clean
```

### Code Quality
```bash
# Format code with Prettier
npm run format

# Lint code with ESLint
npm run lint

# Type checking (if using TypeScript)
npm run type-check
```

## 🔄 Dependency Update Workflow

### 1. Regular Maintenance (Monthly)
```bash
# 1. Check for outdated packages
npm run deps-outdated

# 2. Check for security issues
npm run audit

# 3. Update dependencies interactively
npm run update-deps-interactive

# 4. Test the application
npm run dev
npm run build
```

### 2. Security Updates (Weekly)
```bash
# 1. Check for security vulnerabilities
npm run audit

# 2. Fix automatically if possible
npm run audit-fix

# 3. Test the application
npm run dev
```

### 3. Major Version Updates (Quarterly)
```bash
# 1. Check for major updates
npm run deps-check

# 2. Update major versions carefully
npm run update-deps-interactive

# 3. Review breaking changes
# 4. Update code if necessary
# 5. Test thoroughly
npm run dev
npm run build
npm run lint
```

## 🛠️ Key Dependencies

### Production Dependencies
- **React**: UI framework
- **React DOM**: React rendering for web
- **React Markdown**: Markdown rendering
- **Remark GFM**: GitHub Flavored Markdown support
- **EmailJS**: Email functionality

### Development Dependencies
- **Vite**: Build tool and dev server
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Tailwind CSS**: Utility-first CSS framework
- **PostCSS**: CSS processing
- **npm-check-updates**: Dependency update tool

## 🔧 Configuration Files

### .prettierrc
Prettier configuration for consistent code formatting.

### .prettierignore
Files and directories to exclude from Prettier formatting.

### eslint.config.js
ESLint configuration for code linting rules.

### tailwind.config.js
Tailwind CSS configuration.

### vite.config.js
Vite build tool configuration.

## 🚨 Important Notes

### Before Updating Dependencies
1. **Commit your current work** to git
2. **Create a backup branch** if making major updates
3. **Read changelogs** for breaking changes
4. **Test thoroughly** after updates

### After Updating Dependencies
1. **Run the development server** to check for errors
2. **Build the project** to ensure it compiles
3. **Run linting** to check for code issues
4. **Test all functionality** manually

### Security Best Practices
1. **Run `npm audit` regularly**
2. **Update dependencies promptly** when security issues are found
3. **Use `npm audit fix`** for automatic fixes
4. **Review security advisories** for critical packages

## 📋 Dependency Update Checklist

- [ ] Check current dependency status
- [ ] Review security vulnerabilities
- [ ] Read changelogs for breaking changes
- [ ] Update dependencies
- [ ] Test development server
- [ ] Test production build
- [ ] Run linting and formatting
- [ ] Test all application features
- [ ] Commit changes with descriptive message
- [ ] Update this documentation if needed

## 🆘 Troubleshooting

### Common Issues

**Build fails after update:**
```bash
# Clean install
npm run clean

# Check for peer dependency issues
npm ls
```

**Security vulnerabilities:**
```bash
# Check details
npm audit

# Fix automatically
npm run audit-fix

# Manual fix if needed
npm install package-name@latest
```

**Performance issues:**
```bash
# Check bundle size
npm run build

# Analyze dependencies
npx vite-bundle-analyzer
```

## 📚 Additional Resources

- [npm Documentation](https://docs.npmjs.com/)
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Prettier Documentation](https://prettier.io/)
- [ESLint Documentation](https://eslint.org/) 