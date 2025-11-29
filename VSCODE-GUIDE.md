# VS Code Configuration Guide

This project now includes comprehensive VS Code configuration files to enhance your development experience.

## Configuration Files

### 1. `.vscode/launch.json` - Debug Configurations

Three debug configurations are available:

#### Launch Server
- Starts the Node.js/Express server in debug mode
- Uses the `.env` file for environment variables
- Allows setting breakpoints and stepping through code

#### Launch Server (nodemon)
- Starts the server with nodemon for automatic restart on file changes
- Useful for development with live reload
- Requires nodemon to be installed (`npm install -g nodemon` or use local nodemon from `node_modules`)

#### Run Tests
- Runs the smoke tests for the public API
- Configurable test parameters (email, password, name)
- Helps verify API endpoints are working correctly

### 2. `.vscode/settings.json` - Editor Settings

Configured settings include:

- **Live Server**: Port 5501 for static file serving
- **Editor**: Format on save, 2-space indentation, Prettier as default formatter
- **JavaScript**: Auto-imports, relative module specifiers
- **Files**: Excludes node_modules and .git from search
- **HTML/CSS**: Auto-closing tags, CSS validation

### 3. `.vscode/extensions.json` - Recommended Extensions

When you open this project in VS Code, you'll be prompted to install recommended extensions:

**Essential:**
- Live Server - For serving static HTML files
- Prettier - Code formatter
- ESLint - JavaScript linter

**HTML/CSS/JavaScript:**
- Auto Close Tag
- Auto Rename Tag
- CSS Peek
- HTML CSS Class Completion

**Node.js Development:**
- npm Intellisense
- npm Script Runner

**Git:**
- GitLens

**Utilities:**
- TODO Highlight
- Indent Rainbow
- Color Highlight

**Database:**
- MongoDB for VS Code

## How to Use

### Debugging the Server

1. Open the project in VS Code
2. Press `F5` or go to Run and Debug panel (Ctrl+Shift+D)
3. Select "Launch Server" or "Launch Server (nodemon)" from the dropdown
4. Click the green play button or press `F5`
5. Set breakpoints by clicking on the line numbers
6. Use the debug toolbar to step through code

### Running Tests

1. Go to Run and Debug panel
2. Select "Run Tests" from the dropdown
3. Click the green play button
4. View test output in the integrated terminal

### Using Live Server

1. Install the Live Server extension (if prompted)
2. Right-click on `index.html`
3. Select "Open with Live Server"
4. Your default browser will open at `http://localhost:5501`

## Notes

- All VS Code configuration files use JSONC (JSON with Comments) format, which is standard for VS Code
- The `.env` file is used by the debug configurations for environment variables
- Make sure to run `npm install` before debugging the server

## Troubleshooting

**Issue**: Debug configuration doesn't start
- **Solution**: Make sure you've run `npm install` to install dependencies

**Issue**: MongoDB connection error
- **Solution**: Ensure MongoDB is running locally or update `MONGODB_URI` in `.env` file

**Issue**: Nodemon not found
- **Solution**: Install nodemon globally (`npm install -g nodemon`) or use the regular "Launch Server" configuration
