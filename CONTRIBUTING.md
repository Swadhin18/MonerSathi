# Contributing to MonerSathi

Thank you for your interest in contributing to MonerSathi! This project aims to provide emotional support for Bengali-speaking users, and we welcome contributions that improve the quality, safety, and accessibility of the service.

## 🌟 Ways to Contribute

- **Report bugs** - Use GitHub Issues
- **Suggest features** - Use GitHub Issues with "enhancement" label
- **Improve Bangla translations** - Help us improve empathy and naturalness
- **Add crisis keywords** - Help us detect more crisis situations
- **Write tests** - Improve reliability
- **Fix bugs** - Submit pull requests
- **Improve documentation** - Help others understand the project

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Node.js 20+
- npm or yarn
- Supabase account (free tier)
- OpenAI API key (for testing AI features)
- Basic understanding of React, TypeScript, and Supabase

### Development Setup

1. **Fork and clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/monersathi.git
cd monersathi
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
# Edit .env with your Supabase credentials
```

4. **Start development server**
```bash
npm run dev
```

5. **Run tests**
```bash
npm run test
```

## 📝 Code of Conduct

### Our Standards

- **Empathy First**: All contributions should prioritize user well-being
- **Safety**: Never introduce changes that could compromise crisis detection
- **Privacy**: No changes that compromise user anonymity or data security
- **Inclusivity**: Use welcoming, inclusive language
- **Bangla Quality**: Maintain high-quality, natural Bangla

### Unacceptable Behavior

- Adding features that claim to diagnose mental health conditions
- Removing or weakening crisis detection
- Adding tracking or data collection
- Using sexualized language or imagery
- Trolling, insulting, or derogatory comments

## 🔧 Development Guidelines

### Code Style

- Use TypeScript for all new files
- Follow existing code patterns
- Use meaningful variable and function names
- Add JSDoc comments for complex functions
- No console.log in production code (use proper logging)

### Component Structure

```tsx
// Component file structure
import { ... } from '...';

interface ComponentProps {
  // props definition
}

export default function Component({ prop }: ComponentProps) {
  // hooks at the top
  // event handlers
  // render logic
}
```

### Commit Messages

Follow conventional commits:
```
feat: add new mood detection for anger
fix: resolve crisis detection false positive
docs: update README with deployment steps
test: add tests for new safety keywords
style: improve chat bubble animations
refactor: simplify API error handling
```

### Branch Naming

- `feature/description` - New features
- `bugfix/description` - Bug fixes
- `improvement/description` - Enhancements
- `docs/description` - Documentation updates

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm run test

# Run with UI
npm run test:ui

# Run specific test file
npm run test crisis-detection.test.ts
```

### Writing Tests

- Write tests for new features
- Test edge cases
- Test Bangla Unicode handling
- Test crisis detection thoroughly

### Test Structure

```typescript
describe('Feature Name', () => {
  it('should do something specific', () => {
    // arrange
    // act
    // assert
  });

  it('should handle edge case', () => {
    // test edge case
  });
});
```

## 🛡️ Safety Guidelines

### Crisis Detection

When modifying safety-related code:

1. **NEVER** remove or weaken crisis detection
2. **NEVER** bypass crisis checks before AI calls
3. **ALWAYS** test with sample crisis messages
4. **ALWAYS** ensure emergency numbers are displayed

### Adding Keywords

To add new crisis keywords, edit `supabase/functions/_shared/crisis_keywords.json`:

```json
{
  "self_harm": {
    "keywords": [
      "existing keyword",
      "new keyword"
    ],
    "patterns": [
      "existing pattern",
      "new pattern"
    ]
  }
}
```

**Important**: Test thoroughly before submitting PR.

### AI Prompt Engineering

When modifying the AI system prompt:

1. Maintain empathetic tone
2. Never claim to be a therapist
3. Never provide medical advice
4. Always respond in Bangla
5. Keep responses concise

## 📚 Documentation

### What to Document

- New features in README.md
- API changes in API.md
- Safety changes in documentation
- Bangla translation guidelines

### Documentation Style

- Use clear, simple language
- Include code examples
- Explain WHY, not just WHAT
- Keep it up-to-date

## 🔄 Pull Request Process

### Before Submitting

1. **Test thoroughly**
```bash
npm run test
npm run build
npm run typecheck
```

2. **Update documentation** for changed features

3. **Add tests** for new features

4. **Test crisis detection** with sample messages

### PR Checklist

- [ ] Code follows style guidelines
- [ ] All tests pass
- [ ] New features have tests
- [ ] Documentation updated
- [ ] No security vulnerabilities
- [ ] Crisis detection still works
- [ ] Bangla quality maintained

### Review Process

1. Submit PR with clear description
2. Wait for review
3. Address feedback
4. Once approved, maintainers will merge

## 🐛 Bug Reports

### Good Bug Report Format

```markdown
**Description**
Brief description of the bug

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior**
What should happen

**Actual Behavior**
What actually happened

**Environment**
- OS: [e.g., macOS, Windows, Linux]
- Browser: [e.g., Chrome, Safari]
- Node Version: [e.g., 20.0.0]

**Screenshots**
If applicable

**Additional Context**
Any other context
```

### Security Bugs

For security issues, DO NOT open a public issue. Email: security@monersathi.org

## 💡 Feature Requests

### Good Feature Request Format

```markdown
**Is your feature request related to a problem?**
Clear description of the problem

**Describe the solution you'd like**
What you want to happen

**Describe alternatives you've considered**
Other solutions you thought about

**Additional Context**
Any other context or screenshots

**Impact on Safety**
How does this affect user safety?
```

## 🙏 Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Credited in the application

## 📞 Questions?

- Open a GitHub Discussion for general questions
- Open a GitHub Issue for bugs/features
- Email: dev@monersathi.org

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for helping make emotional support more accessible for Bengali speakers! 💙
