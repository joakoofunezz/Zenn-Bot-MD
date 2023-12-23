import ytdl from 'youtubedl-core'
import ffmpeg from 'fluent-ffmpeg'
import fs from 'fs'
import { randomBytes } from 'crypto'
import axios from 'axios'

const ytIdRegex = /(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\?(?:\S*?&?v\=))|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/

const fetchBuffer = async (url, options) => { try { options ? options : {}; const res = await axios({ method: "GET", url, headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.70 Safari/537.36", 'DNT': 1, 'Upgrade-Insecure-Request': 1 }, ...options, responseType: 'arraybuffer' }); return res.data } catch (err) { return err } }

const isYTUrl = (url) => { return ytIdRegex.test(url) }
const getVideoID = (url) => { if (!isYTUrl(url)) throw new Error('is not YouTube URL'); return ytIdRegex.exec(url)[1] }

const mp4 = async (query) => {
    try {
        if (!query) throw new Error('Video ID or YouTube Url is required')
        const videoId = isYTUrl(query) ? getVideoID(query) : query
        const videoInfo = await ytdl.getInfo('https://www.youtube.com/watch?v=' + videoId, { lang: 'id' })
        
        const format = ytdl.chooseFormat(videoInfo.formats, { format: '136', filter: 'videoandaudio' })
        return {
            title: videoInfo.videoDetails.title,
            thumb: videoInfo.videoDetails.thumbnails.slice(-1)[0],
            date: videoInfo.videoDetails.publishDate,
            duration: videoInfo.videoDetails.lengthSeconds,
            channel: videoInfo.videoDetails.ownerChannelName,
            quality: format.qualityLabel,
            contentLength: format.contentLength,
            description: videoInfo.videoDetails.description,
            videoUrl: format.url
        }
    } catch (error) { throw error }
}


const mp3 = async (url) => {
    try {
        if (!url) throw new Error('Video ID or YouTube Url is required')
        url = isYTUrl(url) ? 'https://www.youtube.com/watch?v=' + getVideoID(url) : url
        const { videoDetails } = await ytdl.getInfo(url, { lang: 'id' });
        let stream = ytdl(url, { filter: 'audioonly', quality: 140 });
        let songPath = `./tmp/${randomBytes(3).toString('hex')}.mp3`
        const file = await new Promise((resolve) => { ffmpeg(stream).audioFrequency(44100).audioChannels(2).audioBitrate(128).audioCodec('libmp3lame').audioQuality(5).toFormat('mp3').save(songPath).on('end', () => { resolve(songPath) }) })

        return {
            meta: {
                title: videoDetails.title,
                channel: videoDetails.author.name,
                seconds: videoDetails.lengthSeconds,
                image: videoDetails.thumbnails.slice(-1)[0].url
            },
            path: file,
            size: fs.statSync(songPath).size
        }
    } catch (error) { throw error }
}

export default { fetchBuffer, mp3, mp4 }
