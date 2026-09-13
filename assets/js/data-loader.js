/**
 * data/ 配下のJSONを読み込むための共通ヘルパー。
 * 各ページの末尾で loadJSON("data/xxx.json").then(...) のように使う。
 * 開催回ごとの内容更新は、HTML本体ではなく data/ のJSONファイルを
 * 編集することで反映される想定。
 */
function loadJSON(path) {
  return fetch(path).then(function (res) {
    if (!res.ok) throw new Error("failed to load " + path);
    return res.json();
  });
}

function el(tag, className, html) {
  var node = document.createElement(tag);
  if (className) node.className = className;
  if (html !== undefined) node.innerHTML = html;
  return node;
}
