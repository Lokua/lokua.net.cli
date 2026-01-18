import { readdir, mkdir } from 'fs/promises'
import path from 'path'
import colors from 'chalk'
import prepSample from './prepSample.mjs'

export default async function prepSamples(inputDir, outputDir) {
  try {
    const absoluteInputDir = path.resolve(inputDir)
    const absoluteOutputDir = path.resolve(outputDir)
    const wavFiles = await getWavFiles(absoluteInputDir)

    if (wavFiles.length === 0) {
      console.log(colors.yellow('No WAV files found in input directory'))
      return
    }

    await ensureOutputDir(absoluteOutputDir)

    console.log(
      colors.cyan(`Found ${wavFiles.length} WAV file(s) to process\n`),
    )

    let processed = 0
    let failed = 0

    for (const file of wavFiles) {
      const inputPath = path.join(absoluteInputDir, file)
      const outputPath = path.join(absoluteOutputDir, file)

      try {
        console.log(
          colors.dim(`[${processed + failed + 1}/${wavFiles.length}]`),
        )
        await prepSample(inputPath, outputPath)
        processed++
      } catch (error) {
        console.error(
          colors.red(`✗ Failed to process ${file}: ${error.message}`),
        )
        failed++
      }
    }

    console.log(
      colors.green(`\n✓ Complete: ${processed} processed, ${failed} failed\n`),
    )
  } catch (error) {
    console.error(colors.red(`✗ Error: ${error.message}`))
    process.exit(1)
  }
}

async function getWavFiles(dirPath) {
  try {
    const files = await readdir(dirPath)
    return files.filter((file) => file.toLowerCase().endsWith('.wav'))
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error(`Input directory not found: ${dirPath}`)
    } else if (error.code === 'EACCES') {
      throw new Error(`Cannot read input directory: ${dirPath}`)
    }
    throw error
  }
}

async function ensureOutputDir(dirPath) {
  try {
    await mkdir(dirPath, { recursive: true })
  } catch (error) {
    throw new Error(`Cannot create output directory: ${dirPath}`)
  }
}
