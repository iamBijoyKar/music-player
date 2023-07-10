

import path from "node:path"
import * as fs from "node:fs"


export function getFiles(dir: string, files_: string[] = []):object[] {
    const files = fs.readdirSync(dir)
    const result: object[] =[]
    for (const file of files) {
        for(const type_ of files_){
            if(file.endsWith(type_)) {
                const baseName = path.basename(file)
                const songName = baseName.replace('.mp3','')
                const filePath = path.join(dir, file)
                result.push({baseName:baseName,songName:songName,filePath:filePath})
            }
        }
    }
    // console.log(result)
    return result
}