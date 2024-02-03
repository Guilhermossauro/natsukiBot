const { config, createAudioFromText } = require('tiktok-tts');
exports.tiktoktts = async function tiktoktts(client, message) {
    const { id, from, body, chat, caption,sender} = message;
    let { pushname, verifiedName } = sender;
    pushname = pushname || verifiedName;
    const commands = caption || body || "";
    const menuu=  `    Menu do TTS TIKTOK
    ══════════════════
    Lista com os codigos disponiveis
    !tiktoktts lista
    
    Para gerar uma frase com codigo aleatorio
    !tiktoktts rc (sua frase) 

    Para gerar uma frase com  uma lingua de sua escolha e locutor aleatorio
    !tiktoktts rl (lingua escolhida) (sua frase) 

    para gerar uma frase usando um codigo pré definido 
    !tiktoktts ra (codigo do locutor) (sua frase)
    `
    config(`9adb76618027e0202d030596c3a8254a`)
    const args = commands.split(" ");
    const helpMode = args[1];
    if (args.length === 1) return client.reply(from, 'Foi mau, mas assim eu não consigo... preciso saber de uma frase também!', id);
    let string = commands.split(' ').slice(2).join(' ');
    if (string.length >= 200) {
        return client.reply(from, `MIZERICORDIA  BICHO q treco grande, quer me bugar??`, id);
    }
    const voices = [
        { language: "english", speaker: "Game On", code: "en_male_jomboy" },
        { language: "english", speaker: "Jessie", code: "en_us_002" },
        { language: "english", speaker: "Warm", code: "es_mx_002" },
        { language: "english", speaker: "Wacky", code: "en_male_funny" },
        { language: "english", speaker: "Scream", code: "en_us_ghostface" },
        { language: "english", speaker: "Empathetic", code: "en_female_samc" },
        { language: "english", speaker: "Serious", code: "en_male_cody" },
        { language: "english", speaker: "Beauty Guru", code: "en_female_makeup" },
        { language: "english", speaker: "Bestie", code: "en_female_richgirl" },
        { language: "english", speaker: "Trickster", code: "en_male_grinch" },
        { language: "english", speaker: "Joey", code: "en_us_006" },
        { language: "english", speaker: "Story Teller", code: "en_male_narration" },
        { language: "english", speaker: "Mr. GoodGuy", code: "en_male_deadpool" },
        { language: "english", speaker: "Narrator", code: "en_uk_001" },
        { language: "english", speaker: "Male English UK", code: "en_uk_003" },
        { language: "english", speaker: "Metro", code: "en_au_001" },
        { language: "english", speaker: "Alfred", code: "en_male_jarvis" },
        { language: "english", speaker: "ashmagic", code: "en_male_ashmagic" },
        { language: "english", speaker: "olantekkers", code: "en_male_olantekkers" },
        { language: "english", speaker: "Lord Cringe", code: "en_male_ukneighbor" },
        { language: "english", speaker: "Mr. Meticulous", code: "en_male_ukbutler" },
        { language: "english", speaker: "Debutante", code: "en_female_shenna" },
        { language: "english", speaker: "Varsity", code: "en_female_pansino" },
        { language: "english", speaker: "Marty", code: "en_male_trevor" },
        { language: "english", speaker: "Pop Lullaby", code: "en_female_f08_twinkle" },
        { language: "english", speaker: "Classic Electric", code: "en_male_m03_classical" },
        { language: "english", speaker: "Bae", code: "en_female_betty" },
        { language: "english", speaker: "Cupid", code: "en_male_cupid" },
        { language: "english", speaker: "Granny", code: "en_female_grandma" },
        { language: "english", speaker: "Cozy", code: "en_male_m2_xhxs_m03_christmas" },
        { language: "english", speaker: "Author", code: "en_male_santa_narration" },
        { language: "english", speaker: "Caroler", code: "en_male_sing_deep_jingle" },
        { language: "english", speaker: "Santa", code: "en_male_santa_effect" },
        { language: "english", speaker: "NYE 2023", code: "en_female_ht_f08_newyear" },
        { language: "english", speaker: "Magician", code: "en_male_wizard" },
        { language: "english", speaker: "Opera", code: "en_female_ht_f08_halloween" },
        { language: "english", speaker: "Euphoric", code: "en_female_ht_f08_glorious" },
        { language: "english", speaker: "Quirky Time", code: "en_male_m2_xhxs_m03_silly" },
        { language: "english", speaker: "Peaceful", code: "en_female_emotional" },
        { language: "english", speaker: "Toon Beat", code: "en_male_m03_sunshine_soon" },
        { language: "english", speaker: "Open Mic", code: "en_female_f08_warmy_breeze" },
        { language: "english", speaker: "Jingle", code: "en_male_m03_lobby" },
        { language: "english", speaker: "Thanksgiving", code: "en_male_sing_funny_thanksgiving" },
        { language: "english", speaker: "Cottagecore", code: "en_female_f08_salut_damour" },
        { language: "english", speaker: "Professor", code: "en_us_007" },
        { language: "english", speaker: "Scientist", code: "en_us_009" },
        { language: "english", speaker: "Confidence", code: "en_us_010" },
        { language: "english", speaker: "Smooth", code: "en_au_002" },
        { language: "english", speaker: "Disney Ghost Face", code: "en_us_ghostface" },
        { language: "english", speaker: "Chewbacca", code: "en_us_chewbacca" },
        { language: "english", speaker: "C3PO", code: "en_us_c3po" },
        { language: "english", speaker: "Stitch", code: "en_us_stitch" },
        { language: "english", speaker: "Stormtrooper", code: "en_us_stormtrooper" },
        { language: "english", speaker: "Rocket", code: "en_us_rocket" },
        { language: "english", speaker: "Madame Leota", code: "en_female_madam_leota" },
        { language: "english", speaker: "Ghost Host", code: "en_male_ghosthost" },
        { language: "english", speaker: "Pirate", code: "en_male_pirate" },
        { language: "french", speaker: "French - Male 1", code: "fr_001" },
        { language: "french", speaker: "French - Male 2", code: "fr_002" },
        { language: "spanish", speaker: "Spanish (Spain) - Male", code: "es_002" },
        { language: "spanish", speaker: "Spanish MX - Male", code: "es_mx_002" },
        { language: "portuguese", speaker: "Portuguese BR - Female 1", code: "br_001" },
        { language: "portuguese", speaker: "Portuguese BR - Female 2", code: "br_003" },
        { language: "portuguese", speaker: "Portuguese BR - Female 3", code: "br_004" },
        { language: "portuguese", speaker: "Portuguese BR - Male", code: "br_005" },
        { language: "portuguese", speaker: "Ludmilla", code: "bp_female_ludmilla" },
        { language: "portuguese", speaker: "Lhays Macedo", code: "pt_female_lhays" },
        { language: "portuguese", speaker: "Laizza", code: "pt_female_laizza" },
        { language: "other", speaker: "Alto", code: "en_female_f08_salut_damour" },
        { language: "other", speaker: "Tenor", code: "en_male_m03_lobby" },
        { language: "other", speaker: "Sunshine Soon", code: "en_male_m03_sunshine_soon" },
        { language: "other", speaker: "Warmy Breeze", code: "en_female_f08_warmy_breeze" },
        { language: "other", speaker: "Glorious", code: "en_female_ht_f08_glorious" },
        { language: "other", speaker: "It Goes Up", code: "en_male_sing_funny_it_goes_up" },
        { language: "other", speaker: "Chipmunk", code: "en_male_m2_xhxs_m03_silly" },
        { language: "other", speaker: "Dramatic", code: "en_female_ht_f08_wonderful_world" }
    ];       
let mms = ``
let audiofinal= ``
let dest= (`./media/audiofrom_${from}_onChat_${chat}.mp3`)
const selections= args[2]

    switch (helpMode) {
        case 'lista':
            const formattedList = voices.map(voice => `|| ${voice.language.padEnd(27)} || ${voice.speaker.padEnd(28)} || ${voice.code}`);

            // Criando a mensagem formatada
            const message = `*||          Lingua            ||           Locutor          ||    Código*\n${'='.repeat(52)}\n${formattedList.join('\n')}`;
            
            // Enviando a mensagem formatada
            await client.sendText(from, message);
                
                break;
        case `rl`:
             mms = Array.from(new Set(voices.map(voice => voice.language)));
             code =    mms[parseInt(Math.random() * mms.length)];
             if (!mms.includes(selections)){
                return client.reply(from, `Oshe, parece que a linguagem informado nao está na lista\n Tente o comando !tiktoktts lista para poder ver`, id);
                }
            
             audiofinal = await createAudioFromText(string, `./media/audiofrom_${from}_onChat_${chat}`, `${mms[code]}`);
             dest = await path.resolve(__dirname, `../media/audiofrom_${from}_onChat_${chat}.mp3`);
             await client.sendPTT(from, dest, `audiofrom_${from}_onChat_${chat}`, 'AAAAAAAAAUHHH', id);
                break
                case `rc`:
                    mms = Array.from(new Set(voices.map(voice => voice.code)));
                    console.log(mms)

                    code =   mms[parseInt(Math.random() * mms.length)];
                    console.log(mms[code])
                    audiofinal = await createAudioFromText(string, `./media/audiofrom_${from}_onChat_${chat}`, `${mms[code]}`);
                    dest = await path.resolve(__dirname, `../media/audiofrom_${from}_onChat_${chat}.mp3`);
                    await client.sendPTT(from, dest, `audiofrom_${from}_onChat_${chat}`, 'AAAAAAAAAUHHH', id);
                    break

                    case `ra`:
                        mms = Array.from(new Set(voices.map(voice => voice.code)));
                        if (!mms.includes(selections)){
                        return client.reply(from, `Oshe, parece que o codigo informado nao está na lista\n Tente o comando !tiktoktts lista para poder ver`, id);
                        }
                        audiofinal = await createAudioFromText(string, `./media/audiofrom_${from}_onChat_${chat}`, `${selections}`);
                        dest = await path.resolve(__dirname, `../media/audiofrom_${from}_onChat_${chat}.mp3`);
                        await client.sendPTT(from, dest, `audiofrom_${from}_onChat_${chat}`, 'AAAAAAAAAUHHH', id);
                        break

                       
                       
                default:
                    help =`${menuu}`
                    break;
        
    }


}