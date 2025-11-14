.PHONY: help install build dev clean serve lint lint-fix format type-check test test-unit test-watch coverage docs docs-serve commit push

help:
	@echo "Brick Breaker Web Game - Available Commands"
	@echo "============================================"
	@echo ""
	@echo "Development"
	@echo "  make install      - Install dependencies"
	@echo "  make build        - Build the project"
	@echo "  make dev          - Start development server"
	@echo "  make serve        - Serve the built project"
	@echo "  make clean        - Clean build artifacts"
	@echo ""
	@echo "Testing"
	@echo "  make test         - Run all tests"
	@echo "  make test-unit    - Run unit tests only"
	@echo "  make test-watch   - Run tests in watch mode"
	@echo "  make coverage     - Generate coverage report"
	@echo ""
	@echo "Quality"
	@echo "  make lint         - Run linter"
	@echo "  make lint-fix     - Fix linting issues"
	@echo "  make type-check   - TypeScript type checking"
	@echo "  make format       - Format code with Prettier"
	@echo ""
	@echo "Git helpers"
	@echo "  make commit       - Interactive commit (with validation)"
	@echo "  make push         - Push with checks"
	@echo ""
	@echo "Documentation"
	@echo "  make docs         - Generate API documentation"
	@echo "  make docs-serve   - Serve documentation locally"

install:
	@echo "Installing dependencies..."
	npm install

build: type-check lint
	@echo "Building project..."
	npm run build

dev:
	@echo "Starting development server..."
	npm run dev

serve:
	@echo "Serving built project..."
	npm run serve

clean:
	@echo "Cleaning build artifacts..."
	rm -rf dist/ node_modules/ coverage/
	@echo "Clean complete"

lint:
	@echo "Running linter..."
	npm run lint

lint-fix:
	@echo "Fixing linting issues..."
	npm run lint:fix

type-check:
	@echo "Running TypeScript type checking..."
	npm run type-check

format:
	@echo "Formatting code with Prettier..."
	npm run format

test: test-unit
	@echo "Running all tests..."
	npm run test

test-unit:
	@echo "Running unit tests..."
	npm run test:unit

test-watch:
	@echo "Running tests in watch mode..."
	npm run test:watch

coverage:
	@echo "Generating coverage report..."
	npm run test:coverage

docs:
	@echo "Generating API documentation..."
	npm run docs

docs-serve:
	@echo "Serving documentation locally..."
	npm run docs:serve

commit:
	@echo "Creating commit with validation..."
	npm run commit

push: type-check lint test
	@echo "Pushing changes..."
	git push
