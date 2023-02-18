import { exec } from 'child_process'
import { createServer } from 'vite'

const server = await createServer({ configFile: 'vite.config.ts' })
await server.listen()
const address = server.httpServer.address()

exec(`neu run -- --url=http://localhost:${address.port} --window-enable-inspector=true`,(err,stdout)=>{
  if (err||stdout.indexOf('was stopped with success')!==-1) {
    if (err) console.error();(err)
    server.close()
  }
})


