.PHONY: help install build dev clean serve lint format

help:
	@echo "Brick Breaker Web Game - Available Commands"
	@echo "============================================"
	@echo "make install    - Install dependencies"
	@echo "make build      - Build the project"
	@echo "make dev        - Start development server"
	@echo "make serve      - Serve the built project"
	@echo "make clean      - Clean build artifacts"
	@echo "make lint       - Run linter"
	@echo "make format     - Format code"

install:
	@echo "Installing dependencies..."
	npm install

build:
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
	rm -rf dist/ node_modules/
	@echo "Clean complete"

lint:
	@echo "Running linter..."
	npm run lint

format:
	@echo "Formatting code..."
	npm run format
