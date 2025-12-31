# Contributing to FieldMap

Thank you for your interest in contributing to FieldMap! This document provides guidelines and instructions for contributing.

## Code of Conduct

Be respectful and professional in all interactions. We're building a tool to help farmers and agricultural professionals, so let's maintain a welcoming environment.

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Your environment (OS, browser, Node version)

### Suggesting Features

Feature suggestions are welcome! Please:
- Check if the feature already exists or has been requested
- Describe the use case and benefit
- Provide examples or mockups if possible

### Pull Requests

1. **Fork the repository**
   ```bash
   git clone https://github.com/Gianetans/field-map.git
   cd field-map
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow the existing code style
   - Add comments for complex logic
   - Update documentation as needed

4. **Test your changes**
   ```bash
   npm run build
   npm run lint
   ```

5. **Commit with clear messages**
   ```bash
   git commit -m "Add feature: description of changes"
   ```

6. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

## Development Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env.local` with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
   ```

3. Run development server:
   ```bash
   npm run dev
   ```

## Code Style

- **TypeScript**: Use proper types, avoid `any`
- **Components**: Functional components with TypeScript
- **Formatting**: Let Prettier/ESLint handle formatting
- **Naming**: 
  - Components: PascalCase
  - Files: kebab-case for utilities, PascalCase for components
  - Functions: camelCase

## Project Structure

```
field-map/
├── app/              # Next.js App Router pages
├── components/       # React components
│   ├── ui/          # Base UI components
│   └── Map/         # Map-specific components
├── lib/             # Utility functions
├── types/           # TypeScript type definitions
└── supabase/        # Database schema and migrations
```

## Areas Needing Contribution

### High Priority
- [ ] Implement actual Leaflet map with drawing tools
- [ ] Connect pages to Supabase for real data
- [ ] Add drag-and-drop to rotation planner
- [ ] Implement crop suggestion algorithm
- [ ] Add authentication flow

### Medium Priority
- [ ] Create field edit forms
- [ ] Add soil test tracking
- [ ] Implement amendment logging
- [ ] Add export/import features
- [ ] Mobile responsive improvements

### Low Priority
- [ ] Add unit tests
- [ ] Implement PDF export
- [ ] Add keyboard shortcuts
- [ ] Dark mode
- [ ] Internationalization

## Testing

Currently, the project focuses on TypeScript compilation and build success:

```bash
npm run build  # Ensure builds without errors
npm run lint   # Check for linting issues
```

We welcome contributions that add proper testing infrastructure!

## Documentation

When adding features:
- Update README.md if needed
- Add JSDoc comments for complex functions
- Update types in `types/index.ts`
- Document rotation rules if adding new logic

## Questions?

Open an issue with the "question" label, or reach out via GitHub Discussions.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for helping make FieldMap better! 🌱
