import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, isFirebaseEnabled } from "@/lib/firebase";

/**
 * Upload a contributed file to Firebase Storage under resources/{collegeId}/...
 * Returns the public download URL. In preview mode (no Firebase) it returns a
 * placeholder so the contribute flow still works end to end.
 */
export async function uploadResourceFile(
  file: File,
  collegeId: string | null
): Promise<string> {
  if (!isFirebaseEnabled || !storage) {
    // Preview mode: no real storage. Return a placeholder marker.
    return `mock://uploads/${encodeURIComponent(file.name)}`;
  }
  const path = `resources/${collegeId ?? "national"}/${Date.now()}-${file.name}`;
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
}
