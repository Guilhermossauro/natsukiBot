const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

exports.play = async function(client, message) {
  const { id, from, body,caption } = message;
  const outputPath = path.resolve(__dirname, '../media/yt');
  console.log(body)
  const commands = caption || body || "";
  const args = commands.split(" ");
  const audioLink = args[1]

  // Check if the audio link is a valid URL
  if (!/^https?:\/\/.*/.test(audioLink)) {
    return client.reply(from, 'Please provide a valid audio link 1.', id);
  }

  try {
    const youtubeDlPath = process.env.yt_dlPath; // Path to the youtube-dl binary

    // Spawn the youtube-dl process to download the audio
    const youtubeDlProcess = spawn(youtubeDlPath, [
      '-x', 
      ' --quiet',
      '--audio-format', 'mp3',
      '--audio-quality', '192k', // set audio quality to 192kbps
      '-q', // hide download progress and status
      '-o', `${outputPath}.%(ext)s`,
      audioLink
    ]);
    youtubeDlProcess.on('error', (err) => {
      console.error(err);
    });

    // Listen for the stdout and stderr events to capture any output from youtube-dl
    youtubeDlProcess.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });
    youtubeDlProcess.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    // Listen for the close event to know when the youtube-dl process has finished
    youtubeDlProcess.on('close', async (code) => {
      console.log(`child process exited with code ${code}`);

      // Check if the download was successful
      if (code === 0) {
        // Send the downloaded audio file to the user
        const filePath = `${outputPath}/${id}.mp3`;
        console.log(`file path ${filePath}`)
        const fileStats = await fs.promises.stat(filePath);
        console.log(`file path ${fileStats}`)
        await client.sendFile(from, filePath,id);

        // Delete the downloaded file after it has been sent
        await fs.promises.unlink(filePath);
      } else {
        await client.reply(from, 'Failed to download audio.', id);
      }
    });
  } catch (error) {
    await client.reply(from, `An error occurred: ${error.message}`, id);
  }
};
