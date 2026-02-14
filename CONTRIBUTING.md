# Contributing to PDFLince

Thank you for your interest in contributing to PDFLince! We welcome contributions from everyone. By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).

## How to Contribute

### Reporting Bugs
If you find a bug, please create a new issue. Be sure to include:
- A clear description of the issue.
- Steps to reproduce.
- Expected vs. actual behavior.
- Screenshots if applicable.
- Browser and OS version.

### Suggesting Enhancements
We love new ideas! Please open an issue to discuss your feature request before working on it, so we can align on the approach.

### Pull Requests
1.  **Fork the repository** and clone it locally.
2.  Create a new branch for your feature or fix:
    ```bash
    git checkout -b feat/your-feature-name
    # or
    git checkout -b fix/your-fix-name
    ```
3.  **Make your changes**. Ensure your code follows the project's style (TypeScript, Tailwind CSS).
4.  **Run tests** to ensure no regressions:
    ```bash
    npm run test:e2e
    ```
5.  **Commit your changes** with descriptive messages.
6.  **Push to your fork** and submit a Pull Request to the `main` branch.

## Development Setup

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Start development server**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

3.  **Environment Variables**:
    Create a `.env.local` file (copy from `.env.example` if available) with necessary keys (e.g., Google Analytics ID for testing, though optional for dev).

## License
By contributing, you agree that your contributions will be licensed under the MIT License.
