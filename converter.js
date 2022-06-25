// https://elsammit-beginnerblg.hatenablog.com/entry/2021/06/20/221259


// csv->json
exports.csvToJson = function(csvArray){
    // 配列用意
    let jsonArray = [];

    // 行ごとに区切る
    let RowArray = csvArray.split(/[\r\n|\n|\r]/);
    // 見出しをitemsの中に入れる
    let heading = RowArray[0].split(',');

    // 各行を,で区切ってオブジェクト(連想配列を作る)
    for(let i = 1; i < RowArray.length; i++){
        let cellArray = RowArray[i].split(',');
        let line = new Object();
        for(let j = 0; j < heading.length; j++){
            line[heading[j]] = cellArray[j];
        }
        // 配列に追加
        jsonArray.push(line);
    }
    return jsonArray;
}

// すべてのjsonをcsvに保存
// すべてを最初から上書きする時に使う
// json -> csv
exports.jsonToCsvAll=function(json) {
    // 見出しをとりだす
    let csv= Object.keys(json[0]).join(',') + "\n";

    // オブジェクトを1つ1つ配列化
    // ","で文字列として結合
    // 最後に'\n'を足す
    csv += json.map((object) =>{
        Object.keys(object).map((key) => {
            object[key];
        }).join(',');
    }).join('\n');

    return csv;
}

// 既存ファイルに1行だけ追加する時に使う
// json -> csv
exports.jsonToCsvOneLine=function(json) {
    return '\n' + Object.values(json).join(',');
}


/*
.mapはオブジェクトや配列を加工した配列として返す
例 list [1,2,3,4,5]
list.map(x => x*2) listの中身を2倍にする
->[2,4,6,8,10]

mapの中は無名関数,アロー関数,ラムダ関数

関数で近いことをすると
map(list){
    let otherList = []
    for(const x in list){ otherList.push(x*2) }
    return otherList
}



Object.keys(object).map((key) => {
    object[key];
}).join(',');

Object.keys(object)
->オブジェクト型の変数であるobjectの中にあるkeyだけを取り出して配列化
{name:"bob",age:22,gender:"male"}
->[name,age,gender]
(key) => { object[key] }
objectのkeyに対するバリューを配列として返す
->[bob,22,male]

.map().join(',')なのでmapで作られた配列は','で結合した文字列として返される
bob,22,male,

*/