const express = require('express')
const requestIP = require('request-ip')

const getIP = require('ipware')().get_ip

const fs = require('fs')
const { log } = require('console')

const app = express()

app.get('/(*)?', (req,res) => {
    let time = new Date().toLocaleTimeString() + "    " + new Date().toLocaleDateString()
    console.log(time);
    console.log(getIP(req));


    ////
    let ipStr = "socket: " + req.socket.remoteAddress + "<br>\n" +
    "request-ip: " + requestIP.getClientIp(req) + "<br>\n" +
    "ipware: " + getIP(req).clientIp + "<br>\n";

    console.log(ipStr);
    fs.appendFileSync("ip.log", time + "\n" + ipStr)
    res.sendFile(__dirname + '/image.jpg')

//    res.send(ipStr)
})

app.listen(80)