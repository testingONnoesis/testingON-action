const core = require('@actions/core')
const github = require('@actions/github')

const axios = require('axios');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
  try {
    // GET NTX URL from input
    const domain = core.getInput('domain');
    const uri = core.getInput('uri');
    const username = core.getInput('username');
    const password = core.getInput('password');
    const wait_time = core.getInput('wait-time');

    //const domain = "http://srvwp15.westeurope.cloudapp.azure.com:8084"
    //const uri = "/NTX/ntxWebService?LinkID=178&TypeID=1&MachineID=132&RepositoryID=2&ProjectID=0bd5b276-08aa-4cd7-b6c1-0f18b7bcf951&Version=92&Cycle=93&UserId=46&ServerURL=18&EnvironmentId=8&Collection=DefaultCollection&Token=qafbanqku4ckwt4jnt7lcretgvfqpo4nthacvoixsvbhnryql2ua"
    
    console.log(`Web request to ${domain}${uri}`);
    const url = `${domain}${uri}`

    //USED for debug
    //const username = 'alho';
    //const password = 'admin';
    //const wait_time = 20;

    const response = await axios.get(url, {
      auth: {
        username: username,
        password: password
      }
    })

    const { id } = response.data;

    if (id == undefined || id == -1){
      core.info(response.data);
      core.setFailed("Error getting execution ID");
      return;
    }

    console.log("Execution created with ID: " + id);

    let message;
    let isComplete = false;
    //Start looping until execution finishes
    do{

      //Wait for X seconds
      console.log(`Wait for ${wait_time} seconds`);
      try{
        await sleep(wait_time * 1000);
      }catch{
        console.log("Ending wait");
      }
      
      //Ask for status of execution
      const response = await axios.get(`${domain}/ntxWebService?GetStatusId=${id}`, {
        auth: {
          username: username,
          password: password
        }
      })
      
      const code = response.data.status_code;
      message = response.data.message;
      //const execution_link = response.data.execution_link;

      console.log("Code: " + code);
      switch(code){

        case 1:
          isComplete = false;
          core.info(message)
          break;

        case 2: 
          isComplete = false;
          core.info(message)
          break;
        case 3:
          isComplete = true
          core.info(message)
          break;
        case 4 :
          isComplete = true;
          core.setFailed(message);
          break;
        case -2 :
          isComplete = true;
          core.setFailed(message);
          break;
        case -3 :
          isComplete = true;
          core.setFailed(message);
          break;
        case -4 :
          isComplete = true;
          core.setFailed(message);
          break;
        case -5 :
          isComplete = true;
          core.setFailed(message);
          break;
        case -6 :
          isComplete = true;
          core.setFailed(message);
          break;
        case -7 :
          isComplete = true;
          core.setFailed(message);
          break;
        case -8 :
          isComplete = true;
          core.setFailed(message);
          break;

        default:
          isComplete = true;
          core.setFailed("Unknown code status");
          break;

      }

      if (code != 1 || code !=2)
        console.log(response.data);


    }while( !isComplete );

    console.log('End of NTX Action');

    core.setOutput("status", message);

  } catch (error) {
    core.setFailed(error.message);
  }
})();