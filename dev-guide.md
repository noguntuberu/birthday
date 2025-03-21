## Development Workflow

### Branching Strategy:
Follow Gitflow-inspired approach:

1. main: Stable, deployable code.
2. develop: Integration branch for features in progress.
3. [name]: Short-lived branches for specific tasks.

### Code Reviews: 
At least one team member MUST review pull requests (PRs) before merging. Focus on functionality, readability, and adherence to standards.

### Commit Messages: 
Write clear, concise messages (e.g., "Add user authentication endpoint" or "Fix bug in payment form validation").

- `BD-1: change add friend button color`

## Coding Standards

### Style Guide:
Adopt a consistent style. Use linters - ESLint & Prettier.

### Modular Code:
Break code into reusable components or modules (e.g., separate UI components, API services, and utilities). Files MUST NOT be longer than 150 lines.

### Error Handling:
Implement consistent error handling (e.g., try-catch blocks, user-friendly messages).

## Testing

### Unit Tests:
Write tests for all functions. Aim for ~80% coverage of core logic.

### Integration Tests:
Test API endpoints and key workflows using postman



