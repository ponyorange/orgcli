const Table = require('cli-table2'); // 表格输出
function timeTransform(timeStr: number | string): number | string {
    timeStr = timeStr + "";
    //是否纯数字
    if (/^[0-9]+$/.test(timeStr)) {
        //判断毫秒还是秒
        if (timeStr.length >= 13) {//毫秒处理
            return timestamp2time(Number(timeStr))
        } else {//秒处理
            return timestamp2time(Number(timeStr) * 1000)
        }
    } else if (/^(\d{4})-(\d{1,2})-(\d{1,2})$/.test(timeStr)) {
        if (verifyDate(timeStr)) {
            const d = new Date(timeStr)
            return d.getTime();
        } else {
            return -1;
        }
    } else if (/^(\d{4})-(\d{1,2})-(\d{1,2}) (\d{1,2}:)?(\d{1,2}:)?(\d{1,2})$/.test(timeStr)) {
        const times = timeStr.split(" ");
        if (times[1].split(":").length === 1) timeStr = timeStr + ":00"
        if (verifyDate(times[0]) && verifTime(times[1])) {
            const d = new Date(timeStr)
            return d.getTime();
        } else {
            return -1;
        }
    } else {
        return -1
    }
}

function verifyDate(dateStr: string): boolean {
    const dateReg = /^(\d{4})-(\d{1,2})-(\d{1,2})$/;
    //日期格式不匹配
    if (!dateReg.test(dateStr)) {
        return false;
    }

    //使用捕获组获取日期
    const date = {
        year: RegExp.$1,
        month: RegExp.$2,
        day: RegExp.$3,
    }
    //使用 Date() 对象，新建对象时会将日期转化为合法日期
    //比如 2020-02-30 被转化为 2020-3-1
    const dateObj = new Date(Number(date.year), Number(date.month) - 1, Number(date.day));
    return !(Number(date.year) !== dateObj.getFullYear() || Number(date.month) !== dateObj.getMonth() + 1 || Number(date.day) !== dateObj.getDate());
}

function verifTime(timeStr: string): boolean {
    const times = timeStr.split(":");
    if (times.length === 1) {
        return Number(timeStr) <= 24;
    } else if (times.length === 2) {
        return (Number(times[0]) <= 24 && Number(times[1]) <= 60)
    } else {
        return (Number(times[0]) <= 24 && Number(times[1]) <= 60 && Number(times[1]) <= 60)
    }
}


function timestamp2time(timestamp: number): string {
    const d = new Date(timestamp)
    return d.getFullYear() + "-" + format(d.getMonth() + 1) + "-" + format(d.getDate()) + " " + format(d.getHours()) + ":" + format(d.getMinutes()) + ":" + format(d.getSeconds());
}

function format(str: number): string {
    if (str < 9) {
        return "0" + str
    }
    return "" + str
}

function formatTime(time: string): string {
    if (!time) return "00:00:00";
    const times = time.split(":")
    if (times.length === 1) {
        return format(Number(time)) + ":00:00"
    } else if (times.length === 2) {
        return format(Number(times[0])) + ":" + format(Number(times[1])) + ":" + "00"
    } else {
        return format(Number(times[0])) + ":" + format(Number(times[1])) + ":" + format(Number(times[2]))
    }
}

module.exports = function consoleTransformTime(timeOrtimestamp) {
    if (timeTransform(timeOrtimestamp) === -1) {
        console.log("输入格式不对，请输入时间戳（秒与毫秒都可以），或者输入格式化时间：yyyy:mm:dd hh:mm:ss,例如：")
        console.log("t2t 1356145212 或者 tst 1356145212000")
        console.log("t2t 2022-11-11 11:11:11 或者 t2t 2022-11-11 11:11 或者 t2t 2022-11-11 11")
    } else {
        const res = timeTransform(timeOrtimestamp);
        if (/^[0-9]+$/.test(res.toString())) {
            const keys = timeOrtimestamp.split(" ")
            const key = keys[0] + " " + formatTime(keys[1])
            const msres = {[key]: ["-->", Math.floor(Number(res) / 1000) + "", "s", "--", res + "", "ms"]};
            const table = new Table();
            table.push(msres);
            console.log(table.toString())
        } else {
            let key = timeOrtimestamp + "";
            if (key.length >= 13) {//毫秒处理
                key += " (ms)";
            } else {
                key += " (s)";
            }
            const msres = {[key]: ["-->", res]};
            const table = new Table();
            table.push(msres);
            console.log(table.toString())
        }
    }
}

export default void 0;
