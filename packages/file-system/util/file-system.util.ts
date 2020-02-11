import * as fs from 'fs';

export default class FileSystemUtil {
    public static async isDirectory(path: string): Promise<boolean> {
        try {
            return (await fs.promises.lstat(path)).isDirectory();
        } catch (err) {
            return false;
        }
    }
}
