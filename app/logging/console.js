var console = {
    log:function(msg){
        process.stdout.write(`${msg}`);
    },
    logLn:function(msg){
        process.stdout.write(`${msg}\n`);
    }
}
module.exports =  console;