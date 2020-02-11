import FileSystemUtil from '@node-cms/file-system/util/file-system.util';

export default class ApplicationService {
    public static async start(): Promise<void> {
        console.log('start dev');

        await FileSystemUtil.isDirectory(__dirname);
    }
}
