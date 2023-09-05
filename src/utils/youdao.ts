function sha256(input) {
  const crypto = require("crypto");
  const hash = crypto.createHash("sha256");
  hash.update(input);
  return hash.digest("hex");
}
function truncate(q) {
  var len = q.length;
  if (len <= 20) return q;
  return q.substring(0, 10) + len + q.substring(len - 10, len);
}

// 获取有道词典请求路径
module.exports = function getYouDaoRequestUrl(query) {
  const appKey = "7a94b50e641d1737";
  const key = "XGCWpuZ6huryK4I3WC9faLb1TrCyDG7P"; //注意：暴露appSecret，有被盗用造成损失的风险
  const salt = new Date().getTime();
  const curtime = Math.round(new Date().getTime() / 1000);
  // 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
  const from = "auto";
  const to = "auto";
  const str1 = appKey + truncate(query) + salt + curtime + key;

  const sign = sha256(str1);

  const params = {
    q: query,
    from: "auto",
    to: "auto",
    appKey,
    salt,
    sign,
    signType: "v3",
    curtime,
  };

  //   const queryParamsString = `?q=${query}&from=auto&to=auto&appKey=${appKey}&salt=${salt}&sign=${sign}&signType=v3&curtime=${curtime}`;
  const querystring = require("querystring");
  const queryParamsString = querystring.stringify(params, null, null, {
    encodeURIComponent: querystring.escape,
  });

  const requestUrl = `https://openapi.youdao.com/api`;

  return `${requestUrl}?${queryParamsString}`;
};
