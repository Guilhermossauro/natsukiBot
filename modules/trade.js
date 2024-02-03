const path = require("path");
const fs = require("fs");
require('dotenv').config();
const BASEURL_BOTINFORS = process.env.BASEURL_BOTINFORS;
const { id, from, body, sender, isGroupMsg, chat, caption, isMedia, mimetype, quotedMsg } = message;
if (!isGroupMsg) {
    return client.reply(from, "Este comando só pode ser usado em grupos.", id);


}