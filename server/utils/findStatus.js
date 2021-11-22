
function findStatus(ID, submissions, totalQuestions) {
  let status = "incomplete";
  if (submissions.length <= 0) {
    return status;
  }

  for (let i = 0; i < submissions.length; i++) {
    if (submissions[i].section.equals(ID)) {
      status = submissions[i].status;
      // status = checkAllAnsers(submissions[i], totalQuestions);
      break;
    }
  }
  return status;
}


function checkAllAnsers({questionair}, totalQuestions) {
  let status = "completed";

  if([undefined,null].includes(questionair) || !questionair.length) {
    return 'incomplete'
  }

  if(totalQuestions && questionair.length != totalQuestions) {
    return 'incomplete'
  }


  let completed = [];

  for(let q of questionair) {
    let ans = q.ans;
    let qtype  = q.question.qtype;

    if(qtype.indexOf('file') < 0) {
      let allinCompleteAnswerd = ans.filter(a => [undefined,null, ""].includes(a.value.trim()));
      if(!allinCompleteAnswerd.length) {
        completed.push(true);
      }  else {
        completed.push(false);
      }
    }

    if(qtype.indexOf('file') >= 0) {
        let hasFileUploaded = ans.find(f => f.value.split('/')[0].indexOf('http') >= 0)
        if(!hasFileUploaded) {
          let textProvided = ans.find(a => ![undefined,null, ""].includes(a.value.trim()))
          if(textProvided) {
            completed.push(true);
          } else {
            completed.push(false);
          }
        
        } else {
          completed.push(true);
        }
    }
  }


  if(completed.includes(false)) {
    status = 'incomplete';
  } 

  return status

}

module.exports = {
  findStatus,checkAllAnsers
};
