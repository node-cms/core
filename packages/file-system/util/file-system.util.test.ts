import FileSystemUtil from './file-system.util';
import path from 'path';

const pathToTest = path.join(process.cwd(), 'var/', 'test/');
const testDir1 = 'file-system-1';
const testDir2 = 'file-system-2';
const pathToTestDir1 = path.join(pathToTest, testDir1, '/');
const pathToTestDir2 = path.join(pathToTest, testDir2, '/');
const testFile1 = 'test-file-1.txt';
const testFile2 = 'test-file-2.txt';
const pathToTestFile1 = path.join(pathToTestDir1, testFile1);
const pathToTestFile2 = path.join(pathToTestDir2, testFile2);
const testString = 'test-string';

test('file-system', async () => {
    // isDirectory
    expect(await FileSystemUtil.isDirectory(pathToTestDir1)).toBe(false);
});
