import FileSystemUtil from '@node-cms/file-system/util/file-system.util';

export default class ApplicationService {
    public static async start(): Promise<void> {
        await FileSystemUtil.isDirectory(__dirname);
    }
}
