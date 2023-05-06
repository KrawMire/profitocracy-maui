module.exports = {
  preset: "react-native",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testRegex: ".test.ts$",
  moduleNameMapper: {
    "~/(.*)": "<rootDir>/src/$1",
    "services/(.*)": ["<rootDir>/src/services/$1"],
    "utils/(.*)": ["<rootDir>/src/utils/$1"],
    "domain/(.*)": ["<rootDir>/src/domain/$1"],
    "state/(.*)": ["<rootDir>/src/state/$1"],
    "screens/(.*)": ["<rootDir>/src/ui/screens/$1"],
    "components/(.*)": ["<rootDir>/src/ui/components/$1"],
    "styles/(.*)": ["<rootDir>/src/ui/styles/$1"],
    "operations/(.*)": ["<rootDir>/src/operations/$1"],
  },
};
