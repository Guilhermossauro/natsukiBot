const axios = require("axios");
require('dotenv').config();
const fs = require('fs');
const action2 = require("@sasmeee/igdl");
const download = require('image-downloader');
const BASEURL_BOTINFORS = process.env.BASEURL_BOTINFORS;
const BASE_URL_game = process.env.BASE_URL_game;
const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const ffmpeg = require('fluent-ffmpeg');

const { Configuration, OpenAIApi } = require("openai");
const configurationOpenAi = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const newopenai = new OpenAIApi(configurationOpenAi);

exports.alterAuthorization = async function alterAuthorization(value, id) {
    return axios.patch(`${BASEURL_BOTINFORS}/authorizations/${id}`, {
        authorization: value,
    }).then((res) => {
        return {
            status: "success"
        }
    }
    ).catch((err) => {
        console.log(`error: ${err}`);
        return {
            status: "error",
            message: {
                code: err.response?.status || err,
                text: err.response?.statusText || ''
            }
        }
    });
}
exports.alterWelcome = async function alterWelcome(id,welcome) {
    return axios.patch(`${BASEURL_BOTINFORS}/authorizations/${id}`, {
        welcomeFrase: welcome,
        isWelcome: true
    }).then((res) => {
        return {
            status: "success"
        }
    }
    ).catch((err) => {
        console.log(`error: ${err}`);
        return {
            status: "error",
            message: {
                code: err.response?.status || err,
                text: err.response?.statusText || ''
            }
        }
    });
}
exports.setWelcome = async function setWelcome(id,boolean) {
    return axios.patch(`${BASEURL_BOTINFORS}/authorizations/${id}`, {
        isWelcome: boolean
    }).then((res) => {
        return {
            status: "success"
        }
    }
    ).catch((err) => {
        console.log(`error: ${err}`);
        return {
            status: "error",
            message: {
                code: err.response?.status || err,
                text: err.response?.statusText || ''
            }
        }
    });
}

exports.checkAuthorization = async function checkAuthorization(id) {
    return axios.get(`${BASEURL_BOTINFORS}/authorizations/${id}`).then((res) => {
        const { authorization, expirationDate,autorized,antlink,isWelcome } = res.data;
        return {
          status: "success",
          authorization: authorization,
          expirationDate: expirationDate,
          autorized: autorized,
          isWelcome: isWelcome,
          antlink: antlink

        }
    }
    ).catch((err) => {
        console.log(`error: ${err}`);
        return {
            status: "error",
            message: {
                code: err.response?.status || err,
                text: err.response?.statusText || ''
            }
        }
    });
}

exports.createAuthorization = async function createAuthorization(value, id, dia) {
    return axios.post(`${BASEURL_BOTINFORS}/authorizations/`, {
      id: id,
      vencimentoVIP: dia,
      authorization: value,
      isFromVip: value,
      antlink: false,
      isWelcome: false,
      welcomeFrase: null,
      comandosDesautorizados: [],
    })
      .then((res) => {
        return {
          status: "success",
        };
      })
      .catch((err) => {
        console.log(`error: ${err}`);
        return {
          status: "error",
          message: {
            code: err.response?.status || err,
            text: err.response?.statusText || "",
          },
        };
      });
  };


exports.alterVencimento = async function alterVencimento(id,dia) {
    return axios.patch(`${BASEURL_BOTINFORS}/authorizations/${id}`, {
        vencimentoVIP: dia,
    }).then((res) => {
        return {
            status: "success"
        }
    }
    ).catch((err) => {
        console.log(`error: ${err}`);
        return {
            status: "error",
            message: {
                code: err.response?.status || err,
                text: err.response?.statusText || ''
            }
        }
    });
}
exports.getVip = async function getVip() {
    return axios.get(`${BASEURL_BOTINFORS}/vip`).then((res) => {
        return res.data
    }
    ).catch((err) => {
        console.log(`error: ${err}`);
        return {
            status: "error",
            message: {
                code: err.response?.status || err,
                text: err.response?.statusText || ''
            }
        }
    });
}

exports.getGrupo = async function getGrupo(id) {
    return axios.get(`${BASEURL_BOTINFORS}/authorizations/${id}`).then((res) => {
        return res.data
    }
    ).catch((err) => {
        console.log(`error: ${err}`);
        return {
            status: "error",
            message: {
                code: err.response?.status || err,
                text: err.response?.statusText || ''
            }
        }
    });
}
exports.getGrupoMembros = async function getGrupoMembros(id) {
    return axios.get(`${BASEURL_BOTINFORS}/adicionados/${id}`).then((res) => {
        return res.data
    }
    ).catch((err) => {
        console.log(`error: ${err}`);
        return {
            status: "error",
            message: {
                code: err.response?.status || err,
                text: err.response?.statusText || ''
            }
        }
    });
}



exports.checkVipExpiration = async function checkVipExpiration(groupId) {
    const res = await axios.get(`${BASEURL_BOTINFORS}/authorizations/${groupId}`);
    const data = res.data;
    // Verifique se o objeto data.authorizations existe
    if (data.vencimentoVIP) {
      // Converta a data de vencimento em um número de milissegundos
      const expirationTimestamp = Date.parse(data.vencimentoVIP);
  
      // Verifique se o dia de vencimento já chegou
      const today = new Date();
      const expirationDate = new Date(expirationTimestamp);
      if (expirationDate < today) {
        return true;
      }
    }
    return false;
  }
exports.altercredit = async function altercredit(user,credit) {
    axios.patch(`${BASEURL_BOTINFORS}/vip/${user}`, {
        credito: credit
      }).then(() => {
        return {
            status: "success"
        }
      }
      ).catch(err => {
        console.log(`error: ${err}`);
        return {
            status: "error",
            message: {
                code: err.response?.status || err,
                text: err.response?.statusText || ''
            }
        }
      });
  }
exports.CreateVip = async function CreatetVip(mencioned_user,vencimento) {
    return axios.post(`${BASEURL_BOTINFORS}/vip/`, {
        
        phone: mencioned_user,
        credito: 1,
        id: mencioned_user,
        deck: 0,
        xp: 0,
        token: 0,
        sorteio: false,
        titulo: " ",
        descricao: " ",
        validadeVIP: vencimento,
        lilCoin: 0,
        status: "Jogador",
        cartas: [],
        vipstatus: true
    }).then((res) => {
        return {
            status: "success"
        }
    }
    ).catch((err) => {
        console.log(`error: ${err}`);
        return {
            status: "error",
            message: {
                code: err.response?.status || err,
                text: err.response?.statusText || ''
            }
        }
    });
}

exports.createHistory = async function createHistory(mencioned_user,step) {
    return axios.post(`${BASEURL_BOTINFORS}/clientes/`, {
        
        phone: mencioned_user,
        id: mencioned_user,
        progresso: step,
        xp: 0,
        token: 0,
        sorteio: false,
        lilCoin: 0,
        credito:0,
        cartas: [],
        vipstatus: true
    }).then((res) => {
        return {
            status: "success"
        }
    }
    ).catch((err) => {
        console.log(`error: ${err}`);
        return {
            status: "error",
            message: {
                code: err.response?.status || err,
                text: err.response?.statusText || ''
            }
        }
    });
}

exports.getHistory = async function getHistory() {
    return axios.get(`${BASEURL_BOTINFORS}/clientes`).then((res) => {
        return res.data
    }
    ).catch((err) => {
        console.log(`error: ${err}`);
        return {
            status: "error",
            message: {
                code: err.response?.status || err,
                text: err.response?.statusText || ''
            }
        }
    });
}

exports.getCommandAuthorized = async function getCommandAuthorized(groupId) {
    try {
      const { comandosDesautorizados } = await axios.get(`${BASEURL_BOTINFORS}/authorizations/${groupId}`);
      return comandosDesautorizados;
    } catch (err) {
      console.log(`error: ${err}`);
      return [];
    }
  };

exports.createblockcommand = async function createblockcommand(id, comando) {
    return axios.post(`${BASEURL_BOTINFORS}/authorizations/${id}`, {
        comandosdesautorizados: [comando],
      })
      .then((res) => {
        return {
          status: "success",
        };
      })
      .catch((err) => {
        console.log(`error: ${err}`);
        return {
          status: "error",
          message: {
            code: err.response?.status || err,
            text: err.response?.statusText || "",
          },
        };
      });
  };

exports.autorizecommand = async function autorizecommand(id, comando) {
    return axios
      .delete(`${BASEURL_BOTINFORS}/authorizations/${id}?comando=${comando}`)
      .then((res) => {
        return {
          status: "success",
        };
      })
      .catch((err) => {
        console.log(`error: ${err}`);
        return {
          status: "error",
          message: {
            code: err.response?.status || err,
            text: err.response?.statusText || "",
          },
        };
      });
  };
exports.postfrase = async function postfrase(user,string){
    axios.patch(`${BASEURL_BOTINFORS}/vip/${user}`, {
        descricao: string,
    }).then((res) => {
        return {
            status: "success"
        }
    }
    ).catch((err) => {
        console.log(`error: ${err}`);
        return {
            status: "error",
            message: {
                code: err.response?.status || err,
                text: err.response?.statusText || ''
            }
        } 
    });
}
exports.postXp = async function postXp(user,xp){
    axios.patch(`${BASEURL_BOTINFORS}/vip/${user}`, {
        xp: xp,
    }).then((res) => {
        return {
            status: "success"
        }
    }
    ).catch((err) => {
        console.log(`error: ${err}`);
        return {
            status: "error",
            message: {
                code: err.response?.status || err,
                text: err.response?.statusText || ''
            }
        } 
    });
}
exports.postSCrap = async function postSCrap(user,scrap){
    axios.patch(`${BASEURL_BOTINFORS}/vip/${user}`, {
        scrap: scrap,
    }).then((res) => {
        return {
            status: "success"
        }
    }
    ).catch((err) => {
        console.log(`error: ${err}`);
        return {
            status: "error",
            message: {
                code: err.response?.status || err,
                text: err.response?.statusText || ''
            }
        } 
    });
}
exports.posttitulo = async function posttitulo(user,string){
    axios.patch(`${BASEURL_BOTINFORS}/vip/${user}`, {
        titulo: string,
    }).then((res) => {
        return {
            status: "success"
        }
    }
    ).catch((err) => {
        console.log(`error: ${err}`);
        return {
            status: "error",
            message: {
                code: err.response?.status || err,
                text: err.response?.statusText || ''
            }
        }
    });
}


exports.createficha = async function createficha(id,ficha) {
    return axios.post(`${BASEURL_BOTINFORS}/fichas/`, {
        id: id,
        ficha: ficha,
    }).then((res) => {
        return {
            status: "success"
        }
    }
    ).catch((err) => {
        console.log(`error: ${err}`);
        return {
            status: "error",
            message: {
                code: err.response?.status || err,
                text: err.response?.statusText || ''
            }
        }
    });
}
exports.alterFicha = async function alterFicha(id,ficha) {
    return axios.patch(`${BASEURL_BOTINFORS}/fichas/${id}`, {
        ficha: ficha
    }).then((res) => {
        return {
            status: "success"
        }
    }
    ).catch((err) => {
        console.log(`error: ${err}`);
        return {
            status: "error",
            message: {
                code: err.response?.status || err,
                text: err.response?.statusText || ''
            }
        }
    });
}
exports.checkficha = async function checkficha() {
    return axios.get(`${BASEURL_BOTINFORS}/fichas`).then((res) => {
        return res.data
    }
    ).catch((err) => {
        console.log(`error: ${err}`);
        return {
            status: "error",
            message: {
                code: err.response?.status || err,
                text: err.response?.statusText || ''
            }
        }
    });
}

exports.createficha = async function createficha(id,ficha,boolean) {
    return axios.post(`${BASEURL_BOTINFORS}/fichas/`, {
      id: id,
      ficha: ficha,
      cadastrado: boolean
    })
      .then((res) => {
        return {
          status: "success",
        };
      })
      .catch((err) => {
        return {
          status: "error",
          message: {
            code: err.response?.status || err,
            text: err.response?.statusText || "",
          },
          error: err
        };
      });
  };

exports.dia_Hoje = async function dia_Hoje(input){
    // Cria um objeto Date com a data atual
  const currentDate = new Date();

  // Obtém o dia do mês (de 1 a 31)
  const day = currentDate.getDate();

  // Obtém o mês (de 0 a 11)
  const month = currentDate.getMonth() + 1;

  // Obtém o ano
  const year = currentDate.getFullYear();

  // Cria uma array com os valores de dia, mês e ano
  const dateArray = [day, month, year];

  return dateArray.join(input)
};

exports.dia_input = async function dia_input(input){
    const dateArray = input.split(",");
    // Converte cada elemento da array para o tipo de dados apropriado
    const day = parseInt(dateArray[0]);
    const month = parseInt(dateArray[1]);
    const year = parseInt(dateArray[2]);
    // Retorna a array com os valores convertidos
const newdatearray=  [ year,month,day];
    return newdatearray
}
exports.setprice = async function setpirce(string,secundo) {
    
    const response = await axios.patch(`${BASE_URL_game}/moedas/LILcoin`, {
        valor_venda: string,
        valor_compra: secundo,
    }).then((res) => {
        return {
            status: "success"
        }
    }
    ).catch((err) => {
        console.log(`error: ${err}`);
        return {
            status: "error",
            message: {
                code: err.response?.status || err,
                text: err.response?.statusText || ''
            }
        } 
    });
}     
exports.check_preco = async function check_preco() {
    try {
    const response = await axios.get(`${BASE_URL_game}/moedas`);
    const moedas = response.data;
    // Acesse o primeiro e único objeto da matriz
    const moeda = moedas[0];
    return moeda;
    } catch (err){
    console.log(`error: ${err}`);
    return {
        status: "error",
        message: {
            code: err.response?.status || err,
            text: err.response?.statusText || ''
        }
    }
}
}         
exports.cliente_compra = async function cliente_compra(id,quantidade,senderId){
    const {getVip,check_preco} = require("./fetch");
    const allVips = await getVip(); 
    const isClient =await allVips.find(vip => vip.phone === senderId);
    let moedaestoque= isClient.lilCoin + quantidade
    
    const _moeda= await check_preco()
    moedavalor_venda = (_moeda.valor_venda * quantidade);
    moedavalor_compra = (_moeda.valor_compra * quantidade);
    const clientdeck= isClient.deck - moedavalor_venda
return axios.patch(`${BASEURL_BOTINFORS}/vip/${id}`, {    
    
    lilCoin: moedaestoque,
    deck: clientdeck

    }).then((res) => {
        return {
            status: "success",
            moedavalor_venda: `${moedavalor_venda}`
        }
    }
    ).catch((err) => {
        console.log(`error: ${err}`);
        return {
            status: "error",
            message: {
                code: err.response?.status || err,
                text: err.response?.statusText || ''
            }
        }
    });

}

exports.clientetroca = async function cliente_troca(senderId,quantidade){
    const {getVip} = require("./fetch");
    const allVips = await getVip(); 
    const isClient =await allVips.find(vip => vip.phone === senderId);
    let moedaestoque= isClient.lilCoin + quantidade

return axios.patch(`${BASEURL_BOTINFORS}/vip/${senderId}`, {    
    
    lilCoin: moedaestoque,
    
    }).then((res) => {
        return {
            status: "success",
            moedavalor_venda: `${moedavalor_venda}`
        
        }
    }
    ).catch((err) => {
        console.log(`error: ${err}`);
        return {
            status: "error",
            message: {
                code: err.response?.status || err,
                text: err.response?.statusText || ''
            }
        }
    });

}

exports.cliente_venda = async function cliente_venda(id,quantidade,senderId){
    const {getVip,check_preco} = require("./fetch");
    const allVips = await getVip(); 
    const isClient =await allVips.find(vip => vip.phone === senderId);
    let moedaestoque= isClient.lilCoin - quantidade
    
    const _moeda= await check_preco()
    moedavalor_venda = (_moeda.valor_venda * quantidade);
    const clientdeck= isClient.deck + moedavalor_venda
return axios.patch(`${BASEURL_BOTINFORS}/vip/${id}`, {    
    
    lilCoin: moedaestoque,
    deck: clientdeck

    }).then((res) => {
        return {
            status: "success",
            moedavalor_venda: `${moedavalor_venda}`
        }
    }
    ).catch((err) => {
        console.log(`error: ${err}`);
        return {
            status: "error",
            message: {
                code: err.response?.status || err,
                text: err.response?.statusText || ''
            }
        }
    });

}
exports.update_price = async function update_price(operador,moedas){
    const {check_preco} = require("./fetch");
    const _moeda= await check_preco()
    
    const _operador= operador
    if (operador.includes('+')){
    const increase = 0.03
    moedavalor_venda = (_moeda.valor_venda * increase);
    moedavalor_compra = (_moeda.valor_compra * increase);
    valor_venda_= moedavalor_venda + _moeda.valor_venda
    valor_compra_= moedavalor_compra + _moeda.valor_compra
    console.log(`vamos ver se o erro é aqui no compra ${moedavalor_compra}`)
}
    if (operador.includes('-')){
        const decrease = -0.03
        moedavalor_venda = (_moeda.valor_venda * decrease);
        moedavalor_compra = (_moeda.valor_compra * decrease);
        valor_venda_= moedavalor_venda + _moeda.valor_venda;
        valor_compra_= moedavalor_compra + _moeda.valor_compra;
        console.log(`vamos ver se o erro é aqui no vendas ${moedavalor_venda}`)  

    }

return axios.patch(`${BASE_URL_game}/moedas/${moedas}`, {    
    
valor_venda: valor_venda_,
valor_compra: valor_compra_,

    }).then((res) => {
        return {
            status: "success",
            moedavalor_venda: `${moedavalor_venda}`
        }
    }
    ).catch((err) => {
        console.log(`error: ${err}`);
        return {
            status: "error",
            message: {
                code: err.response?.status || err,
                text: err.response?.statusText || ''
            }
        }
    });

}

exports.create_game = async function create_game(j1,grupo){
return await axios.post(`${BASE_URL_game}/tables/`, {      
        id: grupo,
        tablefrom: grupo,
        jogador1: j1,
        jogador2: "",
        playerRound: j1,
        grupoOnGame: false
    }).then((res) => {
        return { 
            status: "success"
        }
    }
    ).catch((err) => {
        console.log(`error: ${err}`);
        return {
            status: "error",
            message: {
                code: err.response?.status || err,
                text: err.response?.statusText || ''
            }
        }
    });
   
}


exports.ajogodavelha = async function ajogodavelha(grupo){
    return await axios.patch(`${BASE_URL_game}/tables/${grupo}`, {      
            table: [    [" 1 ", " 2 ", " 3 "],
            [" 4 ", " 5 ", " 6 "],
            [" 7 ", " 8 ", " 9 "]
        ]
        }).then((res) => {
            return { 
                status: "success"
            }
        }
        ).catch((err) => {
            console.log(`error: ${err}`);
            return {
                status: "error",
                message: {
                    code: err.response?.status || err,
                    text: err.response?.statusText || ''
                }
            }
        });
       
    }

exports.addturns = async function addturns(grupo,turn){
    return await axios.patch(`${BASE_URL_game}/tables/${grupo}`, {      
            tablefrom: grupo,
            turns: turn,
        }).then((res) => {
            return { 
                status: "success"
            }
        }
        ).catch((err) => {
            console.log(`error: ${err}`);
            return {
                status: "error",
                message: {
                    code: err.response?.status || err,
                    text: err.response?.statusText || ''
                }
            }
        });
        
    }

exports.moves = async function moves(grupo,player,x,y){
const all = await axios.get(`${BASE_URL_game}/tables/${grupo}`);
const battle = all.data;
const tablea = battle.table;
let currentPlayer = battle.jogador1;

const player1= currentPlayer
let mark;
let tablet = tablea
if (player1=== player){
    mark= '❌'
    }
    else {
    mark= '🟢'
    }
    
    tablet[x][y] = mark;

    return await axios.patch(`${BASE_URL_game}/tables/${grupo}`, {      
            table: tablet
        }).then((res) => {
            return { 
                status: "success"
            }
        }
        ).catch((err) => {
            console.log(`error: ${err}`);
            return {
                status: "error",
                message: {
                    code: err.response?.status || err,
                    text: err.response?.statusText || ''
                }
            }
        });
        
    }
exports.changeturn = async function changeturn(grupo,round){
    await axios.patch(`${BASE_URL_game}/tables/${grupo}`, {
        playerRound: round
    }).then((res) => {
        return { 
            status: "success"
        }
    }
    ).catch((err) => {
        console.log(`error: ${err}`);
        return {
            status: "error",
            message: {
                code: err.response?.status || err,
                text: err.response?.statusText || ''
            }
        }
    });
    
}

exports.setjogodavelha = async function setjogodavelha(grupo,player1){
        return await axios.patch(`${BASE_URL_game}/tables/${grupo}`, {             
            playerRound: player1,
            turns: 1

            }).then((res) => {
                return { 
                    status: "success"
                }
            }
            ).catch((err) => {
                console.log(`error: ${err}`);
                return {
                    status: "error",
                    message: {
                        code: err.response?.status || err,
                        text: err.response?.statusText || ''
                    }
                }
            });
            
    }
    exports.setBlackJack = async function setBlackJack(grupo,player1,player2){
        return await axios.patch(`${BASE_URL_game}/tables/${grupo}`, {             
            playerRound: player1,
            turns: 1,
            jogadores:[{id:player1,
            player:'jogador1',
            jogador1:player1,
            deck: ['0'],
            pontos: 0},{
            id:player2,
            player:'jogador2',
            jogador2:player2,
            deck: [0],
            pontos: 0
            }] 

            }).then((res) => {
                return { 
                    status: "success"
                }
            }
            ).catch((err) => {
                console.log(`error: ${err}`);
                return {
                    status: "error",
                    message: {
                        code: err.response?.status || err,
                        text: err.response?.statusText || ''
                    }
                }
            });
            
    }

exports.get_game = async function get_game(){
  return axios.get(`${BASE_URL_game}/tables/`).then((res) => {
        return res.data
    }
    ).catch((err) => {
        console.log(`error: ${err}`);
        return {
            status: "error",
            message: {
                code: err.response?.status || err,
                text: err.response?.statusText || ''
            }
        }
    });
}   

exports.end_game = async function end_game(grupo){
    return axios.delete(`${BASE_URL_game}/tables/${grupo}`,).then((res) => {
        return { 
            status: "success"
        }
    }
    ).catch((err) => {
        console.log(`error: ${err}`);
        return {
            status: "error",
            message: {
                code: err.response?.status || err,
                text: err.response?.statusText || ''
            }
        }
    });
   
}

exports.joingame = async function joingame(j2,grupo){
    return axios.patch(`${BASE_URL_game}/tables/${grupo}`, {
        jogador2: j2,
        grupoOnGame: true

    }).then((res) => {
        return {
            status: "success"
        }
    }
    ).catch((err) => {
        console.log(`error: ${err}`);
        return {
            status: "error",
            message: {
                code: err.response?.status || err,
                text: err.response?.statusText || ''
            }
        }
    });
}
exports.start_game = async function start_game(j1,grupo,player1card,player2card){
    return axios.post(`${BASE_URL_game}/tables/${grupo}`, {      
           playerRound: `${j1}`,
           Player1_card: [`${player1card}`],
           Player2_card: [`${player2card}`]

        }).then((res) => {
            return { 
                status: "success"
            }
        }
        ).catch((err) => {
            console.log(`error: ${err}`);
            return {
                status: "error",
                message: {
                    code: err.response?.status || err,
                    text: err.response?.statusText || ''
                }
            }
        });
       
    } 
exports.set_players_params = async function set_players_params(grupo,players,player1,player2){
    return axios.patch(`${BASE_URL_game}/tables/${grupo}`, {  
        playerRound: player1, 
        player1: player1,
        player2: player2,      
        atacante: "player1",  
        alvo: "player2",
        Players_stats: players

        }).then((res) => {
            return { 
                status: "success"
            }
        }
        ).catch((err) => {
            console.log(`error: ${err}`);
            return {
                status: "error",
                message: {
                    code: err.response?.status || err,
                    text: err.response?.statusText || ''
                }
            }
        });
        
}
exports.calcularDano = function calcularDano(atacante, alvo) {
    let dadorolado;
    let dano;
    const _atacante = atacante
    const _alvo = alvo
    dano = _atacante.atk - _alvo.Def;
    console.log(`isso aqui é o dano secundario ${dano}`)
    dadorolado=  Math.floor(Math.random() * 10) + 1;  
    if (dadorolado === 10){
        dadorolado=  Math.floor(Math.random() * 20) + 1;  
        // Ajuste de dano baseado na CA do alvo
        if (dadorolado > _alvo.CA) {
          return dano * 2;
        } else {
          return dano
        }
    }
    else {
        dano = dano/2
        dano = Math.round(dano*10)/10;
        return {dano:dano,
        resultado: "success"}
    }
    
}
exports.checkVipExpired = async function checkVipExpired(id) {
        const res = await axios.get(`${BASEURL_BOTINFORS}/vip/${id}`);
        const data = res.data;
        console.log(data)
      
        // Verifique se o objeto data.authorizations existe
        if (data.validadeVIP) {
          // Converta a data de vencimento em um número de milissegundos
          const expirationTimestamp = Date.parse(data.validadeVIP);
      
          // Verifique se o dia de vencimento já chegou
          const today = new Date();
          const expirationDate = new Date(expirationTimestamp);
          if (expirationDate < today) {
            return true;
          }
        }
        return false;
    }
exports.getgroup = async function getgroup(id) {
        return axios.get(`${BASEURL_BOTINFORS}/authorizations/${id}`).then((res) => {
            return res.data
        }
        ).catch((err) => {
            console.log(`error: ${err}`);
            return {
                status: "error",
                message: {
                    code: err.response?.status || err,
                    text: err.response?.statusText || ''
                }
            }
        });
    }

exports.downloadImage = async function downloadImage(url, fileName) {
      // Opções para o download da imagem
      const options = {
        url: url,
        dest: fileName
      };
    
      try {
        // Faça o download da imagem
        const { filename, image } = await download.image(options);
        console.log(`Imagem salva em ${filename}`);
      } catch (error) {
        console.error(error);
      }
    }

exports.randomNum = async function randomNum(max, min){
    // generate a random number
  
    // min not required
    if(min === undefined || min === '' || min === null){
      // min default value
      min = 0;
    }
  
    // random number, yay
    return Math.floor(Math.random() * (max - min) + min);
  }
  
  exports.checkWinner = async function checkWinner(table) {
    const mesa = table
    console.log(mesa)
    let hasWinner = false
    let theWinner = ''
  
    for (let i = 0; i < 3; i++) {
      if (mesa[i][0] === mesa[i][1] && mesa[i][0] === mesa[i][2] && (mesa[i][0] === "❌" || mesa[i][0] === "🟢")) {
        hasWinner = true
        theWinner = mesa[i][0]
        break
      }
      if (mesa[0][i] === mesa[1][i] && mesa[0][i] === mesa[2][i] && (mesa[0][i] === "❌" || mesa[0][i] === "🟢")) {
        hasWinner = true
        theWinner = mesa[0][i]
        break
      }
    }
    if (mesa[0][0] === mesa[1][1] && mesa[0][0] === mesa[2][2] && (mesa[0][0] === "❌" || mesa[0][0] === "🟢")) {
      hasWinner = true
      theWinner = mesa[0][0]
    }
    if (mesa[0][2] === mesa[1][1] && mesa[0][2] === mesa[2][0] && (mesa[0][2] === "❌" || mesa[0][2] === "🟢")) {
      hasWinner = true
      theWinner = mesa[0][2]
    }
  
    console.log(`hasWinner ${hasWinner}`)
    console.log(`theWinner ${theWinner}`)
  
    return {
      awinner: hasWinner,
      resultado: theWinner
    }
  }
  

exports.calcularPontos = async function calcularPontos(mao,pontuação){
let pontos= pontuação
    if (pontos== null || pontos== "" || pontos== undefined  ||pontos== NaN  ){
 pontos= 0
}
    cartas = mao

    let ases = 0;
    for (const carta of cartas) {
        if (carta === 'J' || carta === 'Q' || carta === 'K' || carta === 'B') {
            pontos += 10;
        } else if (carta === 'A') {
            ases++;
        } 
        else {
            pontos += parseInt(carta);
        }
    }

    for (let i = 0; i < ases; i++) {
        if (pontos + 11 > 21) {
            pontos++;
        } else {
            pontos += 11;
        }
    }

    return pontos;
}

exports.sortearCartas = async function sortearCartas() {
    const cartas = ['2', '3', '4', '5', '6', '7', '8', '9', 'B', 'J', 'Q', 'K', 'A'];
    let mao = [];
    for (let i = 0; i < 1; i++) {
        const carta = cartas[Math.floor(Math.random() * cartas.length)];
        mao.push(carta);


    
    }
    return mao.join(",");
}

exports.setBj = async function setBj(grupo,player1){
    return await axios.patch(`${BASE_URL_game}/tables/${grupo}`, {             
        playerRound: player1,
        turns: 1,
    
        }).then((res) => {
            return { 
                status: "success"
            }
        }
        ).catch((err) => {
            console.log(`error: ${err}`);
            return {
                status: "error",
                message: {
                    code: err.response?.status || err,
                    text: err.response?.statusText || ''
                }
            }
        });
        
}

exports.setcard = async function setcard(grupo, player) {
    try {
        const url = `${BASE_URL_game}/tables/${grupo}`;
        let data = {jogadores:[player] };
        const response = await axios.patch(url, data);
        return { status: "success" };
    } catch (err) {
        console.log(`error: ${err}`);
        return {
            status: "error",
            message: {
                code: err.response?.status || err,
                text: err.response?.statusText || ''
            }
        };
    }
};
exports.setpoints = async function setpoints(grupo, player,points) {
    try {
        const url = `${BASE_URL_game}/tables/${grupo}`;
        let data = {[`${player}_points`]: points,};
        const response = await axios.patch(url, data);
        return { status: "success" };
    } catch (err) {
        console.log(`error: ${err}`);
        return {
            status: "error",
            message: {
                code: err.response?.status || err,
                text: err.response?.statusText || ''
            }
        };
    }
};

exports.roll_dice = function roll_dice (num_sides, num_dice) {
    var results = [];
        for (var i = 0; i < num_dice; i++) {
        results.push(Math.floor(Math.random() * num_sides) + 1);
    }
    var result_str = "";
    for (var l = 0; l < results.length; l++) {
        result_str += "[ " + results[l] + " ] ";
    }
    return result_str;
}

exports.get_cards = async function get_cards(card){
    return axios.get(`${BASE_URL_game}/cards/${card}`).then((res) => {
          return res.data
      }
      ).catch((err) => {
          console.log(`error: ${err}`);
          return {
              status: "error",
              message: {
                  code: err.response?.status || err,
                  text: err.response?.statusText || ''
              }
          }
      });
  }   
exports.searchGoogle = async function searchGoogle(text) {
    const options = new chrome.Options();
    options.executablePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
    options.addArguments("--headless");
    const driver = new webdriver.Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();
    await driver.get("https://www.google.com/");
    const searchBox = driver.findElement(webdriver.By.name("q"));
    searchBox.sendKeys(text);
    searchBox.submit();
    const result = await driver.findElement(webdriver.By.xpath("//div[@class='r']/a"));
    const resultUrls = await Promise.all(results.slice(0).map(result => result.getAttribute("href")));
    driver.close();
    return resultUrls;
  }

  exports.moveAtk = async function moveAtk(alvo, dano) {
    try {
        const url = `${BASE_URL_game}/tables/${grupo}`;
        let data = { Players_stats: [{alvo}] };
        data.Players_stats = data.Players_stats.map(player => {
            if (player.player === alvo) {
                player.life -= dano;
            }
            console.log(`player é ${player}`)
            return player;
        });
        const response = await axios.patch(url, data);
        return { status: "success" };
    } catch (err) {
        console.log(`error: ${err}`);
        return {
            status: "error",
            message: {
                code: err.response?.status || err,
                text: err.response?.statusText || ''
            }
        };
    }
}

  
exports.moveDefense = async function moveDefense(grupo,player) {
    try {
        const url = `${BASE_URL_game}/tables/${grupo}`;
        let data = { Players_stats: [{ player: player, ondefence: true }]};
        const response = await axios.patch(url, data)
        return { status: "success" };
    } catch (err) {
        console.log(`error: ${err}`);
        return {
            status: "error",
            message: {
                code: err.response?.status || err,
                text: err.response?.statusText || ''
            }
        };
    }
}


  exports.moveMedit =  async function moveMedit(grupo,player) {
    try {
        const url = `${BASE_URL_game}/tables/${grupo}`;
        let data = { Players_stats: [{ player: player, meditation: true }] };
        const response = await axios.patch(url, data);
        return { status: "success" };
    } catch (err) {
        console.log(`error: ${err}`);
        return {
            status: "error",
            message: {
                code: err.response?.status || err,
                text: err.response?.statusText || ''
            }
        };
    }
  }


  exports.moveSpecial =  async function moveSpecial(grupo,player) {
        try {
        const url = `${BASE_URL_game}/tables/${grupo}`;
        let data = { [`${player}_hand`]: hand };
        const response = await axios.patch(url, data);
        return { status: "success" };
    } catch (err) {
        console.log(`error: ${err}`);
        return {
            status: "error",
            message: {
                code: err.response?.status || err,
                text: err.response?.statusText || ''
            }
        };
    }
  }

  exports.changeGame =  async function changeGame(grupo,alvo,atacante) {
    try {
    const url = `${BASE_URL_game}/tables/${grupo}`;
    let data = {atacante: atacante, alvo: alvo};
    const response = await axios.patch(url, data);
    return { status: "success" };
} catch (err) {
    console.log(`error: ${err}`);
    return {
        status: "error",
        message: {
            code: err.response?.status || err,
            text: err.response?.statusText || ''
        }
    };
}
}
exports.posttier = async function posttier(jogador, jogo, pontos) {
    try {
        const url = `${BASE_URL_game}/tier/`;
        let data = {[`${jogo}`]: [pontos],};
        const response = await axios.patch(url, data);
        return { status: "success" };
    } catch (err) {
        console.log(`error: ${err}`);
        return {
            status: "error",
            message: {
                code: err.response?.status || err,
                text: err.response?.statusText || ''
            }
        };
    }
};

exports.postMember = async function postMember(grupo, numeros) {
    try {
    const url = `${BASEURL_BOTINFORS}/adicionados/${grupo}`;
    let data = {integrantes: [numeros]};
    const osintegrante= data.integrantes
    const old= await axios.get(url)
    const member_old= old.integrantes
    console.log(member_old)
    const response = await axios.patch(url, data);
    return { status: "success" };
    } catch (err) {
        console.log(`error: ${err}`);
        return {
            status: "error",
            message: {
                code: err.response?.status || err,
                text: err.response?.statusText || ''
            }
        };
    }
};
exports.createPostMember = async function createPostMember(grupo, numeros) {
    try {
        const url = `${BASEURL_BOTINFORS}/adicionados/`;
        let data = {
            id: grupo,
            integrantes: [numeros.map(numero => ({numero}))]
        };
        const response = await axios.post(url, data);
        return { status: "success" };
    } catch (err) {
        console.log(`error: ${err}`);
        return {
            status: "error",
            message: {
                code: err.response?.status || err,
                text: err.response?.statusText || ''
            }
        };
    }
};
exports.deleteMember = async function deleteMember(numero,grupo) {
    const url = `${BASEURL_BOTINFORS}/adicionados/${grupo}`;
    console.log(url)
  
    try {
      // recuperar o JSON atual do servidor
      const response = await axios.get(url);
      console.log(response.data.integrantes)
      const stringed= JSON.stringify(response.data.integrantes)
        const parsied = JSON.parse(stringed)
        const numeros = parsied.flat().map(obj => obj.numero);
  
      // encontrar o objeto que corresponde ao integrante que será removido
      let integranteRemover;
      if (Array.isArray(numeros)) {
        // se o servidor retorna um array, encontrar o objeto dentro do array
        integranteRemover = numeros.find(integrantes => integrantes.numero === numero);
        console.log(integranteRemover)
      } else {
        // se o servidor retorna apenas um objeto, verificar se o número do integrante corresponde
        for (let i = 0; i < parsied.flat().length; i++) {
            const item = parsied.flat()[i];
            if (item.numero === numero) {
                integranteRemover = true;
              parsied.flat().splice(i, 1); // remove o item da matriz
              break;
            }
          }
      }
  
      if (!integranteRemover) {
        console.log('Integrante não encontrado!');
        return;
      }
  
      // remover o objeto da lista de integrantes
      if (Array.isArray(response.data)) {
        response.data = parsied
      } else {
        response.data = null;
      }
  
      // atualizar o JSON com a nova lista de integrantes que não contém o número do integrante removido
      const novoJson = JSON.stringify(parsied);
  
      // enviar a requisição atualizada para o servidor
      await axios.put(url, novoJson);
  
      console.log('Integrante removido com sucesso!');
    } catch (error) {
      console.log('Erro ao remover integrante:', error);
    }
  };
  exports.brainlyBusca = async function brainlyBusca(pergunta) {

    try {
    const  brainly  = 'require("brainly-scraper-v2");'
      const res = await brainly(pergunta, 1, 'pt');
      const resposta = res.data[0];
      return {
        autor: resposta.author,
        pergunta: resposta.question.content,
      };
    } catch (error) {
      console.error(error);
    }
}
exports.getRegistred = async function getRegistred() {
    return axios.get(`${BASEURL_BOTINFORS}/adicionados/`).then((res) => {
        return res.data
    }
    ).catch((err) => {
        console.log(`error: ${err}`);
        return {
            status: "error",
            message: {
                code: err.response?.status || err,
                text: err.response?.statusText || ''
            }
        }
    });
}
exports.searchAnime = async function searchAnime(url) {
    const response = await fetch(`https://api.trace.moe/search?url=${encodeURIComponent(url)}`);
    const data = await response.json();
    return data;
  }

  exports.tiktokdownload = async function tiktokdownload(url) {
    return new Promise((resolve, reject) => {
      const videoId = url.split('/').slice(-1)[0];
  
      // Define o caminho de saída do arquivo
      const outputPath =(__dirname, `../output/${videoId}.mp4`);
  
      // Cria um objeto ffmpeg e adiciona o comando para baixar o vídeo
      const command = ffmpeg(url)
        .output(outputPath)
        .on('end', () => {
          console.log(`Vídeo baixado e salvo em ${outputPath}`);
          resolve(outputPath);
        })
        .on('error', (err) => {
          console.error(`Erro ao baixar o vídeo: ${err.message}`);
          reject(err);
        });
  
      // Executa o comando ffmpeg
      command.run();
    });
  };

  exports.processImage = async function processImage(imageUrl) {
    // Configuração da requisição
    const url = "https://api.amethyste.moe/v1/unsafe/image";
    const options = {
      method: "POST",
      headers: {
        Authorization: "95457de6ba94df6b22b5e45aba7a5af5264d9d093e6f86a9eac263cd907b27ab62af6e0c28babd94828177f7eb991b5c4290aed85935aba495638584ed126fc0",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "url": imageUrl,
      }),
    };
  
    // Requisição
    const response = await fetch(url, options);
    const data = await response.json();
  
    // Verificação da resposta
    if (response.status !== 200) {
      throw new Error(`Erro ${response.status}: ${data.error}`);
    }
  
    // Retorna a imagem resultante
    return data.url;
  }
  exports.upImage = async function upImage(imagePath) {
    const imageBuffer = fs.readFileSync(imagePath);
    const response = await fetch('https://api.trace.moe/search', {
      method: 'POST',
      body: imageBuffer,
      headers: { 'Content-type': 'image/jpeg' },
    });
    const data = await response.json();
    return data;
  };
  exports.estapear = async function estapear(userphoto1, userphoto2) {
    const apiEndpoint = 'https://v1.api.amethyste.moe/generate/batslap';
    const apiKey = '60dfa915e348553a03869b10e26b7bb071d7a0156865a446b53f86bdc5a99789a8952274a7b67c640b24a00b7b771f92384c6a23188038ccb78e1b895a6fcbe6'
  
    const requestData = {
      avatar: userphoto1,
      url: userphoto2,
    };
  
    const config = {
      headers: {
        Authorization: apiKey
      },
    };
    console.log("ate aqui foi")
  
    try {
      const response = await axios.post(apiEndpoint, config, requestData);
      return response.data.url;

    } catch (error) {
      console.error(error);
      return null;
    }
  };
  exports.openAiQuestion = async function openAiQuestion(pergunta) {
    const response = await newopenai.createCompletion({
      model: "text-davinci-003",
      prompt: pergunta,
      temperature: 0,
      max_tokens: 300,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });
    return response;
  }
  
  exports.altertoken = async function altertoken(user,credit) {
    axios.patch(`${BASEURL_BOTINFORS}/vip/${user}`, {
        token: credit
      }).then(() => {
        return {
            status: "success"
        }
      }
      ).catch(err => {
        console.log(`error: ${err}`);
        return {
            status: "error",
            message: {
                code: err.response?.status || err,
                text: err.response?.statusText || ''
            }
        }
      });
  }

  exports.openAiImage = async function openAiImage(prompt) {
    const response = await newopenai.createImage({
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });
  
    const image_url = response.data.data[0].url;
    return image_url;
  }

  exports.getBotStatus = async function getBotStatus() {
    return axios.get(`${BASEURL_BOTINFORS}/status/`).then((res) => {
        return res.data
    }
    ).catch((err) => {
        console.log(`error: ${err}`);
        return {
            status: "error",
            message: {
                code: err.response?.status || err,
                text: err.response?.statusText || ''
            }
        }
    });
}
exports.postCredit = async function postCredit(user,credit){
    axios.patch(`${BASEURL_BOTINFORS}/vip/${user}`, {
        credito: credit,
    }).then((res) => {
        return {
            status: "success"
        }
    }
    ).catch((err) => {
        console.log(`error: ${err}`);
        return {
            status: "error",
            message: {
                code: err.response?.status || err,
                text: err.response?.statusText || ''
            }
        } 
    });
}
exports.postToken = async function postToken(user,credit){
    axios.patch(`${BASEURL_BOTINFORS}/vip/${user}`, {
        token: credit,
    }).then((res) => {
        return {
            status: "success"
        }
    }
    ).catch((err) => {
        console.log(`error: ${err}`);
        return {
            status: "error",
            message: {
                code: err.response?.status || err,
                text: err.response?.statusText || ''
            }
        } 
    });
}

exports.atualizarVencimento = async function atualizarVencimento(user,vencimento){
    axios.patch(`${BASEURL_BOTINFORS}/vip/${user}`, {
        validadeVIP: vencimento,
    }).then((res) => {
        return {
            status: "success"
        }
    }
    ).catch((err) => {
        console.log(`error: ${err}`);
        return {
            status: "error",
            message: {
                code: err.response?.status || err,
                text: err.response?.statusText || ''
            }
        } 
    });
}
exports.atualizarStatus = async function atualizarStatus(user,boolean){
    axios.patch(`${BASEURL_BOTINFORS}/vip/${user}`, {
        vipstatus: boolean,
    }).then((res) => {
        return {
            status: "success"
        }
    }
    ).catch((err) => {
        console.log(`error: ${err}`);
        return {
            status: "error",
            message: {
                code: err.response?.status || err,
                text: err.response?.statusText || ''
            }
        } 
    });
}
exports.adicionarCarta =  async function adicionarCarta(jogador, grupo, carta,ponto) {
    
    try {
      // Encontra a mesa do grupo
      const mesa = await getDados(grupo);
      const url= `${BASE_URL_game}/tables/${grupo}`
      if (mesa.status == 'error') {
        console.error('Erro na requisição:', mesa.status);
      }
      
      const jogadores = mesa.jogadores
      // Verifica se o jogador está na mesa
      const jogadorNaMesa = await jogadores.find(j => j.jogador1 === jogador || j.jogador2 === jogador);
      if (!jogadorNaMesa) throw new Error('Jogador não encontrado na mesa');
      
      // Determina se o jogador é o jogador1 ou jogador2
      const nomeDoJogador = await jogadorNaMesa.jogador1 === jogador ? 'jogador2' : 'jogador1';
      let logador = 0
      if (nomeDoJogador== "jogador1"){
        logador= 1
      } else if (nomeDoJogador== "jogador2") {
        logador= 0
      }
      const jogadorF= jogadores[logador]
      // Adiciona a carta ao deck do jogador
      let decker=jogadorF.deck
      let jogadorponto= jogadorF.pontos
      if (jogadorponto== null || jogadorponto== undefined ){
        jogadorponto= 0 
      }
    let resultante = decker.push(carta);
    let pontuacao =  ponto
    jogadorF.pontos = pontuacao
let info
     info= mesa
        fetcher(url,info)

      
        async function fetcher(url, data) {
            await fetch(url, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data)
            });
          }

      
      // Retorna o novo deck do jogador
      return jogadorNaMesa.deck;
    } catch (error) {
      console.error(error);
    }
   async function getDados(local){
    return axios.get(`${BASE_URL_game}/tables/${local}`).then((res) => {
        return res.data
    }
    ).catch((err) => {
        console.log(`error: ${err}`);
        return {
            status: "error",
            message: {
                code: err.response?.status || err,
                text: err.response?.statusText || ''
            }
        }
    });
    

    }
  }

exports.testedeLink = function testedeLink(BODY) {
    // Cria uma expressão regular para verificar se a string contém um link
    var regex = /<a\s+(?:[^>]*?\s+)?href=["'](https?:\/\/)?[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?["']/i;
    
    // Verifica se a string contém o padrão de expressão regular
    return regex.test(BODY);
  }
  
  exports.createAntilinkMethod = async function createAntilinkMethod(id) {
    return axios.patch(`${BASEURL_BOTINFORS}/authorizations/${id}`, {
      method: 'pacifico'
    })
      .then((res) => {
        return {
          status: "success",
        };
      })
      .catch((err) => {
        return {
          status: "error",
          message: {
            code: err.response?.status || err,
            text: err.response?.statusText || "",
          },
          error: err
        };
      });
  };

  exports.alterAntilinkMethod = async function alterAntilinkMethod(id,metodo) {
    return axios.patch(`${BASEURL_BOTINFORS}/authorizations/${id}`, {
      method: metodo
    })
      .then((res) => {
        return {
          status: "success",
        };
      })
      .catch((err) => {
        return {
          status: "error",
          message: {
            code: err.response?.status || err,
            text: err.response?.statusText || "",
          },
          error: err
        };
      });
  };

  exports.switchAntilink = async function switchAntilink(id,metodo) {
    return axios.patch(`${BASEURL_BOTINFORS}/authorizations/${id}`, {
    antlink: metodo
    })
      .then((res) => {
        return {
          status: "success",
        };
      })
      .catch((err) => {
        return {
          status: "error",
          message: {
            code: err.response?.status || err,
            text: err.response?.statusText || "",
          },
          error: err
        };
      });
  };
  exports.getMarket = async function getMarket() {
    return axios.get(`${BASEURL_BOTINFORS}/bandiCamp/`).then((res) => {
        return res.data
    }
    ).catch((err) => {
        console.log(`error: ${err}`);
        return {
            status: "error",
            message: {
                code: err.response?.status || err,
                text: err.response?.statusText || ''
            }
        }
    });
}
exports.downloadInstagramReel = async function downloadInstagramReel(url) {
        try {
            return fileContent = await action2(url);
        } catch (error) {
            console.error('Erro ao baixar o arquivo:', error.message);
            throw error;  // Rejogue o erro para que o chamador possa lidar com ele, se necessário
        }
    };
        



exports.downloadAndSaveFile =  async function downloadAndSaveFile(url,videoId) {
    try {
        // Faz a requisição HTTP para obter o conteúdo do arquivo
        const response = await axios.get(url, { responseType: 'arraybuffer' });

        const contentDisposition = response.headers['content-disposition'];
        const filenameMatch = contentDisposition.match(/filename="(.*?)"/);
        const filename = filenameMatch ? filenameMatch[1] : 'downloaded_file';

        const filePath = (__dirname, `../output/${videoId}.mp4`);

        // Salva o arquivo no diretório especificado
        fs.writeFileSync(filePath, response.data);

        return (`Arquivo baixado e salvo em: ${filePath}`);
    } catch (error) {
        return ('Erro ao baixar o arquivo:', error.message);
    }
}

exports.boasVindas = async function boasVindas(participantChangedEvent, group, grupoInfo, callback) {
    const { getRegistred, postMember } = require('./fetch');
    const registered = await getRegistred();
    const isregistered = registered.find(chat => chat.id === group);
    const stringed = JSON.stringify(isregistered.integrantes);
    const parsied = JSON.parse(stringed);
  
    let message = null;
    let isSenderInList = false;
  
    for (let i = 0; i < parsied.flat().length; i++) {
      const item = parsied.flat()[i];
      if (item.integrantes === participantChangedEvent.who) {
        isSenderInList = true;
        parsied.flat().splice(i, 1);
        break;
      }
    }
  
    if (participantChangedEvent.action == "add") {
      if (isSenderInList == false) {
        const member = participantChangedEvent.who;
        const result = await postMember(group, member);
  
        const packet = grupoInfo.welcomeFrase;
        const persona = participantChangedEvent.who
  
        message = `Olá, @${persona}\n${packet}`;
      }
    }
  
    if (participantChangedEvent.action == "remove") {
      const persona = participantChangedEvent.who.replace(/@c.us/g, '');
  
      message = `@${persona} abandonou o grupo por motivo de força maiores`;
    }
  
   return message
  }