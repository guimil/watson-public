

const AssistantV1 = require('ibm-watson/assistant/v1'); // bilbioteca utilizada para integracao com watson
var prompt = require('prompt-sync') (); // bibliteca utilizada para teste desktop

// Configuração da integracao

const VERSAO = '2019-02-28'                                           // Acesada em: https://cloud.ibm.com/apidocs/assistant?locale=pt-br#versioning
const APIKEY = ''                                                     // Acessar: https://cloud.ibm.com/resources >> Selecionar o Serviço 
const URL = 'https://gateway-syd.watsonplatform.net/assistant/api'    // Acessar: https://cloud.ibm.com/resources >> Selecionar o Serviço 
const WORKSPACE = ''                                                  // Acessar: https://cloud.ibm.com/resources >> Selecionar o Serviço >> Lauch Watson Assitent >> Skill >> View Api detail 


// JSON de autenticacao
const assistant = new AssistantV1({
  version: VERSAO,
  iam_apikey: APIKEY,
  url: URL,
  path: {workspace_id:WORKSPACE}
  
});


// Mensagens 
assistant.message({workspace_id: WORKSPACE}, processarResposta);

function processarResposta(erro, response){

  if(erro){
    console.log(erro)
  }

  if(response.output.text != 0){
    // apresentar mensagem no console, substituir por resposa ao facebook
    console.log(response.output.text[0])
  }

  // apresentar input no console, substituir por entrada do facebook
  var novaMensagemUsuario = prompt('>> ');
// Mensagens com contexto ativo
  assistant.message({
    workspace_id: WORKSPACE,
    input: {'text': novaMensagemUsuario },
    context : response.context
    
    }, processarResposta);

}


