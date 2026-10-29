import fs from "node:fs";
import path from "node:path";

/**
 * Checks for a file inside /public at render time. Used to show a graceful
 * placeholder until the profile photo or resume PDF is added.
 */
export function publicFileExists(relativePath: string): boolean {
  try {
    return fs.existsSync(path.join(process.cwd(), "public", relativePath));
  } catch {
    return false;
  }
}
