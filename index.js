const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');

app.use(express.json());
app.use(cors({
    origin: '*'
}));
/*
*
* Data
*
*/
const myFile = './json/data0.json';
/*
*
* Obtiene todos los empleados
*
*/
app.get('/getdata', (req,res) => {

    const myData = fs.readFileSync(myFile);
    const myRes = JSON.parse(myData);
    res.json(myRes);    
    // res.json({
    //     "data" : myRes
    // });
    // res.send("Hola con Get data");
})

app.get('/dataById/:id', (req,res) => {
    const myId = req.params.id;
    const myData = fs.readFileSync(myFile);
    const myRes = JSON.parse(myData);   
    const myResId = myRes.find( (x) => {
        return +x.id === +myId;
    });
    res.json(myResId);
})

app.post('/dataInsert', (req,res) => {
    const myData = fs.readFileSync(myFile);
    const myRes = JSON.parse(myData);   
    const myResponse = {
        error : false,
        msg: "Registro Exitoso",
        data: null
    };

    console.log("Empelado llega : " + JSON.stringify(req.body));

    const empleado = {
        id : myRes.length + 1,
        papellido: req.body.papellido,
        sapellido: req.body.sapellido,
        pnombre: req.body.pnombre,
        onombres: req.body.onombres,
        ppais : req.body.ppais,
        tidentificacion :  req.body.tidentificacion,
        nidentificacion : req.body.nidentificacion,
        celectronico : req.body.celectronico,
        fingreso : req.body.fingreso, 
        narea: req.body.narea,
        dstatus : req.body.dstatus,
        fregistro: req.body.fregistro    
    };
    console.log("empleado : " + JSON.stringify(empleado));
    myRes.push(empleado);

    fs.writeFile(myFile,JSON.stringify(myRes), (err) => {
        myResponse.error = true;
        myResponse.msg = "Error en Registro";
    });
    myResponse.data = myRes;

    res.json(myResponse);
})

app.put('/dataUpdate/:id', (req,res) => {
    const myId = req.params.id;    
    const myData = fs.readFileSync(myFile);
    const myRes = JSON.parse(myData);   
    const myResponse = {
        error : false,
        msg: "Actualización Exitosa",
        data: null
    };  

    // console.log("busca en : " + JSON.stringify(myRes));

    const myExiste = myRes.findIndex( (x) => {
        return +x.id == +myId;
    });

    if (myExiste == -1) {
        myResponse.error = true;
        myResponse.msg = "Error Actualizando - Registro no encontrado ID : " + myId;

        res.json(myResponse);
        return;    
    }    


    console.log("Actualiza llega :  " + myId + " : " + JSON.stringify(myRes[myExiste]));
    console.log("Actualiza params :  " + myId + " : " + JSON.stringify(req.params));
    console.log("Actualiza body :  " + myId + " : " + JSON.stringify(req.body));    
    console.log("Actualiza papellido : " + myId + " : " + myRes[myExiste].papellido);
    console.log("Actualiza fregistro : " + myId + " : " + myRes[myExiste].fregistro);

    console.log("este es papellido  index : " + myExiste); 

    myRes[myExiste].papellido = req.body.papellido;
    myRes[myExiste].sapellido = req.body.sapellido;
    myRes[myExiste].pnombre = req.body.pnombre;
    myRes[myExiste].onombres = req.body.onombres;
    myRes[myExiste].ppais = req.body.ppais;
    myRes[myExiste].tidentificacion = req.body.tidentificacion;
    myRes[myExiste].nidentificacion = req.body.nidentificacion;
    myRes[myExiste].celectronico = req.body.celectronico;
    myRes[myExiste].fingreso = req.body.fingreso;
    myRes[myExiste].narea = req.body.narea;
    myRes[myExiste].dstatus = req.body.dstatus;
    myRes[myExiste].fregistro = req.body.fregistro;

    fs.writeFile(myFile,JSON.stringify(myRes), (err) => {
        myResponse.error = true;
        myResponse.msg = "Error Actualizando";
    });

    res.json(myResponse);
})

app.delete('/dataDelete/:id', (req,res) => {
    const myId = req.params.id;    
    const myData = fs.readFileSync(myFile);
    const myRes = JSON.parse(myData);   
    const myResponse = {
        error : false,
        msg: "Borrado Exitoso",
        data: null
    };  

    // console.log("busca en : " + JSON.stringify(myRes));

    const myExiste = myRes.findIndex( (x) => {
        return +x.id == +myId;
    });

    if (myExiste == -1) {
        myResponse.error = true;
        myResponse.msg = "Error Borrando - Registro no encontrado ID : " + myId;    

        res.json(myResponse);
        return;           
    }

    const myResult = myRes.filter((x) => {
        return +x.id !== +myId;
    });

    fs.writeFile(myFile,JSON.stringify(myResult), (err) => {
        myResponse.error = true;
        myResponse.msg = "Error Borrando";
    });    

    res.json(myResponse);
})

app.listen(3000, ()=> {
    console.log("Servidor cidenet API iniciado en puerto 3000");
});