function add(a: number, b: number) {
    return a + b;
  }
  export default function LegacyFunctions() {
    const twoPlusFour = add(2, 4);
    console.log(twoPlusFour);
    return (
      <div id="wd-legacy-functions">
        <h4>Functions</h4>
        <h5>Legacy ES5 functions</h5>
        twoPlusFour = {twoPlusFour}    <br />
        add(2, 4) = {add(2, 4)}        <hr />
      </div>
  );}
  
//add 函数 是一个传统的 ES5 风格函数，用于将两个数字相加。
// LegacyFunctions 组件展示了如何在 React 组件中使用传统的 ES5 函数，并将结果通过 JSX 动态渲染到页面上。
// JSX 表达式 使用 {} 包裹 JavaScript 表达式，将计算结果显示在页面上。
// 这是使用 TypeScript 编写的，因为函数参数带有类型注解（如 number）