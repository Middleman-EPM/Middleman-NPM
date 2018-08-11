  function convertRegex(str){
    str = str.replace(/[\/]/, '')
      .replace(/[\^]/, '')
      .replace(/\\/, '')
    str =  str.substr(0, str.lastIndexOf("\/"))
    
    if (str.lastIndexOf("\\") !== -1){
      str =  str.substr(0, str.lastIndexOf("\\"))
    }
    else if (str.lastIndexOf("\/") !== -1) {
        str =  str.substr(0, str.lastIndexOf("\/"))
    }
    return str
  }  