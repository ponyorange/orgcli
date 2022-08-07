const fs = require("fs");
module.exports = function css2var(path){
    try {
        let content = fs.readFileSync(path).toString();
        let newRootCss = `
:root {
    --org-color-primary:       #f0ad4e;
    --org-color-secondary:     #6c757d;
    --org-color-success:       #5cb85c;
    --org-color-info:          #5bc0de;
    --org-color-warning:       #fadb14;
    --org-color-danger:        #d9534f;
    --org-color-light:         #f8f9fa;
    --org-color-dark:          #343a40;
    --org-color-primary-darken:#df8a13;
    --org-primary-opacity01:   rgba(240, 173, 78, 0.1);
    --org-primary-opacity02:   rgba(240, 173, 78, 0.2);
    --org-primary-opacity03:   rgba(240, 173, 78, 0.3);
    --org-primary-opacity04:   rgba(240, 173, 78, 0.4);
    --org-primary-opacity05:   rgba(240, 173, 78, 0.5);
}
  `;
        //先替换各种颜色
        //主题色
        content = content.replace(/#f0ad4e/g, "var(--org-color-primary)");
        content = content.replace(/#6c757d/g, "var(--org-color-secondary)");
        content = content.replace(/#5cb85c/g, "var(--org-color-success)");
        content = content.replace(/#5bc0de/g, "var(--org-color-info)");
        content = content.replace(/#fadb14/g, "var(--org-color-warning)");
        content = content.replace(/#d9534f/g, "var(--org-color-danger)");
        content = content.replace(/#f8f9fa/g, "var(--org-color-light)");
        content = content.replace(/#343a40/g, "var(--org-color-dark)");
        content = content.replace(/#df8a13/g, "var(--org-color-primary-darken)");
        //透明度颜色
        content = content.replace(/rgba\(240, 173, 78, 0.1\)/g, "var(--org-primary-opacity01)");
        content = content.replace(/rgba\(240, 173, 78, 0.2\)/g, "var(--org-primary-opacity02)");
        content = content.replace(/rgba\(240, 173, 78, 0.3\)/g, "var(--org-primary-opacity03)");
        content = content.replace(/rgba\(240, 173, 78, 0.4\)/g, "var(--org-primary-opacity04)");
        content = content.replace(/rgba\(240, 173, 78, 0.5\)/g, "var(--org-primary-opacity05)");
        //再替换样式表
        content = content.replace("/**orange-cli**/", newRootCss);
        fs.writeFileSync(path, content);
        console.log("样式文件修改成功");
    }
    catch (e) {
        console.log("样式文件转换失败：",e);
    }
}

export default void 0;
