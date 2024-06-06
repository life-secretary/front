import { fetchData } from "@/api/api";

interface AppVersionInfo {
  version: string;
  showAlert: boolean;
  critical: boolean;
  osType: string;
}

export function compareVersions(version1: string, version2: string): number {
    const parseVersion = (version: string): number[] => version.split('.').map(Number);
  
    const [major1, minor1, patch1] = parseVersion(version1);
    const [major2, minor2, patch2] = parseVersion(version2);
  
    if (major1 !== major2) {
      return major1 > major2 ? 1 : -1;
    }
    if (minor1 !== minor2) {
      return minor1 > minor2 ? 1 : -1;
    }
    if (patch1 !== patch2) {
      return patch1 > patch2 ? 1 : -1;
    }
    return 0;
  }

export async function getLatestVersion() {
    return fetchData('/app-version/latest', null)
}

export default AppVersionInfo