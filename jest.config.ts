export default {
	preset: "ts-jest",
	testEnvironment: "jest-environment-jsdom",
	setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
	moduleNameMapper: {
		"\\.(css|less)$": "identity-obj-proxy",
		"\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js",
	},
	transform: {
		"\\.(css|less)$": "jest-transform-css",
	},
	moduleDirectories: ["node_modules", "src"],
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
	testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
	testPathIgnorePatterns: ["/node_modules/", "/dist/"],
	coverageDirectory: "coverage",
};
