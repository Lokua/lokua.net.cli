import { spawn } from 'child_process'
import { access, constants } from 'fs/promises'
import path from 'path'
import colors from 'chalk'

export default async function prepSample(inputPath, outputPath) {
  try {
    const absoluteInput = await validateInputFile(inputPath)
    const absoluteOutput = path.resolve(outputPath)

    if (!(await checkSoxInstalled())) {
      throw new Error('sox is not installed or not in PATH')
    }

    console.log(colors.cyan(`Processing: ${path.basename(absoluteInput)}`))

    // SoX command: trim silence from start/end and normalize to -1dB
    // prettier-ignore
    const soxArgs = [
      // Input file
      absoluteInput,
      // Set output bit depth to 24-bit
      '-b', '24',
      // Set output sample rate to 48kHz
      '-r', '48000',
      // Output file
      absoluteOutput,
      // Silence effect: remove silence from beginning
      // Remove 1 period of silence from the start
      // Minimum duration: 0.1 seconds
      // Threshold: audio below 0.1% is considered silence
      'silence', '1', '0.1', '0.1%',
      // Reverse the audio so we can trim silence from the end
      'reverse',
      // Silence effect: remove silence from what is now the beginning
      // (originally the end) Remove 1 period of silence Minimum duration: 0.1
      // seconds Threshold: audio below 0.1% is considered silence
      'silence', '1', '0.1', '0.1%',
      // Reverse back to original direction
      'reverse',
      // Normalize effect: peak normalization to -1dB
      'norm', '-1',
    ]

    console.log(colors.dim('  Trimming silence and normalizing...'))
    await executeSox(soxArgs)

    console.log(colors.green(`✓ Sample prepared: ${absoluteOutput}`))
  } catch (error) {
    console.error(colors.red(`✗ Error: ${error.message}`))
    process.exit(1)
  }
}

let soxChecked = false
let soxAvailable = false

async function checkSoxInstalled() {
  if (soxChecked) {
    return soxAvailable
  }

  return new Promise((resolve) => {
    const sox = spawn('sox', ['--version'])

    sox.on('error', () => {
      soxChecked = true
      soxAvailable = false
      resolve(false)
    })

    sox.on('close', (code) => {
      soxChecked = true
      soxAvailable = code === 0
      resolve(code === 0)
    })
  })
}

async function validateInputFile(filePath) {
  const absolutePath = path.resolve(filePath)

  try {
    await access(absolutePath, constants.R_OK)
    return absolutePath
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error(`Input file not found: ${filePath}`)
    } else if (error.code === 'EACCES') {
      throw new Error(`Cannot read input file: ${filePath}`)
    }
    throw error
  }
}

function executeSox(args) {
  return new Promise((resolve, reject) => {
    const sox = spawn('sox', args)
    let stderrData = ''

    sox.stderr.on('data', (data) => {
      stderrData += data.toString()
    })

    sox.on('error', (error) => {
      reject(new Error(`Failed to execute sox: ${error.message}`))
    })

    sox.on('close', (code) => {
      if (code === 0) {
        resolve()
      } else {
        reject(new Error(`SoX error: ${stderrData || 'Unknown error'}`))
      }
    })
  })
}
