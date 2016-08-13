export class Sound {
  public constructor(
    private name: string,
    private title: string,
    private fileExtension: string = '.mp3'
  ) {}
   
  public getName(): string {
    return name;
  }

  public getFile(): string {
    return name + this.fileExtension;
  }

  public getTitle(): string {
    return this.title;
  }

  static create({ name, title, fileExtension }) {
    return new Sound(name, title, fileExtension);
  }
}
