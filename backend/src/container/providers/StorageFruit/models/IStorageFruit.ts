export default interface IStorageFruit {
    saveFile(file: string): Promise<string>;
    deleteFile(file: string): Promise<void>;
}
