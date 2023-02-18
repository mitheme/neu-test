import { build } from 'vite'
import { exec } from 'child_process'
import { emptyDir ,ensureDir,copy} from "fs-extra";
import { readFileSync ,writeFileSync} from "fs";
import { join } from "path";
import { type } from "os";

await build({ configFile: 'vite.config.ts' })

const basePath=process.cwd()
const configPath=join(basePath,'neutralino.config.json')
const config= JSON.parse(readFileSync(configPath,'utf8'))
const binaryName=config.cli.binaryName


exec('neu build',async(err,stdout)=>{
    console.log(stdout)
    if (type()==="Darwin") {
        createMacApp()
    }
})


async function createMacApp() {
    const appPath=join(basePath,'dist',`${binaryName}.app`)
    await emptyDir(appPath)
    await ensureDir(join(appPath,'MacOS')) 
    await copy(join(basePath,'dist',binaryName,`${binaryName}-mac_x64`),join(appPath,'MacOS',binaryName))
    await copy(join(basePath,'dist',binaryName,'resources.neu'),join(appPath,'MacOS','resources.neu'))

    const info=`<?xml version="1.0" encoding="UTF-8"?>
    <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
    <plist version="1.0">
    <dict>
        <key>CFBundleDisplayName</key>
        <string>${binaryName}</string>
        <key>CFBundleIconFile</key>
        <string>icon.icns</string>
        <key>CFBundleIdentifier</key>
	    <string>${config.applicationId}</string>
        <key>CFBundleInfoDictionaryVersion</key>
	    <string>${config.version}</string>
        <key>CFBundleName</key>
	    <string>${binaryName}</string>
        <key>CFBundlePackageType</key>
	    <string>APPL</string>
    </dict>
    </plist>
    `
    writeFileSync(join(basePath,'dist',`${binaryName}.app/Info.plist`),info)
}