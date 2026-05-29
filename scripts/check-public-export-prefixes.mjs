import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const packageRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const packageJsonPath = path.join(packageRoot, "package.json");
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
const configPath = ts.findConfigFile(packageRoot, ts.sys.fileExists, "tsconfig.json");
if (!configPath) throw new Error(`Missing tsconfig.json under ${packageRoot}`);
const configFile = ts.readConfigFile(configPath, ts.sys.readFile);
if (configFile.error) throw new Error(ts.flattenDiagnosticMessageText(configFile.error.messageText, "\n"));
const parsedConfig = ts.parseJsonConfigFileContent(configFile.config, ts.sys, packageRoot);
const program = ts.createProgram(parsedConfig.fileNames, parsedConfig.options);
const checker = program.getTypeChecker();
const violations = [];

function sourcePathForExport(exportDefinition) {
  const importPath = typeof exportDefinition === "string" ? exportDefinition : exportDefinition?.import;
  if (typeof importPath !== "string") return null;
  const publicDistPrefix = "./dist/public/";
  if (!importPath.startsWith(publicDistPrefix) || !importPath.endsWith(".js")) return null;
  return path.join(packageRoot, "src/public", importPath.slice(publicDistPrefix.length, -3) + ".ts");
}

for (const [subpath, exportDefinition] of Object.entries(packageJson.exports ?? {})) {
  const sourcePath = sourcePathForExport(exportDefinition);
  if (!sourcePath) {
    violations.push({ sourcePath: packageJsonPath, exportName: subpath, reason: "does not resolve to src/public" });
    continue;
  }
  const sourceFile = program.getSourceFile(sourcePath);
  if (!sourceFile) {
    violations.push({ sourcePath, exportName: subpath, reason: "source file not found in TypeScript program" });
    continue;
  }
  const moduleSymbol = checker.getSymbolAtLocation(sourceFile);
  if (!moduleSymbol) continue;
  for (const exportedSymbol of checker.getExportsOfModule(moduleSymbol)) {
    const exportName = exportedSymbol.getName();
    if (exportName !== "default" && !/^ChatComms_/.test(exportName)) {
      violations.push({ sourcePath, exportName, reason: "missing ChatComms_ prefix" });
    }
  }
}

if (violations.length > 0) {
  console.error("Public export prefix violations:");
  for (const violation of violations) {
    console.error(`${path.resolve(violation.sourcePath)}: ${violation.exportName} (${violation.reason})`);
  }
  process.exitCode = 1;
} else {
  console.log("All public named exports are ChatComms_-prefixed.");
}
