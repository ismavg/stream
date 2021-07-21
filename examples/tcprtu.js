// var modbus = require("modbus-stream");
const { Socket } = require("dgram");
var modbus = require("../lib/modbus");

var server = modbus.tcprtu.server({ debug: "server" }, (connection) => {    
    connection.readHoldingRegisters({ address: 25344, quantity: 1 }, (err, info) => {
        console.log("response", info.response.data);
    });
    connection.on('error', (err)=>{
        console.log("Caught server socket error: ")
        console.log(err.stack)
    });
}).listen(502, () => {
    modbus.tcprtu.connect(502, { debug: "client" }, (err, connection) => {
        connection.on("read-holding-registers", (request, reply) => {
            reply(null, [Buffer.from([ 0x02, 0x34 ])]);
        });
    });
});