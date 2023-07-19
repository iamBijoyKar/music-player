import path from "node:path"
import * as fs from "node:fs"

export function getFiles(dir: string, files_: string[] = []): object[] {
  const files = fs.readdirSync(dir)
  const result: object[] = []
  for (const file of files) {
    for (const type_ of files_) {
      if (file.endsWith(type_)) {
        const baseName = path.basename(file)
        const songName = baseName.replace(".mp3", "")
        const filePath = path.join(dir, file)
        result.push({
          songName: songName,
          baseName: baseName,
          filePath: filePath,
          songArtist: undefined,
          songAlbum: undefined,
          songYear: undefined,
          songGenre: undefined,
          songLyrics: undefined,
          songLink: undefined,
          songImage: undefined,
          songDuration: 0,
          file: {
            filePath: filePath,
            fileName: baseName,
            fileExtension: type_,
            fileSize: fs.statSync(filePath).size,
          },
        })
      }
    }
  }
  // console.log(result)
  return result
}
