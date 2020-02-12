import fs from 'fs';
import nodePath from 'path';

export default class FileSystem {
    public async symlink(target: string, path: string) {
        return fs.promises.symlink(target, path);
    }

    public async rename(oldPath: string, newPath: string): Promise<void> {
        return fs.promises.rename(oldPath, newPath);
    }

    public async remove(path: string): Promise<void> {
        if ((await this.isFile(path)) || (await this.isSymlink(path))) {
            await fs.promises.unlink(path);
        } else if (await this.isDirectory(path)) {
            for (const file of await fs.promises.readdir(path)) {
                await this.remove(nodePath.join(path, file));
            }

            await fs.promises.rmdir(path);
        }
    }

    public removeSync(path: string): void {
        if (this.isFileSync(path) || this.isSymlinkSync(path)) {
            fs.unlinkSync(path);
        } else if (this.isDirectorySync(path)) {
            for (const file of fs.readdirSync(path)) {
                this.removeSync(nodePath.join(path, file));
            }

            fs.rmdirSync(path);
        }
    }

    public async isFile(path: string): Promise<boolean> {
        try {
            return (await fs.promises.lstat(path)).isFile();
        } catch (err) {
            return false;
        }
    }

    public isFileSync(path: string): boolean {
        try {
            return fs.lstatSync(path).isFile();
        } catch (err) {
            return false;
        }
    }

    public async isSymlink(path: string): Promise<boolean> {
        try {
            return (await fs.promises.lstat(path)).isSymbolicLink();
        } catch (err) {
            return false;
        }
    }

    public isSymlinkSync(path: string): boolean {
        try {
            return fs.lstatSync(path).isSymbolicLink();
        } catch (err) {
            return false;
        }
    }

    public async isDirectory(path: string): Promise<boolean> {
        try {
            return (await fs.promises.lstat(path)).isDirectory();
        } catch (err) {
            return false;
        }
    }

    public isDirectorySync(path: string): boolean {
        try {
            return fs.lstatSync(path).isDirectory();
        } catch (err) {
            return false;
        }
    }

    public async isSymlinkToDirectory(path: string): Promise<boolean> {
        try {
            return (await fs.promises.stat(path)).isDirectory() && (await this.isSymlink(path));
        } catch (err) {
            return false;
        }
    }

    public async ensureFileExists(path: string): Promise<void> {
        try {
            return await fs.promises.access(path, fs.constants.R_OK);
        } catch (err) {
            await this.ensureDirExists(nodePath.dirname(path));
        }

        return await fs.promises.appendFile(path, '');
    }

    public ensureFileExistsSync(path: string): void {
        try {
            return fs.accessSync(path, fs.constants.R_OK);
        } catch (err) {
            this.ensureDirExistsSync(nodePath.dirname(path));
        }

        return this.appendFileSync(path, '');
    }

    public async ensureDirExists(path: string): Promise<void> {
        return fs.promises.mkdir(path, { recursive: true });
    }

    public ensureDirExistsSync(path: string): void {
        return fs.mkdirSync(path, { recursive: true });
    }

    public async appendFile(path: string, data: any): Promise<void> {
        return fs.promises.appendFile(path, data);
    }

    public appendFileSync(path: string, data: any): void {
        return fs.appendFileSync(path, data);
    }

    public async readFile(path: string): Promise<string> {
        return await fs.promises.readFile(path, 'utf8');
    }

    public readFileSync(path: string): string {
        return fs.readFileSync(path, 'utf8');
    }

    public async readDirectory(path: string): Promise<string[]> {
        return fs.promises.readdir(path);
    }
}
