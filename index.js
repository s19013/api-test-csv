// express呼び出し
const { kStringMaxLength } = require('buffer')
const express = require('express')
// fsモジュール準備
const fs = require('fs')
// コンバーター(自作モジュール)準備
const converter = require('./converter.js')
// express準備
const app = express()
// ポート番号設定
const port = 3000

// csvファイル
const csvFilePath = './test.csv'

//csvファイル読み込み
try {f = fs.readFileSync(csvFilePath, 'utf-8');}
catch (err) { console.log(err); }

// csvファイルをjsonに
let jsonFile =  converter.csvToJson(f)

// jsonで保存するための準備
app.use(express.json())


// '/test'がpost通信をする時
app.post('/test',(req,res)=>{
    // リクエストのボディの部分を取得 (web系についての参考書を読めばわかる)
    // どちらかがnullだったら失敗処理
    if (req.body.name   == null ||
        req.body.age    == null ||
        req.body.gender == null) {
        return res.json({
            "status":false,
            "errorMessage":"invalid"
        })
    }
    // 成功 : 以下のレスポンス(jsonファイル)を返す
    
    jsonFile.push(req.body)
    res.json({
        "status":true,
        "main":jsonFile
    })
    // 保存作業
    // ファイルの末尾に追加する
    fs.appendFileSync(
        csvFilePath,
        converter.jsonToCsvOneLine(req.body),
        'utf-8');
})

// データ取得
// "/test"がget通信をする時
app.get("/test",(req,res)=>{
    res.json({
        "status":true,
        "main":jsonFile
    })
})


//データ削除
app.get("/test/delete/:id",(req,res)=>{
    console.log(req.params);
    res.json({
        "status":true,
        "main":req.params
    })
})
















// サーバー起動
app.listen(port,() =>{
// 初期処理
    console.log(`app listening at http://localhost:${port}`);
})

// 同じurlでも通信方式に応じて処理を変えられる