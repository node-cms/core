import FileSystem from './file-system';
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
    const fileSystem = new FileSystem();

    // isDirectory
    expect(await fileSystem.isDirectory(pathToTestDir1)).toBe(false);
    expect(fileSystem.isDirectorySync(pathToTestDir1)).toBe(false);

    // ensureDirExists
    await fileSystem.ensureDirExists(pathToTestDir1);
    fileSystem.ensureDirExistsSync(pathToTestDir2);

    // isDirectory
    expect(await fileSystem.isDirectory(pathToTestDir1)).toBe(true);
    expect(fileSystem.isDirectorySync(pathToTestDir2)).toBe(true);

    // ensureFileExists
    await fileSystem.ensureFileExists(pathToTestFile2);

    // symlink file
    await fileSystem.symlink(path.join('../', testDir2, testFile2), pathToTestFile1);

    // isSymlink
    expect(await fileSystem.isSymlink(pathToTestDir1)).toBe(false);
    expect(fileSystem.isSymlinkSync(pathToTestDir1)).toBe(false);
    expect(await fileSystem.isSymlink(pathToTestFile1)).toBe(true);
    expect(fileSystem.isSymlinkSync(pathToTestFile1)).toBe(true);
    expect(await fileSystem.isSymlink(pathToTestFile2)).toBe(false);
    expect(fileSystem.isSymlinkSync(pathToTestFile2)).toBe(false);

    // remove
    await fileSystem.remove(pathToTestDir1);
    fileSystem.removeSync(pathToTestDir2);
    fileSystem.removeSync(pathToTestDir2);

    // ensureDirExists
    await fileSystem.ensureDirExists(pathToTestDir2);

    // symlink dir
    await fileSystem.symlink(pathToTestDir2, path.join(pathToTest, testDir1));

    // isSymlink to dir
    expect(await fileSystem.isSymlinkToDirectory(pathToTestDir2)).toBe(false);
    expect(await fileSystem.isSymlinkToDirectory(path.join(pathToTest, testDir1))).toBe(true);
    expect(await fileSystem.isSymlinkToDirectory(pathToTestFile1)).toBe(false);

    // remove pathToVar
    await fileSystem.remove(pathToTest);

    // ensureDirExists
    await fileSystem.ensureDirExists(pathToTestDir1);
    await fileSystem.ensureDirExists(pathToTestDir2);

    // ensureFileExistsSync
    fileSystem.ensureFileExistsSync(pathToTestFile1);

    // isFile
    expect(await fileSystem.isFile(pathToTestFile1)).toBe(true);
    expect(fileSystem.isFileSync(pathToTestFile1)).toBe(true);

    // remove
    await fileSystem.remove(pathToTestFile1);

    // isFile
    expect(await fileSystem.isFile(pathToTestFile1)).toBe(false);
    expect(fileSystem.isFileSync(pathToTestFile1)).toBe(false);

    // ensureFileExists
    await fileSystem.ensureFileExists(pathToTestFile1);

    // appendFile
    await fileSystem.appendFile(pathToTestFile1, testString);

    // readFile
    expect(await fileSystem.readFile(pathToTestFile1)).toBe(testString);
    expect(fileSystem.readFileSync(pathToTestFile1)).toBe(testString);

    // rename
    await fileSystem.rename(pathToTestFile1, pathToTestFile2);

    // isFile
    expect(await fileSystem.isFile(pathToTestFile1)).toBe(false);
    expect(fileSystem.isFileSync(pathToTestFile1)).toBe(false);
    expect(await fileSystem.isFile(pathToTestFile2)).toBe(true);
    expect(fileSystem.isFileSync(pathToTestFile2)).toBe(true);

    // readDir
    expect((await fileSystem.readDirectory(pathToTestDir1)).length).toBe(0);
    expect((await fileSystem.readDirectory(pathToTestDir2)).length).toBe(1);

    // remove pathToVar
    await fileSystem.remove(pathToTest);
    await fileSystem.remove(pathToTest);

    // isSymlink on not existing dir
    expect(await fileSystem.isSymlink(pathToTest)).toBe(false);
    expect(fileSystem.isSymlinkSync(pathToTest)).toBe(false);
});
